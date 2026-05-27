FROM node:20-alpine
WORKDIR /app

# Fix SSL certificate issue for corporate networks
RUN npm config set strict-ssl false

COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies including @types/cors
RUN npm install --legacy-peer-deps
RUN npm install --save-dev @types/cors --legacy-peer-deps

COPY src/ ./src/
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/app.js"]
