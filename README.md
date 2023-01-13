# Requirements
This application require redis-server running on localhost:6379 (can be configured)

## Valid UUID Tokens
- B1q2hUEKmeVp9zWepx9cnp
- PXmRJVrtzFAHsxjs7voD5R

## .env options
- RATE_LIMIT_IP=100
- RATE_LIMIT_TOKEN=200
- RATE_LIMIT_SECONDS=60000
- REDIS_PORT=6379
- REDIS_HOST=127.0.0.1
- VALID_UUID_TOKENS=['B1q2hUEKmeVp9zWepx9cnp', 'PXmRJVrtzFAHsxjs7voD5R']

## Private URL`s (bearer token)
http://localhost:3000/hello (1 point)

## Public URL`s
- http://localhost:3000/public/hello (1 point)
- http://localhost:3000/public/hello/2 (2 points)
- http://localhost:3000/public/hello/3 (5 points)

## Installation

```bash
$ npm install
```
## Test are not covered yet!

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

