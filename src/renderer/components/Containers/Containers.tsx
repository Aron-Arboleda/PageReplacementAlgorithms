import { multiplyString } from '@utils/helpers/helpers';
import './Containers.css';

export const LargeContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="largeContainer">{children}</div>;
};

export const CardContainer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div className="cardContainer" style={style}>
      {children}
    </div>
  );
};

export const GridContainer = ({
  children,
  style,
  size,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size: string;
}) => {
  const newStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${size}, 1fr))`,
    ...style,
  };
  return (
    <div className="gridContainer" style={newStyle}>
      {children}
    </div>
  );
};

export const GridContainerFixed = ({
  children,
  style,
  noOfGroups,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  noOfGroups: number;
}) => {
  const newStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: multiplyString('1fr ', noOfGroups),
    gap: '2rem',
    ...style,
  };
  return (
    <div className="gridContainerFixed" style={newStyle}>
      {children}
    </div>
  );
};

export const FlexContainer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const newStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    ...style,
  };
  return <div style={newStyle}>{children}</div>;
};
