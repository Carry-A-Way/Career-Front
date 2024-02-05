FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# 3000번 포트 노출
EXPOSE 3002

# npm start 스크립트 실행 : 추후 env 설정 필요
CMD ["npm", "start"]