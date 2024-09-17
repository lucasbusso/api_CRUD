**\_ Primero, levantar la DB
noSQL: revisar el estado del servicio del cluster en cloud.mongodb.com
Probablemente Atlas te pida que agregues la IP a la whitelist para poder establecer la conexión
SQL: con Laragon, simplemente levantar la DB y crear las tablas manualmente (TODO: desarrollar migración programática)
**_ Luego levantar servidor back
_** Por ultimo ya se puede levantar el front
**_ Usuarios registrados en la tabla "users" de mongo / mysql
_\*\* Abrir colección Postman para ir revisando qué data hay
