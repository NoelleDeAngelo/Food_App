import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import FilterableFoodList from "@/components/FilterableFoodList";

describe("FilterableFoodList", () => {
// mock categories
  const categories = [
    { id: 1, name: "Breakfast" },
    { id: 2, name: "Lunch" },
    { id: 3, name: "Dinner" },
  ];
// mock items with categories and tags
  const items = [
    {
      id: 1,
      name: "Oatmeal",
      tags: [{ id: 1, name: "Warm" }, { id: 4, name: "Easy" }],
      categories: [{ id: 1, name: "Breakfast" }],
    },
    {
      id: 2,
      name: "Salad",
      tags: [{ id: 2, name: "Cold" }, { id: 5, name: "Fresh" }],
      categories: [{ id: 2, name: "Lunch" }],
    },
    {
      id: 3,
      name: "Steak",
      tags: [{ id: 3, name: "Hot" }],
      categories: [{ id: 3, name: "Dinner" }],
    },
    {
      id: 4,
      name: "Pasta",
      tags: [{ id: 4, name: "Hot" }, { id: 5, name: "Easy" }],
      categories: [{ id: 3, name: "Dinner" }, { id: 2, name: "Lunch" }],
    },
  ];
  
  //----------------------Tests---------------------------------

  it("should show all items when no category is selected", async () => {
    render(<FilterableFoodList categories={categories} items={items} />);

    expect(screen.getByText("Oatmeal")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
    expect(screen.getByText("Steak")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
  });

  it("should filter items based on selected category", async () => {
    render(<FilterableFoodList categories={categories} items={items} />);

    const dinnerChip = screen.getByText("Dinner");
    await userEvent.click(dinnerChip);

    expect(screen.queryByText("Oatmeal")).not.toBeInTheDocument();
    expect(screen.queryByText("Salad")).not.toBeInTheDocument();
    expect(screen.getByText("Steak")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
  });

  it("should display all items when 'All' is clicked", async () => {
    render(<FilterableFoodList categories={categories} items={items} />);

    const allChip = screen.getByText("All");
    const dinnerChip = screen.getByText("Dinner");

    await userEvent.click(allChip);

    expect(screen.getByText("Oatmeal")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
    expect(screen.getByText("Steak")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();

    await userEvent.click(dinnerChip);
    await userEvent.click(allChip);

    expect(screen.getByText("Oatmeal")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
    expect(screen.getByText("Steak")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
  });
});