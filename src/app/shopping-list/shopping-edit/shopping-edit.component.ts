import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('formItem', { static: false }) shoppingListForm: NgForm;
  startedEditingSubscription: Subscription;
  editMode: boolean = false;
  editItemIndex: number;
  editIngredient: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.startedEditingSubscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
            this.editMode = true;
            this.editItemIndex = index;
            this.editIngredient = this.slService.getIngredient(index);
            this.shoppingListForm.setValue({
              name: this.editIngredient.name,
              amount: this.editIngredient.amount
            })
        }
      );
  }

  onSubmit(form: NgForm) {

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.startedEditingSubscription.unsubscribe();
  }
}
