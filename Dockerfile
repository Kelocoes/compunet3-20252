# Usamos la imagen oficial de Node.js como base
FROM node:22
# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app
# Copiamos los archivos de nuestro proyecto al contenedor
COPY package*.json ./
# Instalamos las dependencias del proyecto
RUN npm install
# Copiamos el resto de los archivos del proyecto al contenedor
COPY . .
# Exponemos el puerto en el que nuestra aplicación escuchará
EXPOSE 3000
# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]