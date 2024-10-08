# Interfaz de evaluación de imágenes generadas

## Development

```bash
nvm use 16
npm install
npx vite
```

## Deploy en niebla

Primero, hacer el build:

```bash
npx vite build --base=/generative_eval/
```

Luego, mover archivos estaticos a /var/www/html/generative_eval/.

```bash
# Create folder if it does not exists.
sudo mkdir /var/www/html/generative_eval
sudo cp -r dist/* /var/www/html/generative_eval
```

Finalmente, configurar la ruta a la app en niebla. Usando apache:

```
Alias /generative_eval "/var/www/html/generative_eval/"
```

Reiniciar apache.

```
service httpd restart
```

Ahora la app debiese poder accederse desde https://niebla.ing.puc.cl/generative_eval

## Variables de entorno
