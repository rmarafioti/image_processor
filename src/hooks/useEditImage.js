import { useState, useRef, useEffect } from "react";

const SCALE = 0.3;

const useEditImage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, scale: 1 });

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX / SCALE - position.x,
      y: e.clientY / SCALE - position.y,
    };
  };

  const handleResizeMouseDown = (e, corner) => {
    e.stopPropagation();
    isResizing.current = true;
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      scale,
      corner,
    };
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        setPosition({
          x: e.clientX / SCALE - dragStart.current.x,
          y: e.clientY / SCALE - dragStart.current.y,
        });
      }
      if (isResizing.current) {
        const dx = (e.clientX - resizeStart.current.x) / SCALE;
        const dy = (e.clientY - resizeStart.current.y) / SCALE;

        let delta;
        switch (resizeStart.current.corner) {
          case "tl":
            delta = (-dx - dy) / 400;
            break;
          case "tr":
            delta = (dx - dy) / 400;
            break;
          case "bl":
            delta = (-dx + dy) / 400;
            break;
          case "br":
            delta = (dx + dy) / 400;
            break;
          default:
            delta = (dx + dy) / 400;
        }

        setScale((prev) => Math.max(0.1, prev + delta));

        resizeStart.current.x = e.clientX;
        resizeStart.current.y = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return {
    position,
    scale,
    handleMouseDown,
    handleResizeMouseDown,
    resetPosition,
  };
};

export default useEditImage;
