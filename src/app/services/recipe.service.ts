import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly STORAGE_KEY = 'recipes';
  private recipes: Recipe[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.recipes = JSON.parse(data);
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.recipes));
  }

  getRecipes(): Recipe[] {
    return this.recipes.map((recipe) => this.sortRecipeSteps(recipe));
  }

  getRecipeById(id: string): Recipe | undefined {
    const recipe = this.recipes.find((r) => r.id === id);
    return recipe ? this.sortRecipeSteps(recipe) : undefined;
  }

  saveRecipe(recipe: Recipe): void {
    const index = this.recipes.findIndex((r) => r.id === recipe.id);
    if (index >= 0) {
      this.recipes[index] = recipe;
    } else {
      this.recipes.push(recipe);
    }
    this.saveToStorage();
  }

  deleteRecipe(id: string): void {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    this.saveToStorage();
  }

  private sortRecipeSteps(recipe: Recipe): Recipe {
    return {
      ...recipe,
      steps: recipe.steps.slice().sort((a, b) => a.order - b.order),
    };
  }
}
