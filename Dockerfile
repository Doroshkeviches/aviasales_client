# Используйте базовый образ Node.js
FROM node

# Установите рабочую директорию
WORKDIR /app/frontend

# Копируйте файл package.json и package-lock.json и установите зависимости
COPY package*.json ./
RUN npm install

# Копируйте все файлы клиентской части
COPY . .

# Соберите React-приложение
RUN npm run build

# Веб-сервер для клиентской части
EXPOSE 3000

# Команда для запуска клиентской части
CMD ["npm", "start"]