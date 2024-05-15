type Meal = {
  type: string;
  description: string;
  ingredients: string[];
};
type Day = {
  day: string;
  meals: Meal[];
};
export type MealPlan = {
  plan: Day[];
  shoppingList: string[];
};
