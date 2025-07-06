import { RecipeStep } from './recipe-step.model';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: RecipeStep[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
}
