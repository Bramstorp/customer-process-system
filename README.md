# indholdsfortegnelse

- [Case](#case)
- [Teknologi beslutninger](#teknologi-beslutninger)
- [Localhost url](#localhost-url)
- [Opsæting](#opsæting)
- [CLI COMMANDS](#cli-commands)
- [Funktioner](#Funktioner)
- [Test](#test)

# Teknologi beslutninger:

- Clientside: React TS
- API / Backend: FastAPI python  
- Database: Sqlite3
- ASGI server UVICORN 
- Webserver nginx (Kun for prod)

# Localhost url

### DEV
Backend url: http://0.0.0.0:8000/ | http://localhost:8000/

Backend url docs/admin: http://0.0.0.0:8000/docs | http://localhost:8000/docs

Frontend url: http://0.0.0.0:3000/ | http://localhost:3000/

### PROD

Backend url: http://0.0.0.0:8080/ | http://localhost:8080/

Backend url docs/admin: http://0.0.0.0:8080/docs | http://localhost:8080/docs

Frontend url: http://0.0.0.0 | http://localhost

# Opsæting

### Opsætningskrav

1.  [Git](https://git-scm.com/downloads).
1.  [Node](https://nodejs.org/en/download/) _(version 12 or greater)_.
1.  [Yarn](https://yarnpkg.com/lang/en/docs/install/) _(version 1.5 or greater)_.
1.  [Docker](https://www.docker.com/products/docker-desktop)
1.  [Python](https://www.python.org/downloads/)
1.  [Pip](https://pip.pypa.io/en/stable/getting-started/)
1.  [Fastapi](https://fastapi.tiangolo.com/)

### Opstæning
alt køre i docker så får at starte projekte skal du være på server-side og køre docker commanden ```docker-compose up -d --build```.

hvis du vil køre prod og er unix skal du gå under  ```server-side/nginx/Dockerfile.prod ``` og ændre ```RUN export NODE_OPTIONS=--openssl-legacy-provider && yarn build && yarn install --production --ignore-scripts --prefer-offline``` til ```yarn run build```

# CLI COMMANDS

### Devlopment envirment CLI

build/up dev env ```docker-compose up -d --build```

shutdown dev env ```docker-compose down```

build dev env ```docker-compose build```

up dev env ```docker-compose up```

### Production CLI

build/up dev env ```docker-compose -f docker-compose.prod.yml up -d --build```

shutdown dev env ```docker-compose -f docker-compose.prod.yml down```

build dev env ```docker-compose -f docker-compose.prod.yml build```

up dev env ```docker-compose -f docker-compose.prod.yml up```


### Docker CLI LOGS DEV

Frontend ```docker logs backend-fastapi --follow```

Backend ```docker logs frontend --follow```

### Yarn (FRONTEND) CLI DEV

yarn cli ```docker-compose exec frontend <npm command>```

# Funktioner

# Test
### Admin
For at oprette en admin for at teste admin feature så kun under ``localhost:8000/docs```` derefter gå under user/create user og lave en user hvor admin er "true"

efter det skal man så logge ind med den givende bruger

