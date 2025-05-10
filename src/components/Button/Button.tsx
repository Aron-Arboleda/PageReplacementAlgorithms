/**
 * Button.tsx file contains all of the button react components that i created to be re-used in
 * different parts of the application.
 */

import './Button.css';
import { Copy, CopyCheck, LucideProps } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

interface FieldButtonProps {
  onClick: () => void;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  tooltip: string;
}

/**
 * To create the UI components that are re-used throughout the application,
 * I used JSX syntax. (inline HTML syntax that is treated as values in React Applications)
 */

export const FieldButton = ({ onClick, Icon, tooltip }: FieldButtonProps) => {
  return (
    <button
      title={tooltip}
      onClick={onClick}
      className="field-button"
      type="button"
    >
      <Icon size={20} />
    </button>
  );
};

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyReferenceString = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success('Reference string copied to clipboard!', { autoClose: 1200 });
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      title={isCopied ? 'Text copied!' : 'Copy to clipboard'}
      onClick={handleCopyReferenceString}
      className="field-button"
      type="button"
    >
      {isCopied ? (
        <CopyCheck size={20} onClick={() => setIsCopied(false)} />
      ) : (
        <Copy size={20} onClick={() => setIsCopied(true)} />
      )}
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
