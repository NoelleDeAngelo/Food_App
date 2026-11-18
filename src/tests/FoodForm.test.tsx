
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FoodForm from "@/components/FoodForm";
import type { ItemWithTagsAndCategories } from "@/types";

// Mock Next.js navigation and Server Actions
const { mockBack, mockCreateFood, mockUpdateFood } = vi.hoisted(() => ({
  mockBack: vi.fn(),
  mockCreateFood: vi.fn(),
  mockUpdateFood: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

vi.mock("@/app/item/actions", () => ({
  createFood: mockCreateFood,
  updateFood: mockUpdateFood,
}));

describe("FoodForm", () => {
  const categories = [
    { id: 1, name: "Breakfast" },
    { id: 2, name: "Lunch" },
    { id: 3, name: "Dinner" },
  ];

  const tags = [
    { id: 1, name: "Warm" },
    { id: 2, name: "Cold" },
    { id: 3, name: "Hot" },
    { id: 4, name: "Easy" },
    { id: 5, name: "Fresh" },
  ];

  const item: ItemWithTagsAndCategories = {
    id: 1,
    name: "Oatmeal",
    isAvailable: true,
    isOnGroceryList: false,
    tags: [
      { id: 1, name: "Warm" },
      { id: 4, name: "Easy" },
    ],
    categories: [{ id: 1, name: "Breakfast" }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateFood.mockResolvedValue({ id: 5 });
    mockUpdateFood.mockResolvedValue(undefined);
  });

  // ---------- Rendering ----------

  it("renders the create food form with the correct fields", () => {
    render(
      <FoodForm
        createNewFood={true}
        allCategories={categories}
        allTags={tags}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: /food name/i }),
    ).toHaveValue("");

    categories.forEach((category) => {
      expect(
        screen.getByRole("button", { name: category.name }),
      ).toBeInTheDocument();
    });

    tags.forEach((tag) => {
      expect(
        screen.getByRole("button", { name: tag.name }),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("checkbox", { name: /available to eat/i }),
    ).toBeChecked();

    expect(
      screen.getByRole("checkbox", { name: /on grocery list/i }),
    ).not.toBeChecked();

    expect(
      screen.getByRole("button", { name: /add food/i }),
    ).toBeDisabled();
  });

  it("populates the edit form with existing food data", () => {
    render(
      <FoodForm
        createNewFood={false}
        item={item}
        allCategories={categories}
        allTags={tags}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: /food name/i }),
    ).toHaveValue("Oatmeal");

    expect(
      screen.getByRole("button", { name: "Breakfast" }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getByRole("button", { name: "Lunch" }),
    ).toHaveAttribute("aria-pressed", "false");

    expect(
      screen.getByRole("button", { name: "Warm" }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getByRole("button", { name: "Easy" }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getByRole("button", { name: "Cold" }),
    ).toHaveAttribute("aria-pressed", "false");

    expect(
      screen.getByRole("checkbox", { name: /available to eat/i }),
    ).toBeChecked();

    expect(
      screen.getByRole("checkbox", { name: /on grocery list/i }),
    ).not.toBeChecked();

    expect(
      screen.getByRole("button", { name: /save changes/i }),
    ).toBeDisabled();
  });

  // ---------- Interactions ----------

  it("allows selecting and deselecting categories and tags", async () => {
    const user = userEvent.setup();

    render(
      <FoodForm
        createNewFood={false}
        item={item}
        allCategories={categories}
        allTags={tags}
      />,
    );

    const breakfast = screen.getByRole("button", {
      name: "Breakfast",
    });

    const dinner = screen.getByRole("button", {
      name: "Dinner",
    });

    const warm = screen.getByRole("button", {
      name: "Warm",
    });

    // Deselect existing category
    await user.click(breakfast);
    expect(breakfast).toHaveAttribute("aria-pressed", "false");

    // Select another category
    await user.click(dinner);
    expect(dinner).toHaveAttribute("aria-pressed", "true");

    // Deselect existing tag
    await user.click(warm);
    expect(warm).toHaveAttribute("aria-pressed", "false");

    expect(
      screen.getByRole("button", { name: /save changes/i }),
    ).toBeEnabled();
  });

  // ---------- Form submission ----------

  it("calls createFood with the entered values", async () => {
    const user = userEvent.setup();

    render(
      <FoodForm
        createNewFood={true}
        allCategories={categories}
        allTags={tags}
      />,
    );

    await user.type(
      screen.getByRole("textbox", { name: /food name/i }),
      "Toast",
    );

    await user.click(
      screen.getByRole("button", { name: "Breakfast" }),
    );

    await user.click(
      screen.getByRole("button", { name: "Easy" }),
    );

    await user.click(
      screen.getByRole("button", { name: /add food/i }),
    );

    await waitFor(() => {
      expect(mockCreateFood).toHaveBeenCalledWith({
        name: "Toast",
        categoryIds: [1],
        tagIds: [4],
        isAvailable: true,
        isOnGroceryList: false,
      });
    });

    expect(mockUpdateFood).not.toHaveBeenCalled();
    expect(mockBack).toHaveBeenCalledOnce();
  });

  it("calls updateFood with the modified values", async () => {
    const user = userEvent.setup();

    render(
      <FoodForm
        createNewFood={false}
        item={item}
        allCategories={categories}
        allTags={tags}
      />,
    );

    const nameInput = screen.getByRole("textbox", {
      name: /food name/i,
    });

    await user.clear(nameInput);
    await user.type(nameInput, "Apple Oatmeal");

    await user.click(
      screen.getByRole("checkbox", { name: /on grocery list/i }),
    );

    await user.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(mockUpdateFood).toHaveBeenCalledWith(
        {
          name: "Apple Oatmeal",
          categoryIds: [1],
          tagIds: [1, 4],
          isAvailable: true,
          isOnGroceryList: true,
        },
        item.id,
      );
    });

    expect(mockCreateFood).not.toHaveBeenCalled();
    expect(mockBack).toHaveBeenCalledOnce();
  });
});
