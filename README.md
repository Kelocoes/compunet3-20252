# Proyecto NestJS con TypeORM

Este proyecto utiliza NestJS con TypeORM y PostgreSQL para gestionar autores y posts.

## Estructura del Proyecto

```
src/
├── authors/              # Módulo de autores
│   ├── entities/
│   │   └── author.entity.ts
│   ├── authors.service.ts
│   └── authors.module.ts
├── posts/                # Módulo de posts
│   ├── entities/
│   │   └── post.entity.ts
│   ├── posts.service.ts
│   └── posts.module.ts
└── app.module.ts

db/
└── scripts/
    ├── script.sql        # Script SQL con datos de prueba
    └── insert.sh         # Script para insertar datos
```

## Entidades

### Author (Autor)

- `id`: ID único
- `firstName`: Nombre
- `lastName`: Apellido
- `email`: Correo electrónico (único)
- `bio`: Biografía
- `country`: País
- `birthDate`: Fecha de nacimiento
- `isActive`: Estado activo
- Relación: Un autor puede tener múltiples posts

### Post

- `id`: ID único
- `title`: Título del post
- `content`: Contenido
- `category`: Categoría
- `views`: Número de vistas
- `likes`: Número de likes
- `isPublished`: Estado de publicación
- `publishedDate`: Fecha de publicación
- `tags`: Etiquetas (array)
- `authorId`: ID del autor
- Relación: Cada post pertenece a un autor

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Copiar el archivo de configuración:

```bash
cp .env.example .env
```

3. Iniciar la base de datos con Docker:

```bash
docker-compose up -d
```

4. Insertar datos de prueba:

```bash
cd db/scripts
bash insert.sh
```

## Uso

### Iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

### Compilar el proyecto:

```bash
npm run build
```

### Ejecutar en producción:

```bash
npm run start:prod
```

## Servicios Disponibles

### AuthorsService

- `findAll()`: Obtener todos los autores
- `findOne(id)`: Obtener un autor por ID
- `findByEmail(email)`: Buscar autor por email
- `create(authorData)`: Crear un nuevo autor
- `update(id, authorData)`: Actualizar un autor
- `remove(id)`: Eliminar un autor
- `getActiveAuthors()`: Obtener autores activos
- `getAuthorsByCountry(country)`: Filtrar por país

### PostsService

- `findAll()`: Obtener todos los posts
- `findOne(id)`: Obtener un post por ID
- `findByAuthor(authorId)`: Posts de un autor
- `findByCategory(category)`: Filtrar por categoría
- `create(postData)`: Crear un nuevo post
- `update(id, postData)`: Actualizar un post
- `remove(id)`: Eliminar un post
- `getPublishedPosts()`: Obtener posts publicados
- `incrementViews(id)`: Incrementar vistas
- `incrementLikes(id)`: Incrementar likes
- `searchByTag(tag)`: Buscar por etiqueta

## Base de Datos

La base de datos PostgreSQL contiene:

- **50 autores** de diferentes países con biografías completas
- **50 posts** con diversos temas relacionados con tecnología

### Conectarse a la base de datos:

```bash
docker exec -it postgres-db psql -U postgres -d mydatabase
```


## Configuración

El archivo `.env` contiene las siguientes variables:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=mydatabase
NODE_ENV=development
PORT=3000
```

## Scripts de Base de Datos

### insert.sh

Script bash que:

1. Verifica que Docker esté corriendo
2. Verifica que el contenedor PostgreSQL esté activo
3. Copia el script SQL al contenedor
4. Ejecuta el script para insertar datos
5. Muestra estadísticas de registros insertados

**Uso:**

```bash
cd db/scripts
bash insert.sh
```

## Notas

- El proyecto usa TypeORM con sincronización automática en desarrollo
- Las relaciones entre entidades están configuradas con cascade delete
- Los timestamps (createdAt, updatedAt) se manejan automáticamente
- Las entidades incluyen validaciones y restricciones de base de datos
