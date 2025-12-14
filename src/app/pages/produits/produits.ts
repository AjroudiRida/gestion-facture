import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Produit } from '../../Models/Produit.model';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database-service';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-produits',
  imports: [FormsModule, RouterLink, DecimalPipe],
  templateUrl: './produits.html',
  styleUrl: './produits.css',
})


export class Produits implements OnInit {
  products: Produit[] = [];


  constructor(
    private db: DatabaseService,
    private cdr: ChangeDetectorRef,
    private route: Router
  ) { }

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    this.products = await this.db.getAllProducts();
    this.cdr.detectChanges();
  }

  async removeProduct(id: number | undefined) {
    if (id) {
      await this.db.removeProduct(id);
      this.loadProducts();
    }
  }

  async editProduct(id: number | undefined) {
    if (id) {
      this.route.navigate(['/produits', id, 'edit'])
    }
  }

}
