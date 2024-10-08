# Generative Evaluation Backend


## Setup

First, install dependencies using poetry:

```bash
poetry install
```

Then, turn on a postgres database and put the credentials into the .env file. For example:

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=generative_eval_db
```

The database should be previously created. In order to create the tables, run seed.py:

```bash
poetry run python seeds/prod.py
# or 
poetry run python seeds/dev.py
```

To turn up the app, run:

```bash
poetry run uvicorn app.api.main:app
# or
poetry run uvicorn app.api.main:app --reload
```


# Update schema

1. Update app/api/models.py
2. Drop db, and run seeds/dev.py or seeds/prod.py
3. Run create_seeds.ipynb (other repo) for uploading questions.
