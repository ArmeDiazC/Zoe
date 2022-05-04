import "./styles/Card.scss";
import currency from "../helpers/currency";

const Card = ({ agent, handleCard }) => {
  return (
    <div className="card" onClick={() => handleCard(agent)}>
      <div className="card__image">
        <img
          className="card__image-rounded"
          src={`https://randomuser.me/api/portraits/women/${agent.id}.jpg`}
          alt="agent profile"
        />
      </div>

      <div className="card__info">
        <p className="card__name">{agent.name}</p>
        <p className="card__id">ID: {agent.id}</p>
        <p className="card__income">
          Income: <strong>{currency(agent.income)}</strong>
        </p>
      </div>
    </div>
  );
};

export default Card;
