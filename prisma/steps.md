# Genera las migraciones
Crea una nueva migración para reflejar los cambios en la base de datos ejecutando:

```bash
npx prisma migrate dev --name nombre_de_tu_migracion
```

# Verifica los cambios
Revisa que los cambios se hayan aplicado correctamente en tu base de datos local. Puedes usar el cliente de tu base de datos o Prisma Studio:

```bash
npx prisma studio
```

# Aplica la migración en la base de datos de producción
En tu entorno de producción (por ejemplo, Vercel), ejecuta el comando para aplicar la migración:

```bash
npx prisma migrate deploy
```