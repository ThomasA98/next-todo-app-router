# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```

2. install node_modules
```
pnpm i
```

3. crear un .env en base a .env.template y llenar las variables de entorno

4. Prisma commands
```
pnpm prisma init

pnpm prisma migrate <migration name>

pnpm prisma generate
```

5. dev server
```
pnpm dev
```

6. llenar base de datos local de dasarrollo: Peticion GET a /api/seed