# FBShopBeta - Entorno de Desarrollo

Este proyecto utiliza **Laravel 11** (Backend), **React + Vite** (Frontend) y **PostgreSQL** como base de datos. Todo el entorno está contenerizado con Docker para facilitar el desarrollo en equipo.

## Requisitos Previos
- Tener instalado **Docker** y **Docker Compose** en tu computadora.
- No tener otros servicios ocupando los puertos `8000`, `5173` o `5432`.

## 🚀 Cómo levantar el proyecto por primera vez

Sigue estos pasos en orden para iniciar el proyecto en tu máquina local:

### 1. Construir y levantar los contenedores
Abre tu terminal en la raíz del proyecto (donde está el archivo `docker-compose.yml`) y ejecuta:
```bash
docker-compose up -d --build
```
*Nota: La primera vez tardará algunos minutos porque descargará las imágenes de PHP, Node y PostgreSQL.*

### 2. Ejecutar las Migraciones de la Base de Datos
Una vez que los contenedores estén corriendo (`done`), necesitamos crear las tablas en la base de datos de PostgreSQL. Ejecuta el siguiente comando para correr las migraciones dentro del contenedor del backend:
```bash
docker-compose exec backend php artisan migrate
```

### 3. ¡Listo! Accede a las aplicaciones
- **Frontend (React):** Abre en tu navegador [http://localhost:5173](http://localhost:5173)
- **Backend (Laravel API):** Abre en tu navegador [http://localhost:8000](http://localhost:8000)

---

## 🛠 Comandos Útiles para el Día a Día

### Apagar los contenedores
Para detener el proyecto al final del día sin borrar la base de datos:
```bash
docker-compose stop
```

### Volver a iniciar los contenedores
Al día siguiente, simplemente corre:
```bash
docker-compose up -d
```

### Apagar y destruir (¡Cuidado!)
Si necesitas reiniciar todo de fábrica (esto borrará los datos de tu base de datos local):
```bash
docker-compose down -v
```

### Ejecutar comandos de Artisan (Laravel)
Cualquier comando de Laravel debe ejecutarse **dentro** del contenedor `backend`. Siempre usa el prefijo `docker-compose exec backend`.
Ejemplos:
```bash
# Crear un nuevo controlador
docker-compose exec backend php artisan make:controller ProductController

# Limpiar caché
docker-compose exec backend php artisan cache:clear
```

### Instalar nuevos paquetes de NPM (React)
Cualquier comando de Node/NPM debe ejecutarse **dentro** del contenedor `frontend`:
```bash
docker-compose exec frontend npm install axios
```
