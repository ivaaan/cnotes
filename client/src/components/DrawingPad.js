import * as React from "react";
import { getStroke } from "perfect-freehand";

const options = {
  size: 32,
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
  const [points, setPoints] = React.useState([]);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setPoints([[e.pageX, e.pageY, e.pressure]]);
  }

  function handlePointerMove(e) {
    if (e.buttons !== 1) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
  }

  const stroke = getStroke(points, options);
  const pathData = getSvgPathFromStroke(stroke);

  return (
    <>
    {selectedRoomId !== "todo" && (
      <div className="drawing-pad-wrapper">
        <span>Drawing pad:</span>
        <svg
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          style={{ touchAction: "none" }}
        >
          {points && <path d={pathData} />}
        </svg>
      </div>
    )}
  </>
  );
}

function getSvgPathFromStroke(stroke) {
    if (!stroke.length) return ""
  
    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length]
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
        return acc
      },
      ["M", ...stroke[0], "Q"]
    )
  
    d.push("Z")
    return d.join(" ")
  }