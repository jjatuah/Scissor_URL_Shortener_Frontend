# Scissor_URL_Shortener_API Documentation

## Base URL FOR API

https://short-3u0c.onrender.com/

## Base URL FOR MERN APPLICATION

https://scissor-url-shortener-mern.onrender.com/

## Setup

- Install NodeJS, mongodb, Redis
- pull this repo
- update .env
- run `npm install`
- run `node index.js`

## Models

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

---

## Register User

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

```
{
  "message": "Registered",
  "token": "Random JWT Token that will be Generated"
}

```

---

## Login User

- Route: /login
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

```

{
  "message": "Logged in",
  "token": "Random JWT Token that will be Generated"
}

```

---

## Creating, Getting and Deleting Short Url's

### Creating A Short URL

- Route: /
- Method: POST
- Header
  - Authorization : Random JWT Token that was Generated at Login/Registration
- Imputing a custimizable URL code is not compulsory. If you dont enter one yourself, a random one will be generated for you
- Body:

```

{
  "longUrl": "https://www.hotnigerianjobs.com/hotjobs/533600/fullstack-developer-at-cytric.html",

  "urlCode" : "job"
}

```

- Response

Success

```

{
  "longUrl": "https://www.hotnigerianjobs.com/hotjobs/533600/fullstack-developer-at-cytric.html",
  "shortUrl": "https://short-3u0c.onrender.com/job",
  "urlCode": "job",
  "qrCode": "data:image/png;base64,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",
  "ipAddress": [],
  "clicks": 0,
  "creator": "jatuah@gmail.com",
  "date": "Sun Jul 09 2023 11:58:28 GMT+0000 (Coordinated Universal Time)",
  "\_id": "64aaa0e497f52fa5582ed3fd",
  "\_\_v": 0
}

```

---

### Getting All Short URL's In The Database or Redis Cache

- Route: /
- Method: GET
- Header

  - Authorization : Random JWT Token that was Generated at Login/Registration

- **_Body: No data is required to be sent in the request body_**

```

```

- Response

Success<br>
You will get an array of all the short URL's you've created using that account

```

[
  {
    "\_id": "64aaa0e497f52fa5582ed3fd",
    "longUrl": "https://www.hotnigerianjobs.com/hotjobs/533600/fullstack-developer-at-cytric.html",
    "shortUrl": "https://short-3u0c.onrender.com/job",
    "urlCode": "job",
    "qrCode": "data:image/png;base64,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",
    "ipAddress": [],
    "clicks": 0,
    "creator": "jvvc@gg.com",
    "date": "Sun Jul 09 2023 11:58:28 GMT+0000 (Coordinated Universal Time)",
    "\_\_v": 0
  }
]

```

### Deleting A Short URL You created

- Route: /:Id
- Method: DELETE
- Header

  - Authorization : Random JWT Token that was Generated at Login/Registration

- **_Body: No data is required to be sent in the request body_**

```

```

- Response

Success<br>
You will get the response below

```


"URL successfully deleted..."


```

---

## Using A Short URL You created

- Route: /urlCode
- Method: GET
- _**You don't need to be Authenticated to use this endpoint. Anyone can use it**_.

- _**Body: No data is required to be sent in the request body**_

```

```

- Response

Success<br>

```
You will be redirected to the website of the long URL you shortened earlier by the browser

```
