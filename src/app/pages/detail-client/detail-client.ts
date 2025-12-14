import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../../services/database-service';
import { Client } from '../../Models/Client.model';

@Component({
  selector: 'app-detail-client',
  imports: [RouterLink],
  templateUrl: './detail-client.html',
  styleUrl: './detail-client.css',
})
export class DetailClient implements OnInit {
  id = input.required<string>();
  client: Client = {
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: 0
  }

  constructor(
    private db: DatabaseService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadClient();
  }

  async loadClient() {
    const result = await this.db.getClientById(Number(this.id()));
    if (result) {
      this.client = result;
      this.cdr.detectChanges();
    }
  }

  async removeClient() {
    if (this.client.id) {
      await this.db.removeClient(this.client.id);
      this.router.navigate(['/clients']);
    }
  }
}
