import { RecipeCategory } from './recipe-category.enum';
import { RecipeStep } from './recipe-step.model';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: RecipeCategory;
  ingredients: string[];
  steps: RecipeStep[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
}
