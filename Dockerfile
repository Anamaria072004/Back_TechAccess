# ---------- Base ----------
FROM node:20-alpine AS base
WORKDIR /app

# Copiar archivos de dependencias (especifica explicitamente)
COPY package.json package-lock.json ./

# Instalar TODAS las dependencias (incluyendo dev)
RUN npm install

# ---------- Build ----------
FROM base AS build
WORKDIR /app

# Copiar todo el código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# ---------- Production Image ----------
FROM node:20-alpine AS production
WORKDIR /app

# Copiar solo package.json para producción
COPY package.json package-lock.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev

# Copiar el build compilado desde la etapa anterior
COPY --from=build /app/dist ./dist

# Copiar migraciones si están en src/migrations
COPY --from=build /app/src/migrations ./dist/migrations/

# Instalar ts-node globalmente (necesario para migraciones)
RUN npm install -g ts-node

# Exponer el puerto
EXPOSE 3000

# Ejecutar migraciones y luego iniciar la aplicación
CMD ["sh", "-c", "npx typeorm-ts-node-commonjs migration:run -d dist/data-source.js && node dist/main.js"]