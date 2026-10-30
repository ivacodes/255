import { vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  // jsdom has no FontFaceSet
  document.fonts = { load: vi.fn(() => Promise.resolve([])) };
});

afterEach(() => {
  delete document.fonts;
});

test("renders heading, both pickers and the timer once fonts have loaded", async () => {
  render(<App />);

  expect(await screen.findByText("The timer.")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Break" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Work" })).toBeInTheDocument();
  expect(screen.getByText("25:00")).toBeInTheDocument();
});

test("changing the work picker updates the timer display", async () => {
  render(<App />);
  await screen.findByText("The timer.");

  fireEvent.click(screen.getByLabelText("Increase work time"));

  expect(screen.getByText("26:00")).toBeInTheDocument();
});

test("renders nothing until fonts are loaded", () => {
  document.fonts.load = vi.fn(() => new Promise(() => {}));
  const { container } = render(<App />);

  expect(container).toBeEmptyDOMElement();
});

test("clicking Break puts the break on the tomato, ready to start", async () => {
  render(<App />);
  await screen.findByText("The timer.");

  fireEvent.click(screen.getByRole("button", { name: "Break" }));

  expect(document.querySelector(".tomato-container h2")).toHaveTextContent("Break");
  expect(screen.getByText("05:00")).toBeInTheDocument();
  expect(screen.getByLabelText("Start")).toBeInTheDocument();
});

test("clicking Work goes back to the work countdown", async () => {
  render(<App />);
  await screen.findByText("The timer.");

  fireEvent.click(screen.getByRole("button", { name: "Break" }));
  fireEvent.click(screen.getByRole("button", { name: "Work" }));

  expect(screen.getByText("25:00")).toBeInTheDocument();
});

test("a selected break counts down when started", async () => {
  vi.useFakeTimers({ shouldAdvanceTime: false });
  render(<App />);
  await act(async () => {});

  fireEvent.click(screen.getByRole("button", { name: "Break" }));
  fireEvent.click(screen.getByLabelText("Start"));
  act(() => vi.advanceTimersByTime(3000));

  expect(screen.getByText("04:57")).toBeInTheDocument();
  vi.useRealTimers();
});
