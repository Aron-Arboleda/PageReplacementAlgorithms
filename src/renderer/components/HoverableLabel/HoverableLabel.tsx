import React, { useState, useEffect, useRef } from 'react';

interface HoverableLabelProps {
  label: string;
  htmlFor: string;
  imageSrc?: string;
  tooltipText?: string;
  maxWidth?: number;
}

const HoverableLabel: React.FC<HoverableLabelProps> = ({
  label,
  htmlFor,
  imageSrc,
  tooltipText,
  maxWidth = 300,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLLabelElement>) => {
    // Start with default position (slight offset from cursor)
    let newX = e.clientX + 15;
    let newY = e.clientY + 15;

    setPosition({ x: newX, y: newY });
  };

  // Adjust position if tooltip would go outside viewport
  useEffect(() => {
    if (isHovered && tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = position.x;
      let adjustedY = position.y;

      // Adjust horizontal position if needed
      if (position.x + tooltipRect.width > viewportWidth) {
        adjustedX = position.x - tooltipRect.width - 30; // Move to left of cursor
      }

      // Adjust vertical position if needed
      if (position.y + tooltipRect.height > viewportHeight) {
        adjustedY = position.y - tooltipRect.height - 30; // Move above cursor
      }

      if (adjustedX !== position.x || adjustedY !== position.y) {
        setPosition({ x: adjustedX, y: adjustedY });
      }
    }
  }, [isHovered, position.x, position.y]);

  // Determine whether to show content (either image or text)
  const hasContent = Boolean(imageSrc || tooltipText);

  return (
    <>
      <div style={{ fontSize: 0 }}>
        <label
          htmlFor={htmlFor}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{
            cursor: 'pointer',
            position: 'relative',
            display: 'inline-block',
            padding: 0,
            margin: 0,
            fontSize: '13px', // Reset the font-size for the label itself
          }}
        >
          {label}
        </label>
      </div>

      {isHovered && hasContent && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            pointerEvents: 'none',
            zIndex: 1000,
            maxWidth: `${maxWidth}px`,
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            padding: '5px 10px',
            transition: 'opacity 0.2s ease-in-out',
            opacity: 1,
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`${label} reference`}
              style={{
                maxWidth: '100%',
                display: 'block',
                borderRadius: '5px',
              }}
            />
          ) : tooltipText ? (
            <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
              {tooltipText}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default HoverableLabel;
