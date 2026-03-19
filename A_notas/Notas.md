para llamar
[GET] http://localhost:3000/

Hello World (Por defecto)

[GET] http://localhost:3000/users > Retorna todos los usuarios (200)

[GET] http://localhost:3000/users/1 > Retorna usuario con id 1 (200) [GET] http://localhost:3000/users/2 > Retorna usuario con id 2 (200) [GET] http://localhost:3000/users/34234asdasd > Return user with id 34234asdasd (200)

para crear
[POST] http://localhost:3000/users > Return the user created (201)
para eliminar
[DELETE] http://localhost:3000/users/:id > Return status user deleted (200)

[PUT] http://localhost:3000/users/:id > Return the user updated (200)
