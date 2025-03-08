import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const [isBlendMode, setIsBlendMode] = useState(false);
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to("#cursor", {
        x: clientX - 10,
        y: clientY - 10,
        duration: 1,
        delay: 0,
        ease: "power4.out",
      });
    };
    document.addEventListener("mousemove", handleMouseMove);

    const targetedEffect = () => {
      const targetedEffectElements = document.querySelectorAll(
        'title-text, [data-cursor-effects="true"]'
      );

      targetedEffectElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          gsap.to("#cursor", {
            scale: 8,
            duration: 0.3,
            ease: "power4.out",
          });

          if (element.hasAttribute("data-cursor-blend")) {
            setIsBlendMode(true);
          }
        });

        element.addEventListener("mouseleave", () => {
          gsap.to("#cursor", {
            scale: 1,
            duration: 0.3,
            ease: "power4.out",
          });
          setIsBlendMode(false);
        });
      });
    };

    setTimeout(targetedEffect, 500);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        id="cursor"
        className={`fixed top-0 left-0 w-5 h-5 bg-white rounded-full z-50 pointer-events-none ${
          isBlendMode ? "mix-blend-difference" : ""
        }`}
      />
    </>
  );
};

export default Cursor;
