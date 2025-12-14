import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Produit } from '../Models/Produit.model';
import { Client } from '../Models/Client.model';
import { LigneFacture } from '../Models/LigneFacture.model';
import { Facture } from '../Models/Facture.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  produits!: Table<Produit, number>;
  clients!: Table<Client, number>;
  factures!: Table<Facture, number>;
  lignesFacture!: Table<LigneFacture, number>;

  constructor() {
    super('gestionFacture');

    this.version(1).stores({
      produits: '++id, nom, description, prix',
    });

    this.version(2).stores({
      produits: '++id, nom, description, prix',
      clients: '++id, nom, email, telephone, adresse, ville, codePostal'
    });

    this.version(3).stores({
      produits: '++id, nom, description, prix',
      clients: '++id, nom, email, telephone, adresse, ville, codePostal',
      factures: '++id, numero, date, clientId, statut',
      lignesFacture: '++id, factureId, produitId'
    });
  }

  async getAllProducts(): Promise<Produit[]> {
    return await this.produits.toArray();
  }

  async addProduct(product: Produit): Promise<number> {
    return await this.produits.add(product);
  }

  async removeProduct(id: number): Promise<void> {
    await this.produits.delete(id);
  }

  async getProductById(id: number): Promise<Produit | undefined> {
    return await this.produits.get(id)
  }

  async updateProduct(product: Produit): Promise<number> {
    return await this.produits.put(product);
  }

  async getAllClients(): Promise<Client[]> {
    return await this.clients.toArray();
  }

  async addClient(client: Client): Promise<number> {
    return await this.clients.add(client);
  }

  async removeClient(id: number): Promise<void> {
    await this.clients.delete(id);
  }

  async getClientById(id: number): Promise<Client | undefined> {
    return await this.clients.get(id)
  }

  async updateClient(client: Client): Promise<number> {
    return await this.clients.put(client);
  }

  // ============ FACTURES ============
  async getAllFactures(): Promise<Facture[]> {
    return await this.factures.toArray();
  }

  async addFacture(facture: Facture): Promise<number> {
    return await this.factures.add(facture);
  }

  async removeFacture(id: number): Promise<void> {
    await this.lignesFacture.where('factureId').equals(id).delete();
    await this.factures.delete(id);
  }

  async getFactureById(id: number): Promise<Facture | undefined> {
    return await this.factures.get(id);
  }

  async updateFacture(facture: Facture): Promise<number> {
    return await this.factures.put(facture);
  }

  async getFacturesByClient(clientId: number): Promise<Facture[]> {
    return await this.factures.where('clientId').equals(clientId).toArray();
  }

  // ============ LIGNES FACTURE ============
  async getLignesByFacture(factureId: number): Promise<LigneFacture[]> {
    return await this.lignesFacture.where('factureId').equals(factureId).toArray();
  }

  async addLigneFacture(ligne: LigneFacture): Promise<number> {
    return await this.lignesFacture.add(ligne);
  }

  async addLignesFacture(lignes: LigneFacture[]): Promise<number> {
    return await this.lignesFacture.bulkAdd(lignes);
  }

  async removeLigneFacture(id: number): Promise<void> {
    await this.lignesFacture.delete(id);
  }

  async updateLigneFacture(ligne: LigneFacture): Promise<number> {
    return await this.lignesFacture.put(ligne);
  }

  // Get facture with all its lignes (helper)
  async getFactureWithLignes(id: number): Promise<{ facture: Facture; lignes: LigneFacture[] } | undefined> {
    const facture = await this.getFactureById(id);
    if (!facture) return undefined;
    const lignes = await this.getLignesByFacture(id);
    return { facture, lignes };
  }
}
