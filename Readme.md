# **Plataforma de eventos online**


https://documenter.getpostman.com/view/12238703/TVmS6aHM#3396a9b6-5b49-40a6-b362-26c2bcaa3fec




## 1. Servicios de Autenticación

### **POST** *Auth: Login*

`https://motricidad-event.herokuapp.com/api/auth`

BODY---> raw

```
{
    "email": "invitado1@gmail.com",
    "password":"invitado1"
}
```


### **GET** *Auth: Renovar Token*

`https://motricidad-event.herokuapp.com/api/auth/renew`

Requerimientos: 
- Enviar {token: 'token valido'} en el header 

HEADERS
```
'token': 'token válido'
```

BODY---> raw

```
{
    "email": "invitado1@gmail.com",
    "password":"invitado1"
}
```


## 2. Servicios de Usuarios

### **POST** *Usuario: Crear Usuario*

`https://motricidad-event.herokuapp.com/api/users/register`

Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin
- Contraseña mayor igual a 6 carácteres
- Tipos de roles: *USER_ROLE*, *ADMIN_ROLE*


HEADERS
```
'token': 'token válido'
```

BODY---> *formData*

```
|    Campo      |        Valor       |
|---------------|--------------------|
|    archive    |     Una imagen     |
|     name      |     Patry Jordan   |
|   userName    |      Patry8908     |
|     email     |   Patry@gmail.com  |
|    password   |       *******      |
|     role      |      USER_ROLE     |
```


### **GET** *Usuario: Listar Usuarios*

`https://motricidad-event.herokuapp.com/api/users/userlist`

Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'

```

### **GET** *Usuario: Mostrar Imagen de Usuario*

`https://motricidad-event.herokuapp.com/api/picture/usuarios/:imgName?token=un_token_valido`

Requerimientos: 
- Enviar un token valido como query en la url



### **PUT** *Usuario: Editar Usuario*

`https://motricidad-event.herokuapp.com/api/users/:idUsuario`


Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```

BODY---> *formData*

```
|    Campo      |        Valor       |
|---------------|--------------------|
|    archive    |     Una imagen     |
|     name      |     Patry Jordan   |
|   userName    |      Patry8908     |
|     email     |   Patry@gmail.com  |
|     role      |      USER_ROLE     |
```


### **DEL** *Usuario: Eliminar Usuario*

`https://motricidad-event.herokuapp.com/api/users/:idUsuario`

Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```


## 3. Servicios de Usuarios

### **POST** *Ponente: Crear Ponente*

`https://motricidad-event.herokuapp.com/api/speaker/create`

Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```


BODY---> raw

```
{  
    "name": "Armando Pérez Mesa",
    "title": "Dr. en Ciencias Sociales",
    "country": "Panamá",
    "topic": "El Deporte postCovid-19",
    "whatsApp": "+50769226743",
    "usuario":{
        "uid": "5fbbe4b6b028fb2c3ca5a49f"
    }
}
```

### **GET** *Ponente: Listar Ponentes*

`https://motricidad-event.herokuapp.com/api/speaker/`

Requerimientos: 
- Enviar un token valido en el header 

HEADERS
```
'token': 'token válido'
```


### **PUT** *Ponente: Editar Ponente*

`https://motricidad-event.herokuapp.com/api/speaker/:idPonente`

Editar Canal

Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

BODY---> raw

```
{  
    "name": "Armando Pérez Mendosa",
    "title": "Dr. en Cultura Física",
    "country": "Panamá",
    "topic": "El Deporte postCovid-19, resultados y experiencias",
    "whatsApp": "+50769226897",
}
```


### **DEL** *Ponente: Borrar Ponente*

`https://motricidad-event.herokuapp.com/api/speaker/:idPonente`


Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```



## 4. Servicios de Salas de Conferencia

### **POST** *Sala: Crear Sala*

`https://motricidad-event.herokuapp.com/api/channels/create`


Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```

BODY---> raw

```
{  
    "title":"conferencia de platzi",
    "streamSrc":"https://www.youtube.com/watch?v=YbKhyMbKSrQ",
    "description": "Una pequeña descripción",
    "speakers": 
    ["5fb01f897350dc4250960a58","5fb01f987350dc4250960a5a"]
}
```


### **GET** *Sala: Listar Salas*

`https://motricidad-event.herokuapp.com/api/channels/`


Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```


### **DEL** *Sala: Borrar Sala*

`https://motricidad-event.herokuapp.com/api/channels/:idSala`

Borrar Canal

Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```


### **PUT** *Sala: Editar Sala*

`https://motricidad-event.herokuapp.com/api/channels/:idSala`


Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```

BODY---> raw

```
{
    "title":"Conferencia de platzi",
    "streamSrc":"https://www.youtube.com/watch?v=YbKhyMbKSrQ",
    "description": "Una descripción de avance de las Ponencias",
    "speakers": 
    [
        {
           "name": "Armando Casas",
           "title": "Constructor",
           "country": "Cuba",
           "topic": "Mi casita y yo"
        },
        {
           "name": "Armando Paredes",
           "title": "Albañil",
           "country": "Cuba",
           "topic": "Mi casita la refino yo"
        }

    ]
}
```


## 5. Servicios de Galería de Posters

### **POST** *Poster: Crear Poster de Imagen*

`https://motricidad-event.herokuapp.com/api/poster/create/galeria/`

Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```

BODY---> *formData*

```
|           Campo           |                   Valor               |
|---------------------------|---------------------------------------|
|          archive          |               Una imagen              |
|           title           |               Poster No.1             |
|            alt            |            texto alternativo          |
|           info            |   Una pequeña descripción del poster  |
```


### **GET** *Poster: Listar Posters*


`https://motricidad-event.herokuapp.com/api/poster/list`

Requerimientos: 
- Enviar un token valido en el header 

HEADERS
```
'token': 'token válido'
```


### **GET** *Usuario: Mostrar Imagen del Poster*

`https://motricidad-event.herokuapp.com/api/picture/galeria/:imgName?token=un_token_valido`

Requerimientos: 
- Enviar un token valido como query en la url


### **DEL** *Poster: Borrar Poster*

`https://motricidad-event.herokuapp.com/api/poster/:idPoster`


Requerimientos: 
- Enviar un token valido en el header 
- Solo para usuarios con role Admin

HEADERS
```
'token': 'token válido'
```
















