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

  // mock tags
  const tags = [
    { id: 1, name: "Warm" },
    { id: 2, name: "Cold" },
    { id: 3, name: "Hot" },
    { id: 4, name: "Easy" },
    { id: 5, name: "Fresh" },
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
      tags: [{ id: 3, name: "Hot" }, { id: 4, name: "Easy" }],
      categories: [{ id: 3, name: "Dinner" }, { id: 2, name: "Lunch" }],
    },
  ];

  //----------------------Tests---------------------------------

  it("should show all items when no category or tag is selected", () => {
    render(<FilterableFoodList categories={categories} items={items} tags={tags} />);

    expect(screen.getByText("Oatmeal")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
    expect(screen.getByText("Steak")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
  });

  it("should filter items based on selected category", async () => {
    render(<FilterableFoodList categories={categories} items={items} tags={tags} />);
    const user = userEvent.setup();

    const dinnerChip = screen.getByText("Dinner");
    await user.click(dinnerChip);

    expect(screen.queryByText("Oatmeal")).not.toBeInTheDocument();
    expect(screen.queryByText("Salad")).not.toBeInTheDocument();
    expect(screen.getByText("Steak")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
  });

  it("should display all items when 'All' is clicked if no tags are selected", async () => {
    render(<FilterableFoodList categories={categories} items={items} tags={tags} />);
    const user = userEvent.setup();

    const allChip = screen.getByText("All");
    const dinnerChip = screen.getByText("Dinner");

    await user.click(allChip);

    expect(screen.getByText("Oatmeal")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
    expect(screen.getByText("Steak")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();

    await user.click(dinnerChip);
    await user.click(allChip);

    expect(screen.getByText("Oatmeal")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
    expect(screen.getByText("Steak")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
  });

  it("shows filter options when the filter button is clicked", async () => {
    render(<FilterableFoodList categories={categories} items={items} tags={tags} />);

    const user = userEvent.setup();

    const filterButton = screen.getByText("Filter");
    await user.click(filterButton);

    expect(screen.getByRole("button", { name: "Warm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cold" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hot" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Easy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fresh" })).toBeInTheDocument();


  });


  it("hides filter options when the filter button is clicked a second time", async () => {
    render(
      <FilterableFoodList categories={categories} items={items} tags={tags} />,
    );

    const user = userEvent.setup();

    const filterButton = screen.getByText("Filter");
    await user.click(filterButton);
    await user.click(filterButton);

    expect(screen.queryByRole("button", { name: "Warm" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Cold" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Hot" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Easy" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Fresh" })).not.toBeInTheDocument();

  });


  it("filters items based on one selected tag ", async () => {
    render(<FilterableFoodList categories={categories} items={items} tags={tags} />);

    const user = userEvent.setup();

    const filterButton = screen.getByText("Filter");
    await user.click(filterButton);

    const warmTag = screen.getByRole("button", { name: "Warm" });
    await user.click(warmTag);

    expect(screen.getByText("Oatmeal")).toBeInTheDocument();
    expect(screen.queryByText("Salad")).not.toBeInTheDocument();
    expect(screen.queryByText("Steak")).not.toBeInTheDocument();
    expect(screen.queryByText("Pasta")).not.toBeInTheDocument();
  });

    it("filters items based on all selected tags", async () => {
      render(
        <FilterableFoodList
          categories={categories}
          items={items}
          tags={tags}
        />,
      );

      const user = userEvent.setup();

      const filterButton = screen.getByText("Filter");
      await user.click(filterButton);

      const hotTag = screen.getByRole("button", { name: "Hot" });
      await user.click(hotTag);
      const easyTag = screen.getByRole("button", { name: "Easy" });
      await user.click(easyTag);

        expect(screen.queryByText("Oatmeal")).not.toBeInTheDocument();
        expect(screen.queryByText("Salad")).not.toBeInTheDocument();
        expect(screen.queryByText("Steak")).not.toBeInTheDocument();
        expect(screen.getByText("Pasta")).toBeInTheDocument();

      const freshTag = screen.getByRole("button", { name: "Fresh" });
      await user.click(freshTag);

              expect(screen.queryByText("Oatmeal")).not.toBeInTheDocument();
              expect(screen.queryByText("Salad")).not.toBeInTheDocument();
              expect(screen.queryByText("Steak")).not.toBeInTheDocument();
              expect(screen.queryByText("Pasta")).not.toBeInTheDocument();
    });

  it("filters by tag and category at the same time", async () => {
    render(
      <FilterableFoodList categories={categories} items={items} tags={tags} />,
    );

    const user = userEvent.setup();
    
    const filterButton = screen.getByText("Filter");
    await user.click(filterButton);

    const easyTag = screen.getByRole("button", { name: "Easy" });
    await user.click(easyTag);

    const lunchChip = screen.getByText("Lunch");
    await user.click(lunchChip);

    expect(screen.queryByText("Oatmeal")).not.toBeInTheDocument();
    expect(screen.queryByText("Salad")).not.toBeInTheDocument();
    expect(screen.queryByText("Steak")).not.toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
  });

});