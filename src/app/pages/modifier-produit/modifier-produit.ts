import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database-service';
import { Produit } from '../../Models/Produit.model';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-modifier-produit',
  imports: [FormsModule, RouterLink],
  templateUrl: './modifier-produit.html',
  styleUrl: './modifier-produit.css',
})
export class ModifierProduit implements OnInit {

  id = input.required<string>()
  product: Produit = {
    nom: '',
    description: '',
    prix: 0
  }

  constructor(private db: DatabaseService, private cdr: ChangeDetectorRef, private route: Router) { }

  async ngOnInit() {
    await this.editProduct()
  }

  async editProduct() {

    const result = await this.db.getProductById(Number(this.id()))
    if (result) {
      this.product = result
      this.cdr.detectChanges()
    }
  }

  async updateProduct() {
    await this.db.updateProduct(this.product);
    this.route.navigate(['/produits']);
  }

}
