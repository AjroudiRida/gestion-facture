import { Component, EventEmitter, input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Produit } from '../../Models/Produit.model';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Produit>();

  @Output() onDeleteProduct = new EventEmitter<number>();
  @Output() onEditProduct = new EventEmitter<number>();

  removeProduct() {
    this.onDeleteProduct.emit(this.product().id)
  }

  editProduct() {
    this.onEditProduct.emit(this.product().id)
  }
}
