import { Component, OnInit } from '@angular/core';
import { SellerCategoryService } from '../services/seller-category.service';
import { ISellerCategory } from '../models/seller-category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const nameValid = (control: FormControl): {[key: string]: any} => {
  const firstLetter = control.value.toString()[0];
  return (!!firstLetter && (firstLetter !== firstLetter.toUpperCase())) ?
    { 'nameValid': 'invalid name' } : null;
};

@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styles: [`
    em { color: #E05C65; padding-left: 10px; }
    .error input, .error select, .error textarea { background-color:#E3C3C5; }
  `]
})
export class CreateSellerComponent implements OnInit {
  categoryLookupCollection: Array<any>;
  taxesByCategory: Array<any>;
  taxLookupCollection: Array<any>;
  newSellerForm: FormGroup;
  category: FormControl;
  tax: FormControl;
  name: FormControl;

  constructor(private sellerCategoryService: SellerCategoryService) { }

  onChangeCategory(value) {
    if (value) {
      const { taxes } = this.taxesByCategory.find((tc) => tc.categoryId === +value);
      this.taxLookupCollection = taxes.map((t) => ({ id: t.id, name: t.name }));
      this.tax.enable();
    } else {
      this.tax.disable();
    }
    this.tax.setValue('');
  }

  saveSeller(formValues) {
    console.log(formValues);
  }

  ngOnInit() {
    this.initializeForm();
    const categories: ISellerCategory[] = this.sellerCategoryService.getSellerCategories();
    this.populateCategoryLookupCollection(categories);
    this.populateTaxesByCategory(categories);
  }

  private initializeForm() {
    this.category = new FormControl('', Validators.required);
    this.tax = new FormControl('', Validators.required);
    this.name = new FormControl('', [Validators.required, nameValid]);
    this.newSellerForm = new FormGroup({
      category: this.category,
      tax: this.tax,
      name: this.name
    });
    this.tax.disable();
  }

  private populateCategoryLookupCollection(categories: ISellerCategory[]): void {
    this.categoryLookupCollection = categories.map(
      (category) => ({
        id: category.id,
        name: category.name
      })
    );
  }

  private populateTaxesByCategory(categories: ISellerCategory[]): void {
    this.taxesByCategory = categories.map((sc) => ({
      categoryId: sc.id,
      taxes: [...sc.taxes]
    }));
  }
}
