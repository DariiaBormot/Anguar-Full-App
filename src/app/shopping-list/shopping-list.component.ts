import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Flower', 50),
    new Ingredient('Apple', 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }
  onIngridientAdded(inridien: Ingredient){
    this.ingredients.push(inridien);
  }

}
