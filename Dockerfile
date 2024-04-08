FROM node:18
WORKDIR /app
# 앱 의존성 설치
COPY package*.json ./


EXPOSE 3000

RUN npm install

# 앱 소스 복사
COPY . .
WORKDIR /app/src
CMD ["node", "app.js"]

