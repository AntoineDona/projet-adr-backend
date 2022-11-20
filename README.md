# Projet AdR Backend


## Sommaire

* [Présentation](#présentation)
* [Installation](#installation)
* [Déploiement](#déploiement)

## Présentation

Le backend est contruit avec [ExpressJS](https://expressjs.com/fr/) qui est un framework de [NodeJS](https://nodejs.org/fr/), un runtime en `JavaScript`. La base de données est en [NoSQL](https://fr.wikipedia.org/wiki/NoSQL) et est gérée par [MongoDB](https://www.mongodb.com/fr-fr). On utilise la bibliothèque [Mongoose](https://mongoosejs.com/) pour connecter la bdd avec l'API.

## Installation

Setup pour développer le backend en local
* faire un `git pull` dans le dossier du `backend`
* (installer nodejs)
* faire un `npm install` pour installer les packages du package.json
* créer un fichier `.env` à partir du `.env.example` : remplacer les valeur d'environnement de dev correspondantes
* faire un `npm start` pour lancer un serveur de développement avec `nodemon` qui écoute sur `localhost:8080` et se refresh à chaque changement
* Prier pour que ça marche (normalemennt c'est ok)

## Déploiement

Déployer le backend sur le serveur de l'AdR
* faire `cd /var/www/projet-adr/backend` pour se placer dans le bon dossier
* faire un `sudo git pull` (sudo nécessaire sinon pas les droits)
* faire un `sudo npm install` si jamais le `package.json` a été modifié
* faire un `sudo pm2 restart projet-adr` pour restart le serveur et ainsi prendre en compte les modifications

Si `pm2` n'a aucun process en cours (vérifier avec `sudo pm2 list`), il faut démarer à la main et faire un `sudo pm2 start index.js --name "projet-adr"`
