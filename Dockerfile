
FROM node:22-slim

RUN apt-get update && apt-get install -y \
    libgtk-3-0 libnss3 libxss1 libasound2 \
    libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxi6 libxtst6 libxrandr2 libgbm1 libxshmfence1 \
    libxkbcommon0 libegl1 libwayland-egl1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ARG UID=1000
# ARG GID=1000
# RUN chown -R ${UID}:${GID} /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV NODE_ENV=production
ENTRYPOINT ["/entrypoint.sh"]
