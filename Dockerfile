FROM node:22

WORKDIR /app

COPY package.json .

RUN npm install -g npm@10.7.0 env-cmd

COPY . .

# 3000번 포트 노출
EXPOSE 3002

# npm start 스크립트 실행 : 추후 env 설정 필요
CMD ["npm","run", "start:develop"]
