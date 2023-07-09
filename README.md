# Scissor_URL_Shortener_API Documentation

## Base URL FOR API

https://short-3u0c.onrender.com/

## Base URL FOR MERN APPLICATION

https://scissor-url-shortener-mern.onrender.com/

## Setup

- Install NodeJS, mongodb
- pull this repo
- update .env
- run `npm install`
- run `node index.js`

## Models

---

### User

| field    | data_type | constraints      |
| -------- | --------- | ---------------- |
| email    | string    | required, unique |
| password | string    | required         |

### Url

| field     | data_type | constraints |
| --------- | --------- | ----------- |
| longUrl   | string    | required    |
| shortUrl  | string    |             |
| urlCode   | string    |             |
| qrCode    | string    |             |
| ipAddress | Array     |             |
| clicks    | number    | default: 0  |
| creator   | string    |             |

### Register User

- Route: /register
- Method: POST
- Body: Using JSON format, enter the email and password

```
{
  "email": "jatuah@gmail.com",
  "password": "asdfgh12"
}

```

- Response

Success

````
{
  "message": "Registered",
  "token": "Random JWT Token that will be Generated"
}```

---

### Login User

- Route: /login
- Method: POST
- Body: Using JSON format, enter the email and password

````

{
"email": "jatuah@gmail.com",
"password": "asdfgh12"
}

```

- Responses

Success

```

{
"message": "Logged in",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWE5ZTE4OTdmNTJmYTU1ODJlZDNmMiIsImVtYWlsIjoiamF0dWFoQGdtYWlsLmNvbSIsImlhdCI6MTY4ODkwMzMwMiwiZXhwIjoxNjg4OTg5NzAyfQ.89wkiv9Hzdbn1779Fn48m2YN8J2Bvr902eP_MbkXT6A"
}
