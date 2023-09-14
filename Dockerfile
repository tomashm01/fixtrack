# Usar una imagen base de Node.js
FROM node:18.15-alpine as base

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY ./package.json ./package-lock.json ./

# Instalar las dependencias
RUN npm i 
# ===============================
# Crear una etapa para la API de Fixtrack

FROM base as fixtrack
COPY ./apps/fixtrack /app/apps/fixtrack

EXPOSE 3333

CMD ["npm", "run", "serve"]

