# Employees

## 1. Get all

```http
GET http://localhost:8000/employees
```

## 2. Get by id

```http
GET http://localhost:8000/employees/:id
```

## 3. Create

```http
POST http://localhost:8000/employees
```

### JSON body

```json
{
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "position": "string"
}
```

## 4. Update

```http
PUT http://localhost:8000/employees/:id
```

### JSON body

```json
{
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "position": "string"
}
```

## 5. Delete

```http
DELETE http://localhost:8000/employees/:id
```
