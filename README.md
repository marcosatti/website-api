# Website (API)

https://www.marco.satti.id.au

Licence: GPLv3+

## Local Development

```
npm install
npm run watch
```

## Building

```
docker build -t website-api .
```

## Running

```
docker run -it --rm -p 32780:80 website-api
```

### Environment Variables Used

- NODE_ENV (default: "production")
- PORT (default: "80")
- DB_HOST
- DB_PORT
- DB_PASSWORD
- FRONTEND_URL
