import "./App.css";
import { useState, useEffect } from "react";
import UnpoppedSVG from "./assets/unpopped.png";
import PoppedSVG from "./assets/popped.png";
import popSound from "./assets/popSound.mp3";
import PropTypes from "prop-types";
import useSound from "use-sound";

const BUBBLE_SIZE = 60;

const calculateCount = () => {
  const numCols = Math.ceil(window.innerWidth / BUBBLE_SIZE) + 1;
  const numRows = Math.ceil(window.innerHeight / BUBBLE_SIZE) + 1;

  return { numCols, numRows };
};

function App() {
  return <BubbleWrap />;
}

export default App;

const BubbleWrap = () => {
  const [bubbleCount, setBubbleCount] = useState(calculateCount());
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const { numCols, numRows } = bubbleCount;

  useEffect(() => {
    const handleResize = () => setBubbleCount(calculateCount());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bubbles = Array.from({ length: numCols * numRows }, (_, i) => (
    <Bubble key={i} isEvenRow={i % (numCols * 2) > numCols - 1} />
  ));

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTitleVisible(false);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h1 className={`${isTitleVisible ? "visible" : "hidden"}`}>
        Bubble
        <br />
        Wrap
      </h1>
      <div
        className="bubble-wrap"
        style={{
          gridTemplateColumns: `repeat(${numCols}, ${BUBBLE_SIZE}px)`,
          gridTemplateRows: `${BUBBLE_SIZE}px`,
        }}
      >
        {bubbles}
      </div>
    </>
  );
};

const Bubble = ({ isEvenRow }) => {
  const [isPopped, setIsPopped] = useState(false);
  const [playPopSound] = useSound(popSound, { volume: 0.2, playbackRate: 1.5 });

  return (
    <div
      className={`bubble ${isPopped ? "show-popped" : "show-unpopped"}`}
      onMouseEnter={() => {
        playPopSound();
        setIsPopped(true);
      }}
      onMouseLeave={() => {
        setTimeout(() => setIsPopped(false), 1500);
      }}
      style={
        isEvenRow
          ? {
              position: "relative",
              left: "30px",
            }
          : {}
      }
    >
      <img src={PoppedSVG} className="popped-svg" />
      <img src={UnpoppedSVG} className="unpopped-svg" />
    </div>
  );
};

Bubble.propTypes = {
  isEvenRow: PropTypes.bool.isRequired,
};
