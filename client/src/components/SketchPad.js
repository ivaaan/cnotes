import { useState } from "react";
import {
  useMap,
  useMyPresence,
  useUpdateMyPresence,
  useOthers,
  useHistory,
  useBatch,
} from "../liveblocks.config";

function Canvas({ shapes }) {
  const [isDragging, setIsDragging] = useState(false);
  const [{ selectedShape }, setPresence] = useMyPresence();
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();
  const history = useHistory();
  const batch = useBatch();
  const [draftPostit, setDraftPostit] = useState("");

  const insertRectangle = () => {
    batch(() => {
      const shapeId = Date.now().toString();
      const rectangle = {
        x: getRandomInt(300),
        y: getRandomInt(300),
        fill: getRandomColor(),
        text: draftPostit,
        // text: { draftPostit },
      };
      shapes.set(shapeId, rectangle);
      setPresence({ selectedShape: shapeId }, { addToHistory: true });
      // setDraftPostit('');
    });
  };

  const onShapePointerDown = (e, shapeId) => {
    history.pause();
    e.stopPropagation();
    setPresence({ selectedShape: shapeId }, { addToHistory: true });
    setIsDragging(true);
  };

  const onCanvasPointerUp = (e) => {
    if (!isDragging) {
      setPresence({ selectedShape: null }, { addToHistory: true });
    }

    setIsDragging(false);
    history.resume();
  };

  const onCanvasPointerMove = (e) => {
    e.preventDefault();

    if (isDragging) {
      const shape = shapes.get(selectedShape);
      if (shape) {
        shapes.set(selectedShape, {
          ...shape,
          x: e.clientX - 50,
          y: e.clientY - 50,
        });
      }
    }
  };

  const deleteRectangle = () => {
    shapes.delete(selectedShape);
    setPresence({ selectedShape: null });
  };

  return (
    <>
      <div
        className="canvas"
        onPointerMove={onCanvasPointerMove}
        onPointerUp={onCanvasPointerUp}
      >
        {Array.from(shapes, ([shapeId, shape]) => {
          let selectionColor =
            selectedShape === shapeId
              ? "blue"
              : others
                  .toArray()
                  .some((user) => user.presence?.selectedShape === shapeId)
              ? "green"
              : undefined;
          return (
            <Rectangle
              key={shapeId}
              shape={shape}
              id={shapeId}
              onShapePointerDown={onShapePointerDown}
              selectionColor={selectionColor}
            />
          );
        })}
      </div>
      <div className="toolbar">
        {/* <p>{draftPostit} test</p> */}
        <input
          className="postit-input"
          type="text"
          placeholder="Type text here"
          // value={draftPostit}
          onChange={(e) => {
            setDraftPostit(e.target.value);
            updateMyPresence({ isTyping: true });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateMyPresence({ isTyping: false });
              setDraftPostit(e.target.value);
              insertRectangle();
            }
          }}
          // onBlur={() => updateMyPresence({ isTyping: false })}
        />
        <button onClick={insertRectangle}>Stick it!</button>
        <button onClick={deleteRectangle} disabled={selectedShape == null}>
          Delete
        </button>
        <button onClick={history.undo}>Undo</button>
        <button onClick={history.redo}>Redo</button>
      </div>
    </>
  );
}

const Rectangle = ({ shape, id, onShapePointerDown, selectionColor }) => {
  const { x, y, fill, text } = shape;

  return (
    <div
      onPointerDown={(e) => onShapePointerDown(e, id)}
      className="rectangle"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: fill ? fill : "#CCC",
        borderColor: selectionColor || "transparent",
      }}
    >
      {text}
    </div>
  );
};

const COLORS = [
  "#F89C26",
  "#D9AD83",
  "#B0CAE1",
  "#F1A23D",
  "#C4B5B9",
  "#F8823E",
  "#F18852",
  "#E3A967",
  "#FC8428",
  "#B0CCE4",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomColor() {
  return COLORS[getRandomInt(COLORS.length)];
}

export default function SketchPad({ selectedRoomId, selectedEventName }) {
  const shapes = useMap("shapes");

  if (shapes == null) {
    return <div className="loading">Loading</div>;
  }

  return (
    <>
      {selectedRoomId !== "todo" && (
        <div>
          <h1 className="druk text-outside-boxes center-container">
            Sticky Notes
          </h1>
          <p className="rounded-box sketchpad container-agenda">
            <Canvas shapes={shapes} />
          </p>

        </div>
      )}
    </>
  );
}
