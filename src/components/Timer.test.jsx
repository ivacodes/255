import { vi } from "vitest";
import { StrictMode } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Timer } from "./Timer";

const play = () => screen.queryByLabelText("Start");
const stop = () => screen.queryByLabelText("Stop");
const tick = (seconds) => act(() => vi.advanceTimersByTime(seconds * 1000));

beforeEach(() => {
  vi.useFakeTimers();
  window.HTMLMediaElement.prototype.play.mockClear();
});

afterEach(() => {
  vi.useRealTimers();
});

test("initially shows work time, stopped, with a play button", () => {
  render(<Timer workTime={25} breakTime={5} />);

  expect(screen.getByText("Work")).toBeInTheDocument();
  expect(screen.getByText("25:00")).toBeInTheDocument();
  expect(play()).toBeInTheDocument();
  expect(stop()).not.toBeInTheDocument();
});

test("counts down once a second after play and updates the page title", () => {
  render(<Timer workTime={2} breakTime={1} />);

  fireEvent.click(play());
  expect(stop()).toBeInTheDocument();

  tick(5);
  expect(screen.getByText("01:55")).toBeInTheDocument();
  expect(document.title).toBe("W 01:55");
});

test("stop resets the countdown to the work time", () => {
  render(<Timer workTime={2} breakTime={1} />);

  fireEvent.click(play());
  tick(30);
  fireEvent.click(stop());

  expect(screen.getByText("02:00")).toBeInTheDocument();
  expect(play()).toBeInTheDocument();

  tick(10);
  expect(screen.getByText("02:00")).toBeInTheDocument();
});

test("switches to break with a bell when work time ends, then back to work", () => {
  render(<Timer workTime={1} breakTime={1} />);

  fireEvent.click(play());
  tick(60);

  expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  expect(screen.getByText("Break")).toBeInTheDocument();
  expect(screen.getByText("01:00")).toBeInTheDocument();
  expect(document.title).toMatch(/^B /);

  tick(60);
  expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  expect(screen.getByText("Work")).toBeInTheDocument();
});

test("changing the work time stops the timer and resets the display", () => {
  const { rerender } = render(
    <Timer workTime={2} breakTime={1} />
  );

  fireEvent.click(play());
  tick(10);
  rerender(<Timer workTime={3} breakTime={1} />);

  expect(screen.getByText("03:00")).toBeInTheDocument();
  expect(play()).toBeInTheDocument();
});

test("does not start on mount, even under StrictMode", () => {
  render(
    <StrictMode>
      <Timer workTime={2} breakTime={1} />
    </StrictMode>
  );

  tick(5);
  expect(screen.getByText("02:00")).toBeInTheDocument();
  expect(play()).toBeInTheDocument();
  expect(stop()).not.toBeInTheDocument();
});

test("selecting a phase stops a running countdown and shows that phase", () => {
  const { rerender } = render(<Timer workTime={2} breakTime={1} />);

  fireEvent.click(play());
  tick(10);
  rerender(<Timer workTime={2} breakTime={1} selection={{ phase: "break" }} />);

  expect(screen.getByText("Break")).toBeInTheDocument();
  expect(screen.getByText("01:00")).toBeInTheDocument();
  expect(play()).toBeInTheDocument();
  tick(10);
  expect(screen.getByText("01:00")).toBeInTheDocument();
});

test("changing the break time while on break updates the display", () => {
  const { rerender } = render(
    <Timer workTime={2} breakTime={1} selection={{ phase: "break" }} />
  );

  rerender(<Timer workTime={2} breakTime={3} selection={{ phase: "break" }} />);
  expect(screen.getByText("03:00")).toBeInTheDocument();
});
