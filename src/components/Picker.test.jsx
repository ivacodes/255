import { render, screen, fireEvent } from "@testing-library/react";
import { Picker } from "./Picker";

const inc = (t) => screen.getByLabelText(`Increase ${t} time`);
const dec = (t) => screen.getByLabelText(`Decrease ${t} time`);

test("shows title and default value and reports it to the parent", () => {
  const getRes = vi.fn();
  render(<Picker title='Work' defValue={25} getRes={getRes} />);

  expect(screen.getByText("Work")).toBeInTheDocument();
  expect(screen.getByText("25")).toBeInTheDocument();
  expect(getRes).toHaveBeenLastCalledWith(25);
});

test("up and down arrows change the value", () => {
  const getRes = vi.fn();
  render(
    <Picker title='Break' defValue={5} getRes={getRes} />
  );

  fireEvent.click(inc("break"));
  expect(screen.getByText("6")).toBeInTheDocument();
  expect(getRes).toHaveBeenLastCalledWith(6);

  fireEvent.click(dec("break"));
  fireEvent.click(dec("break"));
  expect(screen.getByText("4")).toBeInTheDocument();
  expect(getRes).toHaveBeenLastCalledWith(4);
});

test("value cannot go below 1", () => {
  render(
    <Picker title='Break' defValue={2} getRes={() => {}} />
  );

  fireEvent.click(dec("break"));
  expect(screen.getByText("1")).toBeInTheDocument();

  fireEvent.click(dec("break"));
  expect(screen.getByText("1")).toBeInTheDocument();
});

test("reset restores the default value", () => {
  const getRes = vi.fn();
  render(
    <Picker title='Work' defValue={25} getRes={getRes} />
  );

  fireEvent.click(inc("work"));
  fireEvent.click(inc("work"));
  expect(screen.getByText("27")).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText("Reset work time"));
  expect(screen.getByText("25")).toBeInTheDocument();
  expect(getRes).toHaveBeenLastCalledWith(25);
});

test("down arrow is marked disabled at the minimum", () => {
  render(<Picker title='Work' defValue={1} getRes={() => {}} />);

  expect(dec("work")).toHaveAttribute("aria-disabled", "true");
  expect(inc("work")).toHaveAttribute("aria-disabled", "false");
});
