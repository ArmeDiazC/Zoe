import { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import AgentContext from "../helpers/AgentContext";
import Search from "../components/Search";
import currency from "../helpers/currency";
import "./styles/Results.scss";

const Results = () => {
  const { filtered, income, setFiltered } = useContext(AgentContext);
  const [view, setView] = useState(3);
  const [filter, setFilter] = useState("id");
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(saved));
  }, [saved]);

  const handleView = (operation) => {
    let indexView = operation === "more" ? view + 3 : view - 3;

    indexView =
      indexView > filtered.length
        ? filtered.length
        : indexView < 3
        ? 3
        : indexView;

    setView(indexView);
  };

  const handleSort = (e) => {
    const event = e.target.value;
    let sorted = [];
    switch (event) {
      case "name":
        setFilter("name");
        sorted = [...filtered].sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "id":
        setFilter("id");
        sorted = [...filtered].sort((a, b) => {
          return a.id - b.id;
        });
        break;
      case "incomeH":
        setFilter("incomeH");
        sorted = [...filtered].sort((a, b) => {
          return b.income - a.income;
        });
        break;
      case "incomeL":
        setFilter("incomeL");
        sorted = [...filtered].sort((a, b) => {
          return a.income - b.income;
        });
        break;
      default:
        sorted = [...filtered];
    }

    console.log("****DEFAUL", filtered);
    setFiltered(sorted);
  };

  const handleCard = (removedAgent) => {
    setSaved([...saved, removedAgent]);

    const newAgents = [...filtered].filter((agent) => {
      return agent.name !== removedAgent.name;
    });
    setFiltered(newAgents);
    setView(view - 1);
  };

  return (
    <div className="results">
      <h1 className="results__title">Your matches</h1>

      {filtered.length === 0 ? (
        <>
          <h2 className="results__text">
            No available Agents based on your income. Please try a different
            income value.
          </h2>
          <Search />
        </>
      ) : (
        <h2 className="results__text">
          Your income: <strong>{currency(income)}</strong>
        </h2>
      )}

      {filtered.length > 0 && (
        <>
          <label className="results__label">Order agents by</label>
          <select
            className="results__select"
            value={filter}
            onChange={handleSort}
          >
            <option value="name">Name (A-Z)</option>
            <option value="id">ID</option>
            <option value="incomeH">Income: High first</option>
            <option value="incomeL">Income: Low first</option>
          </select>
          <div className="results__cards">
            {filtered
              .map((agent) => (
                <Card agent={agent} key={agent.id} handleCard={handleCard} />
              ))
              .slice(0, view)}
          </div>

          <div className="results__buttons">
            <button
              className="results__button"
              onClick={() => handleView("less")}
              disabled={view <= 3}
            >
              Show Less -
            </button>
            <button
              className="results__button"
              onClick={() => handleView("more")}
              disabled={view >= filtered.length}
            >
              Show More +
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
