import * as React from "react";
import { getStroke } from "perfect-freehand";
// import { useStorage, useMutation } from "../liveblocks.config";
// import { shallow } from "@liveblocks/client";

const options = {
  size: 10,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    easing: (t) => t,
    cap: true,
  },
  end: {
    taper: 100,
    easing: (t) => t,
    cap: true,
  },
};

export default function DrawingPad({ selectedRoomId, selectedEventName }) {
  const [strokes, setStrokes] = React.useState([]);
  const [currentStroke, setCurrentStroke] = React.useState([]);
  // const drawing = useStorage((root) => root.drawing);
  // const updateDrawing = useMutation(({ storage }, newDrawing) => {
  //   const currentDrawing = drawing ? Array.from(drawing) : [];
  //   storage.set("drawing", [...currentDrawing, newDrawing]);
  // }, []);

  React.useEffect(() => {
    const savedStrokes = localStorage.getItem("drawingStrokes");
    if (savedStrokes) {
      setStrokes(JSON.parse(savedStrokes));
    }
  }, []);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    const rect = e.target.getBoundingClientRect();
    setCurrentStroke([
      [e.clientX - rect.left, e.clientY - rect.top, e.pressure],
    ]);
  }

  function handlePointerMove(e) {
    if (e.buttons !== 1) return;
    const rect = e.target.getBoundingClientRect();
    setCurrentStroke([
      ...currentStroke,
      [e.clientX - rect.left, e.clientY - rect.top, e.pressure],
    ]);
  }

  function handlePointerUp(e) {
    const newStroke = currentStroke;
    setStrokes((prevStrokes) => [...prevStrokes, newStroke]);
    setCurrentStroke([]);

    const updatedStrokes = [...strokes, newStroke];
    localStorage.setItem("drawingStrokes", JSON.stringify(updatedStrokes));
  }

  // function handlePointerUp(e) {
  //   const newStroke = currentStroke;
  //   setStrokes([...strokes, newStroke]);
  //   setCurrentStroke([]);
  //   // updateDrawing(newStroke);
  // }

  return (
    <>
      {selectedRoomId !== "todo" && (
        <div>
          <span
            className="druk text-outside-boxes inside-margin"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingBottom: 15,
            }}
          >
            Drawing pad:
          </span>
          <div className="drawing-pad-container">
            <div className="drawing-pad-wrapper">
              <svg
                id="svgDrawing"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                style={{ touchAction: "none" }}
              >
                {strokes.map((stroke, index) => (
                  <path
                    key={index}
                    d={getSvgPathFromStroke(getStroke(stroke, options))}
                  />
                ))}
                {currentStroke && (
                  <path
                    d={getSvgPathFromStroke(getStroke(currentStroke, options))}
                  />
                )}
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function getSvgPathFromStroke(stroke) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}
