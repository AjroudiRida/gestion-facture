import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database-service';
import { Client } from '../../Models/Client.model';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-client',
  imports: [FormsModule, RouterLink],
  templateUrl: './modifier-client.html',
  styleUrl: './modifier-client.css',
})
export class ModifierClient implements OnInit {
  id = input.required<string>();
  client: Client = {
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: 0
  }

  constructor(private db: DatabaseService, private cdr: ChangeDetectorRef, private route: Router) { }

  async ngOnInit() {
    await this.editClient();
  }

  async editClient() {
    const result = await this.db.getClientById(Number(this.id()))
    if (result) {
      this.client = result;
      this.cdr.detectChanges()
    }
  }

  async updateClient() {
    if (this.client.nom && this.client.email
      && this.client.telephone
      && this.client.adresse
      && this.client.ville
      && this.client.codePostal) {
      await this.db.updateClient(this.client)
      this.cdr.detectChanges()
      this.route.navigate(['/clients'])
    }
  }


}
