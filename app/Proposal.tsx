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
    const x = Math.random() * (window.innerWidth - 100); // Subtract button width so it doesn't go off edge
    const y = Math.random() * (window.innerHeight - 50); // Subtract button height

    setNoButtonStyle({
      position: "fixed", // BREAKS it out of the card layout
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
              className="w-full py-4 bg-green-500 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform transform active:scale-95 hover:bg-green-600"
              onClick={handleYes}
            >
              Yes!
            </button>

            <button
              // logic: if 'position' is set in state, use it. Otherwise, default styles apply.
              style={noButtonStyle}
              className="px-8 py-3 bg-gray-200 text-gray-500 font-semibold rounded-xl transition-all duration-100 ease-out z-50 hover:bg-gray-300"
              onTouchStart={moveNoButton}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton} // Just in case she manages to click it
            >
              No
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