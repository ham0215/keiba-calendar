# 軽量な Node.js イメージを使用
FROM node:16-slim

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# 依存関係をインストール
COPY package*.json ./
RUN npm install --only=production

# アプリケーションのソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 8080

# アプリケーションを実行
CMD ["node", "index.js"]