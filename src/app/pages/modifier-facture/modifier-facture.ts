import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { DatabaseService } from '../../services/database-service';
import { Facture } from '../../Models/Facture.model';
import { LigneFacture } from '../../Models/LigneFacture.model';
import { Client } from '../../Models/Client.model';
import { Produit } from '../../Models/Produit.model';

@Component({
  selector: 'app-modifier-facture',
  imports: [FormsModule, RouterLink, DecimalPipe],
  templateUrl: './modifier-facture.html',
  styleUrl: './modifier-facture.css',
})
export class ModifierFacture implements OnInit {
  id = input.required<string>();

  facture: Facture = {
    numero: '',
    dateCreation: new Date(),
    dateEcheance: undefined,
    clientId: 0,
    sousTotal: 0,
    tauxTva: 20,
    total: 0,
    statut: 'brouillon'
  };

  clients: Client[] = [];
  products: Produit[] = [];
  lignFactures: LigneFacture[] = [];
  deletedLigneIds: number[] = [];

  constructor(
    private db: DatabaseService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadClients();
    await this.loadProducts();
    await this.loadFacture();
  }

  async loadClients() {
    this.clients = await this.db.getAllClients();
  }

  async loadProducts() {
    this.products = await this.db.getAllProducts();
  }

  async loadFacture() {
    const result = await this.db.getFactureWithLignes(Number(this.id()));
    if (result) {
      this.facture = result.facture;
      this.lignFactures = result.lignes;
      this.cdr.detectChanges();
    }
  }

  addLigne() {
    this.lignFactures.push({
      factureId: Number(this.id()),
      produitId: 0,
      designation: '',
      quantite: 1,
      prixUnitaire: 0,
      montant: 0
    });
  }

  removeLigne(index: number) {
    const ligne = this.lignFactures[index];
    if (ligne.id) {
      this.deletedLigneIds.push(ligne.id);
    }
    this.lignFactures.splice(index, 1);
    this.calculateTotals();
  }

  onProductSelect(ligne: LigneFacture, produitId: number) {
    const product = this.products.find(p => p.id === Number(produitId));
    if (product) {
      ligne.produitId = product.id!;
      ligne.designation = product.nom;
      ligne.prixUnitaire = product.prix;
      this.calculateLigneMontant(ligne);
    }
  }

  calculateLigneMontant(ligne: LigneFacture) {
    ligne.montant = ligne.quantite * ligne.prixUnitaire;
    this.calculateTotals();
  }

  calculateTotals() {
    this.facture.sousTotal = this.lignFactures.reduce((sum, l) => sum + l.montant, 0);
    const tvaAmount = this.facture.sousTotal * ((this.facture.tauxTva || 0) / 100);
    this.facture.total = this.facture.sousTotal + tvaAmount;
  }

  getTvaAmount(): number {
    return this.facture.sousTotal * ((this.facture.tauxTva || 0) / 100);
  }

  async updateFacture() {
    // Update the facture
    await this.db.updateFacture(this.facture);

    // Delete removed lignes
    for (const ligneId of this.deletedLigneIds) {
      await this.db.removeLigneFacture(ligneId);
    }

    // Update or add lignes
    for (const ligne of this.lignFactures) {
      ligne.factureId = Number(this.id());
      if (ligne.id) {
        await this.db.updateLigneFacture(ligne);
      } else {
        await this.db.addLigneFacture(ligne);
      }
    }

    this.router.navigate(['/factures', this.id()]);
  }
}
