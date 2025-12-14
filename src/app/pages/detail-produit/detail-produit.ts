import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { DatabaseService } from '../../services/database-service';
import { Produit } from '../../Models/Produit.model';

@Component({
  selector: 'app-detail-produit',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './detail-produit.html',
  styleUrl: './detail-produit.css',
})
export class DetailProduit implements OnInit {

  id = input.required<string>();

  product: Produit = {
    nom: '',
    description: '',
    prix: 0
  }

  constructor(private db: DatabaseService, private cdr: ChangeDetectorRef, private route: Router) { }

  async ngOnInit() {
    await this.productDetails();
  }

  async productDetails() {
    const result = await this.db.getProductById(Number(this.id()));
    if (result) {
      this.product = result;
      this.cdr.detectChanges();
    }
  }

  async removeProduct() {
    if (this.product) {
      await this.db.removeProduct(Number(this.id()));
      this.route.navigate(['/produits']);
    }
  }

  editProduct() {
    this.route.navigate(['produits', Number(this.id()), 'edit']);
  }
}

