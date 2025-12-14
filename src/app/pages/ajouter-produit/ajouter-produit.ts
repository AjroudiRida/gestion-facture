import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductForm } from '../../components/product-form/product-form';
import { Produit } from '../../Models/Produit.model';
import { DatabaseService } from '../../services/database-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-produit',
  imports: [FormsModule, ProductForm],
  templateUrl: './ajouter-produit.html',
  styleUrl: './ajouter-produit.css',
})
export class AjouterProduit {
  constructor(private db: DatabaseService, private cdr: ChangeDetectorRef, private route: Router) { }


  async addProduct(newProduct: Produit) {
    if (newProduct.nom && newProduct.description && newProduct.prix) {
      await this.db.addProduct(newProduct);
      this.route.navigate(['/produits']);
    }
  }
}
