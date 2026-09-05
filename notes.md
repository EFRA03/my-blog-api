# Documentación rápida del proyecto

## Endpoints

<http://localhost:3000>

### Inicio

- GET `/`
- Respuesta: mensaje de prueba "Hello World"

### Usuarios

- GET `/users` → obtener todos los usuarios
  <http://localhost:3000/users>
- GET `/users/:id` → obtener un usuario por ID
  <http://localhost:3000/users/1>
- POST `/users` → crear un nuevo usuario
- PATCH `/users/:id` → actualizar un usuario
- DELETE `/users/:id` → eliminar un usuario

## Ejemplos

### Obtener todos los usuarios

```http
GET http://localhost:3000/users
```

### Crear usuario

```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Ana Gómez",
  "email": "ana@example.com"
}
```

### Actualizar usuario

```http
PATCH http://localhost:3000/users/1
Content-Type: application/json

{
  "name": "Ana Gómez actualizada"
}
```

## Notas

- El proyecto usa NestJS.
- El controlador principal está en `/users`.
- Los endpoints pueden probarse con Postman, Insomnia o curl.
- La API se ejecuta normalmente en el puerto 3000.
