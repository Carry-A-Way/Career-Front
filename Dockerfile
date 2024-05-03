# Node.js 이미지 사용
FROM node:22

# 작업 디렉토리 설정

# 패키지 파일 복사
COPY package.json ./
COPY package-lock.json ./

# 의존성 설치
RUN npm install

# 나머지 프로젝트 파일 복사
COPY . .

# 3002번 포트 노출
EXPOSE 3002

# 앱 실행 (환경 변수 설정 필요)
CMD ["npm", "run", "start:develop"]
