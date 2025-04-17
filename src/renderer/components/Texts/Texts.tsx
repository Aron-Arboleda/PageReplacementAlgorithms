/**
 * This file contains the Text components used in the application.
 */

import './Texts.css';

export const BodyTitle = ({
  title,
  style,
}: {
  title: String;
  style?: React.CSSProperties;
}) => {
  return (
    <h1 className="bodyTitle" style={style}>
      {title}
    </h1>
  );
};

export const CardTitle = ({ title }: { title: String }) => {
  return <h2 className="cardTitle">{title}</h2>;
};

export const InfoLabel = ({ label }: { label: string }) => {
  return <span className="infoLabel">{label}</span>;
};

export const InfoValue = ({ value }: { value: string | number }) => {
  return <span className="infoValue">{value}</span>;
};

export const Heading2Text = ({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) => {
  return (
    <h2 className="heading2Text" style={style}>
      {text}
    </h2>
  );
};

export const MiriamLibreText = ({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) => {
  return (
    <p className="miriamLibreText" style={style}>
      {text}
    </p>
  );
};

export const OneLineLabelValueText = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="oneLineLabelValueText">
      <InfoLabel label={label} />
      <InfoValue value={value} />
    </div>
  );
};

export const HighlightedResultText = ({ text }: { text: string }) => {
  return <span className="highlightedResultText">{text}</span>;
};

export const NormalInterText = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <span className="normalInterText" style={style}>
      {children}
    </span>
  );
};
