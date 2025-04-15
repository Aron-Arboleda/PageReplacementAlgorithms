import './Button.css';
import { LucideProps } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface FieldButtonProps {
  onClick: () => void;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

export const FieldButton = ({ onClick, Icon }: FieldButtonProps) => {
  return (
    <button onClick={onClick} className="field-button" type="button">
      <Icon size={20} />
    </button>
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
