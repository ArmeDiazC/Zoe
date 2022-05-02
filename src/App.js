import { useState } from "react";
import "./App.scss";

function App() {
  const [income, setIncome] = useState("");
  const [error, setError] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const [counter, setCounter] = useState(3);

  const handleInput = (e) => {
    const value = e.target.value;

    if (value.length >= 6) {
      setError(true);
    } else {
      setError(false);
      setIncome(value);
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
    console.log(listAgents);
    setFiltered(listAgents);
  };

  const handleCounter = (operation) => {
    let indexView = operation === "more" ? counter + 3 : counter - 3;

    indexView =
      indexView > filtered.length
        ? filtered.length
        : indexView < 3
        ? 3
        : indexView;

    setCounter(indexView);
  };

  return (
    <div className="App">
      <input type="text" onChange={handleInput} />
      {error && <>The income should have 5 digits</>}
      <button onClick={handleRequest} disabled={error}>
        Get matches
      </button>
      {filtered &&
        filtered
          .map((agent) => (
            <div key={agent.id} className="card">
              <img src="" alt="" />
              <div>{agent.name}</div>
              <div>{agent.id}</div>
              <div>{agent.income}</div>
            </div>
          ))
          .slice(0, counter)}
      <button onClick={() => handleCounter("more")}>show More</button>
      <button onClick={() => handleCounter("less")}>show Less</button>
    </div>
  );
}

export default App;
