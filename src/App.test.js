import { render, screen, fireEvent } from "@testing-library/react";
import AgentContext from "./helpers/AgentContext";
import Results from "./views/Results";

//<Results filtered={filtered} income={income}/>} />
const agents = [
  {
    id: 33,
    name: "Rand",
    avatar: "",
    income: 12580,
  },
  {
    id: 34,
    name: "Kathy",
    avatar: "",
    income: 10604,
  },
  {
    id: 35,
    name: "Susan",
    avatar: "",
    income: 13601,
  },
  {
    id: 36,
    name: "Robin",
    avatar: "",
    income: 10021,
  },
  {
    id: 37,
    name: "Peter",
    avatar: "",
    income: 12550,
  },
  {
    id: 38,
    name: "Diana",
    avatar: "",
    income: 10603,
  },
  {
    id: 39,
    name: "Richard",
    avatar: "",
    income: 12018,
  },
];

const ctxValue = {
  income: 10000,
  setIncome: () => {},
  filtered: agents,
  setFiltered: () => {},
};

describe("Test Appp", () => {
  test("See more button", () => {
    render(
      <AgentContext.Provider value={ctxValue}>
        <Results />
      </AgentContext.Provider>
    );
    const buttonMore = screen.getByText("Show More +");
    const buttonLess = screen.getByText("Show Less -");

    fireEvent.click(buttonMore);
    expect(screen.queryAllByRole("img").length).toBe(6);

    fireEvent.click(buttonLess);
    expect(screen.queryAllByRole("img").length).toBe(3);
  });
});
