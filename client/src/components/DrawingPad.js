import * as React from "react";
import { getStroke } from "perfect-freehand";


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
  }
};

function DrawingThumbnail({ stroke, onClick }) {
  const svgPath = getSvgPathFromStroke(getStroke(stroke, options));
  console.log(svgPath, "WHAAAA")
  return (
    <div onClick={onClick} style = {{backgroundImage: svgPath, border: "1px solid black", width: "80px", height: "120px", borderRadius: "4px" }}>
     
      <svg style={{ border: "1px solid black", width: "80px", height: "120px"}}>
        <path d={svgPath} />
      </svg> 
    </div>
  );
}

export default function DrawingPad({ selectedRoomId, selectedEventName }) {
  const [strokes, setStrokes] = React.useState([]);
  const [currentStroke, setCurrentStroke] = React.useState([]);
  const [savedDrawings, setSavedDrawings] = React.useState([]);

  React.useEffect(() => {
    const drawings = localStorage.getItem("drawings");
    if (drawings) {
      const parsedDrawings = JSON.parse(drawings);
      setSavedDrawings(parsedDrawings);
    }
  }, []);


  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    const rect = e.target.getBoundingClientRect();
    setCurrentStroke([[e.clientX - rect.left, e.clientY - rect.top, e.pressure]]);
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
    setStrokes([...strokes, currentStroke]);
    setCurrentStroke([]);
  }

  function handleSelectDrawing(drawing) {
    setStrokes(drawing);
  }

  function handleSaveDrawing() {
    // save strokes to localStorage
    const newSavedDrawings = [...savedDrawings, strokes];
    localStorage.setItem("drawings", JSON.stringify(newSavedDrawings));
    setSavedDrawings(newSavedDrawings);
    alert("Drawing saved!");
  }

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
                  <path d={getSvgPathFromStroke(getStroke(currentStroke, options))} />
                )}
              </svg>
            </div>
            <div className="drawing-thumbnail-container">
              {savedDrawings.map((drawing, index) => (
                <DrawingThumbnail
                  key={index}
                  stroke={drawing}
                  onClick={() => handleSelectDrawing(drawing)}
                  />
                  ))}
                  </div>
                  </div>
                  <button className="btn" onClick={handleSaveDrawing}>
                  Save drawing
                  </button>
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