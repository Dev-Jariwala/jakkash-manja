import React, { useState } from "react";
const TooltipItem = ({ children, tooltipsText, position }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="group relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isHovered && (
        <div
          className={` ${
            (position === "right" &&
              `absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-xs font-semibold text-white `) ||
            (position === "top" &&
              `absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-xs font-semibold text-white `) ||
            (position === "left" &&
              `absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-xs font-semibold text-white `) ||
            (position === "bottom" &&
              `absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-xs font-semibold text-white `)
          }`}
        >
          <span
            className={` ${
              (position === "right" &&
                `absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black`) ||
              (position === "top" &&
                `absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black`) ||
              (position === "left" &&
                `absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black `) ||
              (position === "bottom" &&
                `absolute left-1/2 top-[-3px] -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black`)
            } `}
          ></span>
          {tooltipsText}
        </div>
      )}
    </div>
  );
};

export default TooltipItem;
