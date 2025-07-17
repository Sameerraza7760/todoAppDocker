FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# 2. Copy code and build
COPY . .

RUN npm run build

# 3. Run app
EXPOSE 3000
CMD ["npm","run","dev"]