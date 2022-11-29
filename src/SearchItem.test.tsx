import React from "react";
import { render, screen } from "@testing-library/react";
import SearchItem from "./SearchItem";

const defaultProps = {
  onClick: () => {},
  name: "",
  phrase: "",
  email: "",
  id: "123",
};
describe("SearchItemType", () => {
  it("should render both highlighted and not highlighted parts of the user name", () => {
    render(<SearchItem {...defaultProps} name="Deel" phrase="ee" />);
    const prefixPart = screen.getByText(/D/);
    const phrasePart = screen.getByText("ee");
    const suffixPart = screen.getByText(/l/);

    expect(prefixPart).toBeInTheDocument();
    expect(phrasePart).toBeInTheDocument();
    expect(suffixPart).toBeInTheDocument();
  });

  it("should ignore letter case when comparing words", () => {
    render(<SearchItem {...defaultProps} name="Deel" phrase="de" />);
    const phrasePart = screen.getByText(/De/);
    const suffixPart = screen.getByText(/el/);

    expect(phrasePart).toBeInTheDocument();
    expect(suffixPart).toBeInTheDocument();
  });

  it("should return null if phrase no longer matches name while typing new phrase in app", () => {
    render(<SearchItem {...defaultProps} name="Deel" phrase="xx" />);
    const phrasePart = screen.queryByText(/Deel/);

    expect(phrasePart).not.toBeInTheDocument();
  });
});
