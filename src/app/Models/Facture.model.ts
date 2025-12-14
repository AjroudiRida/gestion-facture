export interface Facture {
    id?: number;
    numero: string;
    dateCreation: Date;
    dateEcheance?: Date;
    clientId: number;
    sousTotal: number;
    tva?: number;
    tauxTva?: number;
    total: number;
    statut: 'brouillon' | 'envoyee' | 'payee' | 'annulee';
}