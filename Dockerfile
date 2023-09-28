# Usar una imagen base de Node.js
FROM node:18.15-alpine as base

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY . /app

# Instalar las dependencias
RUN npm i 
# ===============================
# Crear una etapa para la API de Fixtrack

EXPOSE 3333

CMD ["npm", "run", "serve"]

