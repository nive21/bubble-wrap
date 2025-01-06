import "./App.css";
import { useState, useEffect } from "react";
import UnpoppedSVG from "./assets/unpopped.png";
import PoppedSVG from "./assets/popped.png";

const BUBBLE_SIZE = 60;

const calculateCount = () => {
  const numCols = Math.ceil(window.innerWidth / BUBBLE_SIZE);
  const numRows = Math.ceil(window.innerHeight / BUBBLE_SIZE);

  return { numCols, numRows };
};

function App() {
  return <BubbleWrap />;
}

export default App;

const BubbleWrap = () => {
  const [bubbleCount, setBubbleCount] = useState(calculateCount());

  useEffect(() => {
    const handleResize = setBubbleCount(calculateCount());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bubbles = Array.from(
    { length: bubbleCount.numCols * bubbleCount.numRows },
    (_, i) => <Bubble key={i} />
  );

  return (
    <div
      className="bubble-wrap"
      style={{
        gridTemplateColumns: `repeat(${bubbleCount.numCols}, ${BUBBLE_SIZE}px)`,
        gridTemplateRows: `${BUBBLE_SIZE}px`,
      }}
    >
      {bubbles}
    </div>
  );
};

const Bubble = () => {
  const [isPopped, setIsPopped] = useState(false);

  return (
    <div
      className={`bubble ${isPopped ? "show-popped" : "show-unpopped"}`}
      onMouseEnter={() => setIsPopped(true)}
      onMouseLeave={() => {
        setTimeout(() => setIsPopped(false), 1500);
      }}
    >
      <img src={PoppedSVG} className="popped-svg" />
      <img src={UnpoppedSVG} className="unpopped-svg" />
    </div>
  );
};
