import { useEffect, useRef, useState } from "react";

const useVerticalScrollable = () => {
  const containerRef = useRef(null); // ✅ correct

  const [showGradient, setShowGradient] = useState({
    top: false,
    bottom: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const hasScroll = container.scrollHeight > container.clientHeight;
      const isAtTop = container.scrollTop <= 0;
      const isAtBottom =
        Math.ceil(container.scrollTop + container.clientHeight) >=
        container.scrollHeight;

      if (hasScroll) {
        setShowGradient({
          top: !isAtTop,
          bottom: !isAtBottom,
        });
      } else {
        setShowGradient({ top: false, bottom: false });
      }
    };

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    checkScroll();

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return { showGradient, containerRef };
};

export default useVerticalScrollable;
