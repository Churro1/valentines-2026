"use client"; // This must be at the top for Next.js 14+

import React, { useState } from "react";
import Image from "next/image";

// Placeholder image (replace with your actual image path)
const finalphoto = "/wedding2.png";

// Main card style
const cardStyle = "flex flex-col items-center justify-center w-[90vw] max-w-sm mx-auto rounded-3xl shadow-lg bg-white p-6 z-10";

const Proposal: React.FC = () => {
  const [yesClicked, setYesClicked] = useState(false);
  
  // State for the button style (starts empty)
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});

  const moveNoButton = () => {
    const btnWidth = 100;
    const btnHeight = 50;
    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;

    // Get Yes button bounding rect
    const yesBtn = document.querySelector(".proposal-yes-btn");
    let yesRect = yesBtn ? yesBtn.getBoundingClientRect() : null;

    let tries = 0;
    let x = 0, y = 0;
    let overlap = true;
    while (overlap && tries < 10) {
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      overlap = false;
      if (yesRect) {
        // Check if rectangles overlap
        const noRect = { left: x, top: y, right: x + btnWidth, bottom: y + btnHeight };
        if (
          noRect.right > yesRect.left &&
          noRect.left < yesRect.right &&
          noRect.bottom > yesRect.top &&
          noRect.top < yesRect.bottom
        ) {
          overlap = true;
        }
      }
      tries++;
    }
    setNoButtonStyle({
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  const handleYes = () => {
    setYesClicked(true);
    // Dynamic import for confetti to avoid server-side errors
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    });
  };

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-pink-50 overflow-hidden relative">
      <div className={cardStyle}>
        
        <Image 
          src={finalphoto} 
          alt="Us" 
          width={300} 
          height={300} 
          className="mb-6 rounded-lg object-cover shadow-sm"
        />
        
        <h1 className="text-2xl font-bold text-pink-600 mb-8 text-center leading-tight">
          Will you be my Valentine?
        </h1>
        
        {!yesClicked ? (
          <div className="flex flex-col items-center gap-4 w-full">

            <button
              style={noButtonStyle}
              className="px-8 py-3 bg-gray-200 text-gray-500 font-semibold rounded-xl transition-all duration-100 ease-out z-50 hover:bg-gray-300"
              onTouchStart={moveNoButton}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              No
            </button>
            <button
              className="w-full py-4 bg-pink-500 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform transform active:scale-95 proposal-yes-btn"
              onClick={handleYes}
            >
              Yes!
            </button>
          </div>
        ) : (
          <div className="text-center animate-bounce">
             <div className="text-4xl mb-2">💖</div>
             <div className="text-xl text-pink-600 font-bold">
               Yay! I love you so much!
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposal;