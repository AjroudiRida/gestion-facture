import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../Models/Client.model';
import { DatabaseService } from '../../services/database-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ajouter-client',
  imports: [FormsModule, RouterLink],
  templateUrl: './ajouter-client.html',
  styleUrl: './ajouter-client.css',
})
export class AjouterClient {
  newClient: Client = {
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: 0
  }

  constructor(private db: DatabaseService, private cdr: ChangeDetectorRef, private route: Router) {
  }

  async addProduct() {
    if (this.newClient.nom && this.newClient.email
      && this.newClient.telephone
      && this.newClient.adresse
      && this.newClient.ville
      && this.newClient.codePostal) {

      await this.db.addClient(this.newClient);
      this.route.navigate(['/clients']);
      this.cdr.detectChanges()
    }
  }
}
