import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../../services/database-service';
import { Client } from '../../Models/Client.model';

@Component({
  selector: 'app-clients',
  imports: [RouterLink],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients implements OnInit {
  clients: Client[] = [];
  constructor(private db: DatabaseService, private cdr: ChangeDetectorRef, private route: Router) { }

  async ngOnInit() {
    await this.loadClients();
  }

  async loadClients() {
    this.clients = await this.db.getAllClients();
    this.cdr.detectChanges();
  }

  async removeClient(id: number | undefined) {
    if (id) {
      await this.db.removeClient(id);
      await this.loadClients();
    }
  }
}
