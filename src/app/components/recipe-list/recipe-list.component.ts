import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCategory } from '../../models/recipe-category.enum';
import { CommonModule } from '@angular/common';
import { PRIMENG_MODULES } from '../../primeng.components';

@Component({
  imports: [CommonModule, ...PRIMENG_MODULES],
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  categories = Object.values(RecipeCategory);

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadMockRecipes();
  }

  loadMockRecipes(): void {
    if (!localStorage.getItem('recipes')) {
      const mock: Recipe[] = [
        {
          id: '1',
          title: 'Pasta Carbonara Clásica',
          description: 'Una deliciosa pasta con crema y tocino.',
          category: RecipeCategory.PlatoFuerte,
          ingredients: ['Pasta', 'Crema', 'Tocino', 'Queso'],
          steps: [
            { order: 1, description: 'Hervir la pasta.' },
            { order: 2, description: 'Freír el tocino.' },
            { order: 3, description: 'Mezclar con la crema y queso.' },
          ],
          imageUrl: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Tacos de Pescado con Salsa Verde',
          description: 'Tacos frescos con pescado y salsa picante.',
          category: RecipeCategory.Entrada,
          ingredients: ['Tortillas', 'Pescado', 'Salsa verde'],
          steps: [
            { order: 1, description: 'Cocinar el pescado.' },
            { order: 2, description: 'Preparar las tortillas.' },
            { order: 3, description: 'Montar y servir.' },
          ],
          imageUrl: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      localStorage.setItem('recipes', JSON.stringify(mock));
    }

    this.recipes = this.recipeService.getRecipes();
  }
}
