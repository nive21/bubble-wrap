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
  const [isTitlePresent, setIsTitlePresent] = useState(true);

  const { numCols, numRows } = bubbleCount;

  useEffect(() => {
    const handleResize = () => setBubbleCount(calculateCount());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bubbles = Array.from({ length: numCols * numRows }, (_, i) => (
    <Bubble
      key={i}
      isEvenRow={i % (numCols * 2) > numCols - 1}
      isTitlePresent={isTitlePresent}
    />
  ));

  return (
    <>
      <div
        className={`title-overlay ${isTitleVisible ? "visible" : "hidden"} ${
          isTitlePresent ? "title-present" : "title-absent"
        }`}
      >
        <h1>
          Bubble
          <br />
          Wrap
        </h1>
        <button
          onClick={() => {
            setIsTitleVisible(false);
            setTimeout(() => {
              setIsTitlePresent(false);
            }, 200);
          }}
        >
          START
        </button>
      </div>
      <div
        className="bubble-wrap"
        style={{
          gridTemplateColumns: `repeat(${numCols}, ${BUBBLE_SIZE}px)`,
          gridTemplateRows: `${BUBBLE_SIZE}px`,
        }}
      >
        {bubbles}
      </div>
      <div className="footer">
        Made with ❤️ by <a href="https://www.linkedin.com/in/nivemathan/">NK</a>
      </div>
    </>
  );
};

const Bubble = ({ isEvenRow, isTitlePresent }) => {
  const [isPopped, setIsPopped] = useState(false);
  const [playPopSound] = useSound(popSound, { volume: 0.2, playbackRate: 1.5 });

  const handlePop = () => {
    if (!isTitlePresent) playPopSound();
    setIsPopped(true);
  };

  const handlePopReset = () => {
    setTimeout(() => setIsPopped(false), 1500);
  };

  return (
    <div
      className={`bubble ${isPopped ? "show-popped" : "show-unpopped"}`}
      onMouseEnter={handlePop}
      onMouseLeave={handlePopReset}
      onTouchStart={handlePop}
      onTouchEnd={handlePopReset}
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
  isTitlePresent: PropTypes.bool.isRequired,
};
