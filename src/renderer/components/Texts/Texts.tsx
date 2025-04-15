import './Texts.css';

export const BodyTitle = ({ title }: { title: String }) => {
  return <h1 className="bodyTitle">{title}</h1>;
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
