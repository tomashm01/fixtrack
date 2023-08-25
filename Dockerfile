# Usar una imagen base de Node.js
FROM node:18.15-alpine as base

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY ./package.json ./package-lock.json ./
COPY ./tsconfig.base.json /app/tsconfig.base.json
COPY libs /app/libs


# Instalar las dependencias
RUN --mount=type=cache,target=/root/.npm --mount=type=cache,target=/root/.cache npm ci

# ===============================
# Crear una etapa para la API de Fixtrack

FROM base as fixtrack

COPY ./apps/fixtrack /app/apps/fixtrack

EXPOSE 3333

CMD ["npx", "nx", "serve", "fixtrack"]
