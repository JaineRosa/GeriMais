# 1. ESTÁGIO DE BUILD (Fica igual)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=./dist/out --configuration=production

# 2. ESTÁGIO DE SERVE (Onde a mágica acontece)
FROM nginx:stable-alpine

# Limpa a pasta padrão
RUN rm -rf /usr/share/nginx/html/*

# CORREÇÃO AQUI:
# Adicionamos '/browser' ao caminho de origem.
# Isso pega os arquivos de DENTRO de 'dist/out/browser' e joga na RAIZ do servidor.
COPY --from=builder /app/dist/out/browser /usr/share/nginx/html

# Copia a conf do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]