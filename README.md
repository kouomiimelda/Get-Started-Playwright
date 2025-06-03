# 🧪 Projet d'Automatisation des Tests avec Playwright

## 📌 Description

Ce projet a pour objectif d'automatiser les tests fonctionnels du site [http://test.icam-afrique.com/](http://test.icam-afrique.com/) en utilisant le framework **[Playwright](https://playwright.dev/)**.  
Les tests couvrent principalement les fonctionnalités **d'inscription** et de **connexion**, en explorant différents cas de figure (connexion valide, invalide, utilisateur inexistant, etc.).

## 🔧 Fonctionnalités et Technologies Utilisées

- 🧱 **Page Object Model (POM)** pour une structure de code claire et maintenable  
- 🧪 **Playwright Test Runner** pour l'exécution des tests  
- 🧷 **Fixtures personnalisées** pour la réutilisabilité et la configuration avancée  
- 🧵 **Parallélisme** pour une exécution rapide  
- 🍰 **Cucumber (Gherkin)** pour la rédaction des scénarios en langage naturel (BDD)  
- 📊 **Allure Report** pour des rapports détaillés et interactifs  
- 🖥️ **Commandes CLI personnalisées** pour faciliter l'exécution des tests


## ▶️ Lancer les Tests

### 📥 Installation

```bash
git clone https://github.com/ton-nom-utilisateur/nom-du-repo.git
cd nom-du-repo
npm install
```
### 📥 Exécuter tous les tests
```bash
npx playwright test
```
### 📥Exécuter un test spécifique avec Cucumber
```bash
npx cucumber-js tests/features/connexion.feature
```
### 📥 Générer un rapport Allure
```bash
npx allure generate reports/allure-results --clean -o reports/allure-report
npx allure open reports/allure-report
```

## ✅ Cas de Tests Couvert

### 🔐 Connexion avec identifiants valides

**Préconditions :**  
- L’utilisateur dispose déjà d’un compte valide sur le site.

**Étapes :**  
1. Accéder à la page de connexion.  
2. Saisir une adresse email valide.  
3. Saisir un mot de passe valide.  
4. Cliquer sur le bouton de connexion.  

**Résultat attendu :**  
- L’utilisateur est redirigé vers son tableau de bord ou une page d’accueil authentifiée.

---

### ❌ Connexion avec mot de passe incorrect

**Préconditions :**  
- L’adresse email saisie est correcte.  
- Le mot de passe est incorrect.

**Étapes :**  
1. Accéder à la page de connexion.  
2. Saisir une adresse email valide.  
3. Saisir un mot de passe incorrect.  
4. Cliquer sur le bouton de connexion.  

**Résultat attendu :**  
- Un message d’erreur indiquant que les identifiants sont invalides s’affiche.  
- L’utilisateur reste sur la page de connexion.

---

### ❌ Connexion avec email inexistant

**Préconditions :**  
- L’adresse email saisie n’est pas enregistrée dans le système.

**Étapes :**  
1. Accéder à la page de connexion.  
2. Saisir une adresse email inexistante.  
3. Saisir un mot de passe quelconque.  
4. Cliquer sur le bouton de connexion.  

**Résultat attendu :**  
- Un message d’erreur s’affiche : *Utilisateur introuvable* ou équivalent.  
- L’utilisateur reste sur la page de connexion.

---

### ❌ Connexion avec champs vides

**Étapes :**  
1. Accéder à la page de connexion.  
2. Laisser les champs email et/ou mot de passe vides.  
3. Cliquer sur le bouton de connexion.  

**Résultat attendu :**  
- Un message d’erreur s’affiche pour indiquer que les champs sont obligatoires.  
- Aucun appel réseau n’est effectué si possible.

---

### ✅ Inscription avec informations valides

**Étapes :**  
1. Accéder à la page d'inscription.  
2. Remplir tous les champs requis avec des informations valides.  
3. Soumettre le formulaire.

**Résultat attendu :**  
- L’utilisateur est redirigé vers une page de confirmation ou connecté automatiquement.  
- Un message de succès est affiché.














