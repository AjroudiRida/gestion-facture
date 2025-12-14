export interface LigneFacture {
    id?: number;
    factureId: number;      // ← Links to Facture
    produitId: number;
    designation: string;
    quantite: number;
    prixUnitaire: number;
    montant: number;
}