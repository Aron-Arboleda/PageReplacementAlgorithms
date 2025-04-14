import './Texts.css';

export const BodyTitle = ({ title }: { title: String }) => {
  return <h1 className="bodyTitle">{title}</h1>;
};

export const CardTitle = ({ title }: { title: String }) => {
  return <h2 className="cardTitle">{title}</h2>;
};
