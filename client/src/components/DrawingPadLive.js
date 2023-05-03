import { useState } from "react";
import {
  useMap,
  useMyPresence,
  useUpdateMyPresence,
  useOthers,
  useHistory,
  useBatch,
} from "../liveblocks.config";
import DrawingPad from "./DrawingPad";

function DrawingPadLive({ roomId }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const drawings = useMap(`drawings:${roomId}`);
  const myPresence = useMyPresence();
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();
  const history = useHistory();
  const batch = useBatch();

  const startDrawing = (event) => {
    setIsDrawing(true);
    updateMyPresence({ isDrawing: true });
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    updateMyPresence({ isDrawing: false });
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const newPoint = { x: event.clientX, y: event.clientY };
    const lineId = Date.now().toString();
    drawings.set(lineId, { id: lineId, line: [newPoint] });
  };

  return (
    <>
      <h1 className="druk text-outside-boxes center-container">
        Drawing Pad Live
      </h1>
      <div className="rounded-box sketchpad container-agenda">
        <DrawingPad
          onStartDrawing={startDrawing}
          onFinishDrawing={finishDrawing}
          onDraw={draw}
        />
      </div>
    </>
  );
}

export default DrawingPadLive;
