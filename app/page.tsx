"use client";
import React, { useState } from "react";
import { reasons } from "./data";
import { SwipeCard } from "./SwipeCard";
import Proposal from "./Proposal";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [cards, setCards] = useState([...reasons].reverse());

  const handleRemove = (id: number) => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-pink-50">
      <main className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence>
          {cards.length > 0 ? (
            cards.map((card, idx) => (
              <SwipeCard
                key={card.id}
                data={card}
                onRemove={() => handleRemove(card.id)}
              />
            ))
          ) : (
            <Proposal />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
