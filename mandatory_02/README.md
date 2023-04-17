# Mandatory 2 Documentation

## Project Setup:
Create project folder

```shell 
mkdir my_project && cd my_project/
```
### Setup SupaBase

```shell
# Get the code
git clone --depth 1 https://github.com/supabase/supabase

# Go to the docker folder
cd supabase/docker

# Copy the fake env vars
cp .env.example .env
```

[optional] Change secrets in `.env`

```shell
# Start
docker compose up -d
```