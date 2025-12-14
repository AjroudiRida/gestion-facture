import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../Models/Produit.model';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  newProduct: Produit = {
    nom: '',
    description: '',
    prix: 0
  }

  @Output() submitProduct = new EventEmitter<Produit>();

  addProduct() {
    this.submitProduct.emit(this.newProduct);
    this.newProduct = {
      nom: '',
      description: '',
      prix: 0,
    }
  }
}
