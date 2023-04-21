import { useMap } from '../liveblocks.config';

function Canvas({ shapes }) {
  const insertRectangle = () => {
    const shapeId = Date.now().toString();
    const rectangle = {
      x: getRandomInt(300),
      y: getRandomInt(300),
      fill: getRandomColor(),
    };
    shapes.set(shapeId, rectangle);
  };

  return (
    <>
      <div className='canvas'>
        {Array.from(shapes, ([shapeId, shape]) => {
          return <Rectangle key={shapeId} shape={shape} />;
        })}
      </div>
      <div className='toolbar'>
        <button onClick={insertRectangle}>Rectangle</button>
      </div>
    </>
  );
}

const Rectangle = ({ shape }) => {
  const { x, y, fill } = shape;

  return (
    <div
      className='rectangle'
      style={{
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: fill ? fill : '#CCC',
      }}
    ></div>
  );
};

const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777'];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomColor() {
  return COLORS[getRandomInt(COLORS.length)];
}

export default function SketchPad({ selectedRoomId, selectedEventName }) {
  const shapes = useMap('shapes');

  if (shapes == null) {
    return <div className='loading'>Loading</div>;
  }

  return (
    <div>
      <h1 className='text-outside-boxes center-container'>SketchPad</h1>
      <p className='rounded-box sketchpad'>
        <Canvas shapes={shapes} />
      </p>
    </div>
  );
}
