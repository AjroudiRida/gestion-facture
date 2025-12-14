import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { DatabaseService } from '../../services/database-service';
import { Facture } from '../../Models/Facture.model';
import { LigneFacture } from '../../Models/LigneFacture.model';
import { Client } from '../../Models/Client.model';
import { Produit } from '../../Models/Produit.model';

@Component({
  selector: 'app-ajouter-facture',
  imports: [FormsModule, RouterLink, DecimalPipe],
  templateUrl: './ajouter-facture.html',
  styleUrl: './ajouter-facture.css',
})
export class AjouterFacture implements OnInit {
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

  constructor(
    private db: DatabaseService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadClients();
    await this.loadProducts();
    this.generateNumero();
  }

  generateNumero() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.facture.numero = `FAC-${year}-${random}`;
  }

  async loadClients() {
    this.clients = await this.db.getAllClients();
    this.cdr.detectChanges();
  }

  async loadProducts() {
    this.products = await this.db.getAllProducts();
    this.cdr.detectChanges();
  }

  addLigne() {
    this.lignFactures.push({
      factureId: 0,
      produitId: 0,
      designation: '',
      quantite: 1,
      prixUnitaire: 0,
      montant: 0
    });
  }

  removeLigne(index: number) {
    this.lignFactures.splice(index, 1);
    this.calculateTotals();
  }

  onProductSelect(ligne: LigneFacture, produitId: number) {
    const product = this.products.find(p => p.id === Number(produitId));
    if (product) {
      if (product.id) {
        ligne.produitId = product.id;
      }
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

  async addFacture() {
    // Save the facture first
    const factureId = await this.db.addFacture(this.facture);

    // Save each ligne with the factureId
    for (const ligne of this.lignFactures) {
      ligne.factureId = factureId;
      await this.db.addLigneFacture(ligne);
    }

    this.router.navigate(['/factures']);
  }
}
