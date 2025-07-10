# Étape 1 : construire l'image
FROM node:20

# Crée un dossier pour l’app
WORKDIR /app

# Copie les fichiers
COPY package*.json ./
RUN npm install

COPY . .

# Démarre l'app
CMD ["npm", "start"]
