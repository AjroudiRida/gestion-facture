import { Routes } from '@angular/router';
import { Produits } from './pages/produits/produits';
import { AjouterProduit } from './pages/ajouter-produit/ajouter-produit';
import { Main } from './pages/main/main';
import { DetailProduit } from './pages/detail-produit/detail-produit';
import { ModifierProduit } from './pages/modifier-produit/modifier-produit';
import { Clients } from './pages/clients/clients';
import { AjouterClient } from './pages/ajouter-client/ajouter-client';
import { DetailClient } from './pages/detail-client/detail-client';
import { ModifierClient } from './pages/modifier-client/modifier-client';
import { Factures } from './pages/factures/factures';
import { AjouterFacture } from './pages/ajouter-facture/ajouter-facture';
import { DetailFacture } from './pages/detail-facture/detail-facture';
import { ModifierFacture } from './pages/modifier-facture/modifier-facture';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: Main,
    },
    {
        path: 'produits',
        component: Produits,
    },
    {
        path: 'produits/add',
        component: AjouterProduit
    },
    {
        path: 'produits/:id',
        component: DetailProduit
    },
    {
        path: 'produits/:id/edit',
        component: ModifierProduit
    },
    {
        path: 'clients',
        component: Clients
    },
    {
        path: 'clients/add',
        component: AjouterClient
    },
    {
        path: 'clients/:id',
        component: DetailClient
    },
    {
        path: 'clients/:id/edit',
        component: ModifierClient
    },
    {
        path: 'factures',
        component: Factures
    },
    {
        path: 'factures/add',
        component: AjouterFacture
    },
    {
        path: 'factures/:id',
        component: DetailFacture
    },
    {
        path: 'factures/:id/edit',
        component: ModifierFacture
    }
];

