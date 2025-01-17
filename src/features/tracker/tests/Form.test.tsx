import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Form } from "@/features/tracker/components/Form";
import { TaskTrackerProvider } from "../hooks/useTaskTracker";

describe("Form", () => {
  const renderForm = () => {
    return render(
      <TaskTrackerProvider>
        <Form />
      </TaskTrackerProvider>
    );
  };

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should show form when add button is clicked", async () => {
    renderForm();

    expect(
      screen.queryByPlaceholderText("Enter task title (35 characters)")
    ).not.toBeInTheDocument();

    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    expect(
      screen.queryByPlaceholderText("Enter task title (35 characters)")
    ).toBeInTheDocument();
  });

  it("should handle priority changes correctly", async () => {
    renderForm();

    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    const prioritySelect = screen.getByRole("combobox");

    await userEvent.selectOptions(prioritySelect, "high");
    expect(prioritySelect).toHaveValue("high");

    await userEvent.selectOptions(prioritySelect, "medium");
    expect(prioritySelect).toHaveValue("medium");

    await userEvent.selectOptions(prioritySelect, "low");
    expect(prioritySelect).toHaveValue("low");
  });
});
