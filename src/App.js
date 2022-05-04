import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgentContext from "./helpers/AgentContext";
import "./App.scss";
import Header from "./components/Header";
import Home from "./views/Home";
import Results from "./views/Results";

function App() {
  const [income, setIncome] = useState("");
  const [filtered, setFiltered] = useState([]);

  return (
    <AgentContext.Provider
      value={{
        income,
        setIncome,
        filtered,
        setFiltered,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/result"
              element={<Results filtered={filtered} income={income} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AgentContext.Provider>
  );
}

export default App;
