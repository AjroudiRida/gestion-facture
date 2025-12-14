import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DatabaseService } from '../../services/database-service';
import { Facture } from '../../Models/Facture.model';
import { LigneFacture } from '../../Models/LigneFacture.model';

@Component({
  selector: 'app-detail-facture',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './detail-facture.html',
  styleUrl: './detail-facture.css',
})
export class DetailFacture implements OnInit {
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

  lignes: LigneFacture[] = [];
  clientName: string = '';

  constructor(
    private db: DatabaseService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadFacture();
  }

  async loadFacture() {
    const result = await this.db.getFactureWithLignes(Number(this.id()));
    if (result) {
      this.facture = result.facture;
      this.lignes = result.lignes;
      await this.loadClientName();
      this.cdr.detectChanges();
    }
  }

  async loadClientName() {
    const client = await this.db.getClientById(Number(this.facture.clientId));
    this.clientName = client ? client.nom : 'Client inconnu';
  }

  getTvaAmount(): number {
    return this.facture.sousTotal * ((this.facture.tauxTva || 0) / 100);
  }

  editFacture() {
    this.router.navigate(['/factures', this.id(), 'edit']);
  }

  async removeFacture() {
    await this.db.removeFacture(Number(this.id()));
    this.router.navigate(['/factures']);
  }
}
