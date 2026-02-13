// valentineswebsite/app/SwipeCard.tsx
import React from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Reason } from "./data";

interface SwipeCardProps {
  data: Reason;
  onRemove: () => void;
}

const SWIPE_THRESHOLD = 100;

export const SwipeCard: React.FC<SwipeCardProps> = ({ data, onRemove }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

  return (
    <motion.div
      className="absolute w-[90vw] max-w-sm left-1/2 -translate-x-1/2 top-0 rounded-3xl shadow-lg flex flex-col items-center justify-center p-6"
      style={{
        background: data.color,
        y: 0,
        x,
        rotate,
        height: "calc(100dvh - 32px)",
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(
        event: MouseEvent | TouchEvent | PointerEvent,
        info: { offset: { x: number; y: number } }
      ) => {
        if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
          // Animate card off screen and down
          x.set(info.offset.x > 0 ? 1000 : -1000);
          setTimeout(onRemove, 300);
        } else {
          x.set(0);
        }
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: 0, y: 600, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className="w-full h-[60vw] max-h-[320px] relative mb-4 rounded-2xl overflow-hidden"
        onPointerDown={e => e.stopPropagation()}
      >
        <Image
          src={data.image}
          alt={data.text}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="text-center text-lg font-semibold text-pink-700 mb-2">
        {data.text}
      </div>
    </motion.div>
  );
};
