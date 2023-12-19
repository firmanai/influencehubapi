# Gunakan image Node.js versi 14
FROM node:14

# Set working directory di dalam container
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode aplikasi ke dalam container
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 8080

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]