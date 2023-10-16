# Authorization

## 1. Sign up

```http
POST http://localhost:8000/sign_up
```

### JSON body

```json
{
    "firstname": "string (len -> 3-20)",
    "lastname": "string (len -> 3-20)",
    "email": "string",
    "password": "string (len -> 6-16)"
}
```

## 2. Sign in

```http
POST http://localhost:8000/sign_in
```

### JSON body

```json
{
    "email": "string",
    "password": "string"
}
```

## 3. Refresh token

```http
GET http://localhost:8000/refresh_token
```

### refresh_token must be in the header of request
