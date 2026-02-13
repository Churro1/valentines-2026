import React, { useState } from "react";
import Image from "next/image";

const bearGif = "/bear-hug.gif"; // Place a cute gif in public folder

const containerStyle = "flex flex-col items-center justify-center w-[90vw] max-w-sm mx-auto rounded-3xl shadow-lg bg-white p-6";

const Proposal: React.FC = () => {
  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  // Move No button to random position within container
  const moveNoButton = () => {
    const maxX = window.innerWidth * 0.9 - 80; // 80px button width
    const maxY = window.innerHeight * 0.6 - 40; // 40px button height
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    setNoPos({ x, y });
  };

  const handleYes = () => {
    setYesClicked(true);
    if (typeof window !== "undefined") {
      import("canvas-confetti").then(confetti => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      });
    }
  };

  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-center">
      <div className={containerStyle} style={{ minHeight: "60vh" }}>
        <Image src={bearGif} alt="Bear Hug" width={120} height={120} className="mb-4" />
        <div className="text-2xl font-bold text-pink-700 mb-4">Will you be my Valentine?</div>
        {!yesClicked ? (
          <div className="flex flex-col items-center gap-4 mt-4">
            <button
              className="w-40 h-14 bg-gradient-to-r from-pink-400 to-pink-300 text-white text-xl font-bold rounded-full shadow-lg transition-transform hover:scale-105"
              onClick={handleYes}
            >
              Yes
            </button>
            <button
              className="w-20 h-10 bg-gray-300 text-gray-700 text-lg rounded-full shadow-md absolute"
              style={{ left: noPos.x, top: noPos.y }}
              onTouchStart={moveNoButton}
              onMouseEnter={moveNoButton}
            >
              No
            </button>
          </div>
        ) : (
          <div className="text-xl text-green-600 font-semibold mt-6">Yay! I love you! 💖</div>
        )}
      </div>
    </div>
  );
};

export default Proposal;
