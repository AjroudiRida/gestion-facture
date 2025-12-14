import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DatabaseService } from '../../services/database-service';
import { Facture } from '../../Models/Facture.model';
import { Client } from '../../Models/Client.model';

@Component({
  selector: 'app-factures',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './factures.html',
  styleUrl: './factures.css',
})
export class Factures implements OnInit {
  factures: Facture[] = [];
  clients: Client[] = [];

  constructor(private db: DatabaseService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    await this.loadClients();
    await this.loadInvoices();
  }

  async loadClients() {
    this.clients = await this.db.getAllClients();
  }

  async loadInvoices() {
    this.factures = await this.db.getAllFactures();
    this.cdr.detectChanges();
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === Number(clientId));
    return client ? client.nom : 'Client inconnu';
  }

  async removeFacture(id: number | undefined) {
    if (id) {
      await this.db.removeFacture(id);
      await this.loadInvoices();
    }
  }
}
