# Gestion de Factures

Application web de gestion de factures, produits et clients développée avec Angular.

## 🌐 Démo en ligne

👉 **[https://gestion-facture-six.vercel.app/](https://gestion-facture-six.vercel.app/)**

## ✨ Fonctionnalités

### Gestion des Produits
- Ajouter, modifier et supprimer des produits
- Afficher les détails d'un produit
- Liste des produits avec prix

### Gestion des Clients
- Ajouter, modifier et supprimer des clients
- Informations complètes (nom, email, téléphone, adresse)
- Liste des clients

### Gestion des Factures
- Créer de nouvelles factures
- Sélectionner un client et ajouter des produits
- Calcul automatique des totaux (sous-total, TVA, total TTC)
- Statuts de facture : Brouillon, Envoyée, Payée, Annulée
- Modifier et supprimer des factures
- Historique des factures

## 🛠️ Technologies utilisées

- **Frontend** : Angular 19
- **Base de données** : IndexedDB (Dexie.js)
- **Styling** : CSS (Google Material Design Style)
- **Déploiement** : Vercel

## 🚀 Installation locale

```bash
# Cloner le projet
git clone https://github.com/AjroudiRida/gestion-facture.git

# Accéder au dossier
cd gestion-facture

# Installer les dépendances
npm install

# Lancer l'application
ng serve
```

Ouvrez votre navigateur sur `http://localhost:4200`

## 📁 Structure du projet

```
src/app/
├── Models/           # Interfaces TypeScript
├── components/       # Composants réutilisables
├── pages/           # Pages de l'application
│   ├── factures/
│   ├── clients/
│   └── produits/
└── services/        # Services (DatabaseService)
```

## 👤 Auteur

**Rida Ajroudi**

---

⭐ N'hésitez pas à mettre une étoile si ce projet vous a été utile !
