# cirtuo-task

## Description

- I am using Vue as my main framework
- I am using PrimeVue component library as alternative to PrimeNG
- I am using pinia for my global state management
- There is also debuger setup and prettier setup for this project
- I have installed json-server and json-server-auth to fake server and its authentication, everything is in db.json and routes.json files
- I did really simple validation for login and register did not want to overcomplicate things

### Users

```
ADMIN - can only be added from backend cannot be registered from frontend
email: admin@test.com
password: password

Regular user
email: test@test.com
password: password
```

- As I used json-server-auth my role system is based on that package capabilities (it simulates those options)
    - user with email admin@gmail.com can only change book information
    - as jwt has userId that userId is connected to operations which he can do on books

Usually I would create httpOnly cookie with token and some expire time on server and use that cookie to check if user is logged in etc.. Right now as I am using basic json-server auth it is not storing token in a cookie

## How to run

To run application

```
npm run dev
```

To run server

```
npm run start
```

