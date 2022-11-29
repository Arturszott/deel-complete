import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as API from "./API";
import App from "./App";
import { SearchItemType } from "./types";

const mockedAPI = jest.mocked(API, true);

jest.mock("./API", () => ({
  search: jest.fn(),
}));

describe("App", () => {
  it("should render input field", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Type to search for the user");
    expect(input).toBeInTheDocument();
  });

  it("should display autocomplete suggestions with highlighted part", async () => {
    mockedAPI.search.mockResolvedValueOnce([
      { name: "Test", email: "some@mail.com", id: "1" },
    ]);

    render(<App />);

    const input = screen.getByPlaceholderText("Type to search for the user");

    userEvent.type(input, "Te");
    await waitFor(() => screen.findByText("Te"));

    expect(screen.getByText("Te")).toBeInTheDocument();
    expect(screen.getByText("st")).toBeInTheDocument();
  });

  it("should set clicked suggestion as input value", async () => {
    mockedAPI.search.mockResolvedValueOnce([
      { name: "Suggestion", email: "some@mail.com", id: "1" },
    ]);

    render(<App />);

    const input = screen.getByPlaceholderText("Type to search for the user");

    userEvent.type(input, "S");
    await waitFor(() => screen.findByText("S"));

    userEvent.click(screen.getByText("uggestion"));

    expect(screen.getByDisplayValue("Suggestion")).toBeInTheDocument();
    expect(screen.queryByText("ggestion")).not.toBeInTheDocument();
  });

  it("should delay calling API until user stops typing", async () => {
    mockedAPI.search.mockResolvedValueOnce([
      { name: "Test", email: "some@mail.com", id: "1" },
    ]);

    render(<App />);

    const input = screen.getByPlaceholderText("Type to search for the user");

    await userEvent.type(input, "Tes", { delay: 200 });

    await waitFor(() => screen.findByText("Tes"));

    expect(mockedAPI.search).toHaveBeenCalledWith("Tes");
    expect(mockedAPI.search).toHaveBeenCalledTimes(1);
  });

  it("should display loader until API call is finished", async () => {
    const unresolvedPromise = new Promise<SearchItemType[]>(() => []);
    mockedAPI.search.mockImplementationOnce(() => unresolvedPromise);

    render(<App />);

    const input = screen.getByPlaceholderText("Type to search for the user");

    await userEvent.type(input, "Test");
    await waitFor(() => screen.findByTestId("loader"));
  });
});
