# 軽量な Node.js イメージを使用
FROM node:20-slim

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# 依存関係をインストール
COPY package*.json ./
RUN npm install --omit=dev

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションを実行
CMD ["node", "index.js"]