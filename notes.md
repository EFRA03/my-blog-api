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

## Decoradores

Los decoradores en NestJS se usan para definir rutas, parámetros, validaciones y dependencias dentro de controladores, servicios y módulos.

### Decoradores de controladores

- `@Controller('users')` → marca una clase como controlador y define su prefijo de ruta.
- `@Get()` → define un endpoint GET.
- `@Post()` → define un endpoint POST.
- `@Put()` → define un endpoint PUT.
- `@Patch()` → define un endpoint PATCH.
- `@Delete()` → define un endpoint DELETE.
- `@All()` → define un endpoint para cualquier método HTTP.

### Decoradores de rutas y parámetros

- `@Req()` → obtiene el objeto request completo.
- `@Res()` → obtiene el objeto response completo.
- `@Next()` → obtiene el middleware next.
- `@Param(param?: string)` → obtiene un parámetro de la URL.
- `@Body()` → obtiene el cuerpo de la petición.
- `@Query(param?: string)` → obtiene parámetros de query string.
- `@Headers(name?: string)` → obtiene headers.
- `@Ip()` → obtiene la IP del cliente.
- `@HostParam()` → obtiene el parámetro de host.
- `@Session()` → obtiene la sesión del usuario.
- `@UploadedFile()` → obtiene un archivo subido.
- `@UploadedFiles()` → obtiene varios archivos subidos.
- `@Request()` → alias de `@Req()`.
- `@Response()` → alias de `@Res()`.

### Decoradores de validación y DTO

- `@UsePipes()` → aplica validadores o transformaciones.
- `@UseGuards()` → aplica guards de autenticación/autorización.
- `@UseInterceptors()` → aplica interceptores.
- `@UseFilters()` → aplica filtros de excepciones.

### Decoradores de módulos y providers

- `@Module({ ... })` → define un módulo de NestJS.
- `@Injectable()` → marca una clase como servicio y permite inyección de dependencias.
- `@Inject()` → inyecta una dependencia concreta.
- `@Optional()` → marca una dependencia como opcional.
- `@Injectable()` + `@Optional()` → suelen usarse en servicios y providers.

### Decoradores de inyección

- `@Injectable()` → define clases que pueden ser inyectadas.
- `@Inject(token)` → usa un token específico.
- `@Optional()` → marca dependencias opcionales.

### Decoradores útiles en este proyecto

En este caso se usan principalmente:

- `@Controller('users')`
- `@Get()`
- `@Post()`
- `@Patch()`
- `@Delete()`
- `@Param()`
- `@Body()`

Ejemplo:

```ts
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'Todos los usuarios';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Usuario ${id}`;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }
}
```

### Resumen rápido

Los decoradores de NestJS sirven para decirle al framework:

- qué ruta responde el método
- qué datos vienen por la URL, cuerpo o headers
- qué clases se comportan como controlador, servicio o módulo
- qué validaciones, guards e interceptores se aplican

## DTOs

Los DTOs (Data Transfer Objects) son objetos que definen la estructura de los datos que entran o salen de la API. Se usan para tipar la información, validar campos y evitar que el backend reciba datos inconsistentes.

### ¿Para qué sirven?

- definir la forma de un cuerpo de petición
- validar campos obligatorios
- controlar tipos de datos
- mantener el código más limpio y organizado
- separar la estructura de la entidad de la estructura de la petición

### Diferencia entre entidad y DTO

- `Entity`: representa la estructura real de un dato en la base de datos o dominio.
- `DTO`: representa la estructura de entrada/salida que usa la API.

Ejemplo:

- `User` puede tener campos como id, name, email, createdAt.
- `CreateUserDto` puede requerir solo `name` y `email` al crear un usuario.

### DTO en este proyecto

En la carpeta `src/users/dto` existen dos archivos importantes:

- `create-user.dto.ts`
- `update-user.dto.ts`

Estos DTOs definen qué propiedades recibe la API al crear o actualizar un usuario.

### Ejemplo de DTO

```ts
export class CreateUserDto {
  name: string;
  email: string;
}
```

Esto significa que, al hacer una petición POST, el cliente debe enviar un JSON con este formato:

```json
{
  "name": "Ana Gómez",
  "email": "ana@example.com"
}
```

### Ejemplo de actualización

```ts
export class UpdateUserDto {
  name?: string;
  email?: string;
}
```

Aquí los campos son opcionales, porque al actualizar un recurso normalmente no se envían todos los datos.

### Uso en el controlador

```ts
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

El decorador `@Body()` toma el cuerpo de la petición y lo convierte en un objeto del tipo `CreateUserDto`.

### Ventajas de usar DTOs

- mejor validación
- código más legible
- menos errores por datos mal formados
- mejor organización del proyecto
- facilita el uso de validadores `class-validator`

### Instalación para validación

Si quieres usar DTOs con validaciones reales en NestJS, instala estas dependencias:

```bash
pnpm add class-validator class-transformer
```

Estas dos librerías permiten:

- validar campos obligatorios
- validar tipos
- transformar datos de entrada
- trabajar mejor con `@Body()` y DTOs

### Resumen

Un DTO es una "plantilla" para los datos que llegan a la API. En NestJS se usa junto con `@Body()` para definir exactamente qué estructura debe recibir cada endpoint.
