import { useState, useRef, useEffect } from "react";

const SCALE = 0.3;

const useEditImage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    isDragging.current = true;

    dragStart.current = {
      x: e.clientX / SCALE - position.x,
      y: e.clientY / SCALE - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    setPosition({
      x: e.clientX / SCALE - dragStart.current.x,
      y: e.clientY / SCALE - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return {
    position,
    handleMouseDown,
    handleMouseUp,
    resetPosition,
  };
};

export default useEditImage;
