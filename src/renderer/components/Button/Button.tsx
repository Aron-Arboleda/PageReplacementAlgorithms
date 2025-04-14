import './Button.css';

import React, { useState, useRef, useEffect } from 'react';

interface InfoButtonProps {
  tooltipText?: string;
  tooltipImage?: string;
  imageAlt?: string;
  top?: string;
  right?: string;
}

export const InfoButton: React.FC<InfoButtonProps> = ({
  tooltipText,
  tooltipImage,
  imageAlt = 'Information',
  top = '0.2rem',
  right = '0.4rem',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: boolean;
    left: boolean;
  }>({ top: false, left: false });
  const buttonRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Check if tooltip will go outside viewport and adjust position
  useEffect(() => {
    if (isHovered && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      setTooltipPosition({
        // Show on top if tooltip would go below viewport
        top: buttonRect.bottom + tooltipRect.height > viewportHeight,
        // Show on left if tooltip would go beyond right edge of viewport
        left: buttonRect.left + tooltipRect.width > viewportWidth,
      });
    }
  }, [isHovered]);

  // Styles
  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#5569a3',
    fontWeight: 'bold',
    fontFamily: 'Courier New',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    position: 'relative',
    border: '1px solid black',
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: '8px',
    maxWidth: '300px',
    visibility: isHovered ? 'visible' : 'hidden',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.2s, visibility 0.2s',
    border: '1px solid black',

    // Dynamic positioning based on viewport constraints
    ...(tooltipPosition.top ? { bottom: '30px' } : { top: '30px' }),

    ...(tooltipPosition.left ? { right: '0' } : { left: '0' }),
  };

  const imageStyle: React.CSSProperties = {
    width: 'auto',
    maxHeight: '250px',
    display: 'block',
  };

  const textStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.5',
  };

  return (
    <div
      style={{
        textAlign: 'right',
        position: 'absolute',
        top: top,
        right: right,
      }}
    >
      <div
        ref={buttonRef}
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={buttonStyle}>i</div>
        {(tooltipText || tooltipImage) && (
          <div ref={tooltipRef} style={tooltipStyle}>
            {tooltipImage ? (
              <img src={tooltipImage} alt={imageAlt} style={imageStyle} />
            ) : tooltipText ? (
              <p style={textStyle}>{tooltipText}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

interface ButtonProps {
  text: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

const Button = ({
  text,
  disabled = false,
  className = '',
  icon,
  type = 'button',
  onClick,
  style,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`button-classic ${className}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
