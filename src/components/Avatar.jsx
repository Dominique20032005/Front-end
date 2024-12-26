import React from "react";
import { motion } from "framer-motion";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";

const MotionDiv = motion.div;

export const Avatar = ({ name, selected, onClick }) => {
  const avatar = createAvatar(botttsNeutral, {
    seed: name,
  }).toDataUri();

  return (
    <MotionDiv
      className={`w-16 h-16 flex items-center justify-center rounded-lg ${
        selected ? "ring-4 ring-teal-500" : "ring-2 ring-gray-500"
      } cursor-pointer`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={avatar} alt={`Avatar of ${name}`} className="w-full h-full rounded-lg" />
    </MotionDiv>
  );
};

export default Avatar;
