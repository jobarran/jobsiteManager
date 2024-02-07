

# Description


## Run in Dev

1. Clone repo
2. Copy ```.env.template``` and rename it to ```.env```
3. Install dependencies ```npm install```
4. Create DB ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecturar seed ```npm run seed``` 
7. Run in dev ```npm run dev```


## Run in prod