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
    navigator.clipboard.writeText(text); // Copy it to the clipboard
    setIsCopied(true); // Set the copied state to true
    toast.success('Reference string copied to clipboard!', { autoClose: 1200 }); // Show a success message
    setTimeout(() => {
      setIsCopied(false); // Reset the copied state after 2 seconds
    }, 2000); // Change the duration as needed
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
