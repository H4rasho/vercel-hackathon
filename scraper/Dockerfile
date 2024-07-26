
# Usa una imagen base de Node.js
FROM node:20-bookworm

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación, incluyendo Playwright
RUN npm install

# Instala los navegadores y las dependencias del sistema para Playwright
RUN npx -y playwright@1.45.1 install --with-deps

RUN npx -y playwright install --with-deps chromium

# Copia el resto de los archivos de la aplicación
COPY . .

# Crea un usuario no root para ejecutar el navegador de manera más segura
RUN adduser --disabled-password --gecos '' pwuser && \
    mkdir -p /home/pwuser && \
    chown -R pwuser:pwuser /home/pwuser && \
    chown -R pwuser:pwuser /usr/src/app

# Cambia al usuario no root
USER pwuser

# Expone el puerto que utiliza la aplicación (ajusta según sea necesario)
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
