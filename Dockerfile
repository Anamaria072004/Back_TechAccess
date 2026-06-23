# ---------- Base ----------
FROM node:20-alpine AS base
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar TODAS las dependencias
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

# Copiar el build compilado
COPY --from=build /app/dist ./dist

# Exponer el puerto
EXPOSE 3000

# Iniciar la aplicación (SIN migraciones)
CMD ["node", "dist/main.js"]