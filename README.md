# WISHLIST API
#### Manager your products wishlist from eccomerce

##### Allows create, update, remove an account, search and favorite your products in your own wishlist

### Tecnologies
- Typescript (main language)
- Node JS (main js enviroment)
- Postgres SQL (main sql database)
- Redis cache (caching)
- Jest framework (main tests (integration, unities))
- Express, Axios (http server)
- JWT (authentication)

### How to install with Docker?
```
# Clone the repository
git clone https://github.com/pedroprata44/WishlistAPI.git

#Install the dependencies
yarn install

#Init compose-file
docker-compose -f docker-compose.yml up -d
```

## How to up application in localhost

##### 1. Rename file ".env.example" to  ".env"
##### 2. Set valus in enviroment in ".env"

##### 3. Run sql script create file "create.sql" in your postgres admin to set db


##### 4. Init Products Endpoint

```
npx nodemon products/endpoint.ts
```

##### 5. Init Wishlist Api
```
npx nodemon src/main.ts
```
######

### Generate Token to acess routes
##### Every route needs a Bearer Token to use 
```
# Example
curl  --location --request POST 'http://localhost:3000/createclient' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "name name",
    "email": "name@test"
}'
# Expected Status Code 200 and token in Response
```
###### Now you can use application send a bearer token in every Request
```
# Example
curl --location --request GET 'http://localhost:3000/getclient/1' \
--header 'Authorization: Bearer #YourTokenHere'

# Expected status code 200 and product in .json
```

## How to run test cases?
#### After install all dependencies
> yarn install
#### Run docker-compose file
> docker-compose -f docker-compose.yml up -d
#### Up Endpoints
> npx nodemon products/endpoint.ts

> npx nodemon src/main.ts

#### Run tests
> npx jest

## Owner
Pedro Alves Prata Neto

[github.com/pedroprata44](http://github.com/pedroprata44)