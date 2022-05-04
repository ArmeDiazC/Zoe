import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AgentContext from "../helpers/AgentContext";
import "./styles/Search.scss";

const Search = () => {
  const { setFiltered, setIncome, income } = useContext(AgentContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const value = event.target.value;
    const numbersRegex = /^[0-9]+$/;
    setIncome(value);
    if (value.length === 5 && value.match(numbersRegex)) {
      setError(false);
      setDisabled(false);
    } else {
      setError(true);
      setDisabled(true);
    }
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === 13 && !error) {
      event.preventDefault();
      handleRequest();
      return navigate("/result");
    }
  };

  const handleRequest = async () => {
    await fetch("/AGENTS_LIST.json")
      .then((resp) => resp.json())
      .then((data) => {
        filterAgents(data);
      });
  };

  const filterAgents = (data) => {
    const listAgents = data.filter((agent) => {
      let diff = Math.abs(agent.income - income);

      if (diff > 10000) {
        return false;
      } else {
        return true;
      }
    });
    setFiltered(listAgents);
  };

  return (
    <div className="search">
      <label className="search__label">Current income</label>
      <div className="search__wrapper">
        <input
          className="search__input"
          type="text"
          onChange={handleChange}
          onKeyDown={handleEnterKey}
          value={income}
        />
        <i className="search__icon">$</i>
      </div>
      {error && (
        <span className="search__error">The income should have 5 digits</span>
      )}
      <Link className="search__link" to="/result">
        <button
          className={"search__button"}
          onClick={handleRequest}
          disabled={disabled}
        >
          Get matches
        </button>
      </Link>
    </div>
  );
};

export default Search;
