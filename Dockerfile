# 軽量な Node.js イメージを使用
FROM node:16-slim

ARG _CHANNEL_ACCESS_TOKEN
ARG _CHANNEL_SECRET
ARG _GROUP_ID

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# 依存関係をインストール
COPY package*.json ./
RUN npm install --only=production

# アプリケーションのソースコードをコピー
COPY . .

# 環境変数を設定
ENV CHANNEL_ACCESS_TOKEN=$_CHANNEL_ACCESS_TOKEN
ENV CHANNEL_SECRET=$_CHANNEL_SECRET
ENV GROUP_ID=$_GROUP_ID

# ポートを公開
EXPOSE 8080

# アプリケーションを実行
CMD ["node", "index.js"]