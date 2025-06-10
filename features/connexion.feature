Feature: Connexion à l'application
Background:
    Given l'utilisateur accède à la page d'accueil de l'application
    And il clique sur le bouton "Connexion"
    And il est redirigé vers la page de connexion

Scenario: L'utilisateur se connecte avec succès 
    When il remplit le champ email avec "sadjojunior@gmail.com" 
    And il remplit le champ mot de passe avec "pass" 
    And il clique sur le bouton de connexion "Connectez-vous" 
    Then il voit le message "Trouvez les ressources dont vous avez besoin pour mieux vous préparer au concours"
@tag1
Scenario:  L'utilisateur laisse les champs vides
    When il laisse le champ "email" vide ""
    And il laisse le champ "mot de passe" vide ""
    Then il voit le message d'erreur "Email is required and must be valid."
    And il voit le message d'erreur "Password is required."
    And le bouton de connexion est désactivé
   