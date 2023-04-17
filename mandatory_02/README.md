# Mandatory 2 Documentation
## How I did it


### Project Setup:
[skip to "How to run this project"](#how-to-run-this-project)

Create project folder

```shell 
mkdir my_project && cd my_project/
```

<br>

### Setup SupaBase

```shell
# Get the code
git clone --depth 1 https://github.com/supabase/supabase

# Go to the docker folder
cd supabase/docker

# Copy the fake env vars
cp .env.example .env
```

Change secrets in `.env` and `volumes/api/kong.yml` as documented by SupaBase [here](https://supabase.com/docs/guides/self-hosting/docker#generate-api-keys)

```shell
# Start
docker compose up -d
```

<br>

### Frontend App Setup
I built the app in SvelteKit, setting up a skeleton project as per SvelteKit documentation:
```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
```

The app uses the official SupaBase JavaScript SDK to integrate our SupaBase instance. The SDK can be installed using this command:
```shell
npm i @supabase/supabase-js
```

The SupaBase REST API address and the `anon` key [(see SupaBase Setup)](#setup-supabase) must be provided in the SvelteKit app's `.env` file.

***
<br>

## How to run this project

```shell
# Clone project
git clone --depth 1 https://github.com/JazzyMcJazz/SystemIntegration.git

cd SystemIntegration/mandatory_02/supabase/docker

# Copy the fake env vars
cp .env.example .env
```

[optional] Change the secrets in `.env`

[mandatory] Copy the JWT keys provided in `.env` to `volumes/api/kong.yml`

```shell
# Navigate back to App folder
cd ../../App

# Copy the fake env vars
cp ./env.example .env
```

[mandatory] Copy the `anon` JWT key from `supabase/docker/.env` to `.env`

For convenience the scripts to run and stop the app and SupaBase are provided (might now work on windows):

```shell
# Navigate back to mandatory_02 folder
cd ..

# Give scripts execute permission
chmod +x start.sh
chmod +x stop.sh

# Run project
./start.sh

# The app will run in the terminal, press ctrl+c to terminate the webserver.

# Stop SupaBase
./stop.sh
```

<br>

### Notes:
**Running on Windows**

To run the project on Windows install the cross-env library in the App project with `npm i -D cross-env` and add `cross-env` to the beginning of the `"start"` script in `package.json`.

**Running the App in Docker**

I attempted running the app in Docker, but even using my private IP (not `localhost` or `127.0.0.1`) the app could not reach SupaBase. This should not be a problem if the app and SupaBase are running on different servers, and there probably is a solution to this issue, however, that is beyond the scope of this assignment.

<br>

# Considerations / Research

For this assignment I had to choose a third party authentication service. Choosing the right one for yous needs is crucial and several considerations must be made.

### **My Requirements**
- Self Hosting option
- Server-side Auth management
    - the ability to perform actions on behalf of a user from my own webserver,
- Well made SDK for ease of integration

### **Services that were considered:**
- Firebase
- PocketBase
- AppWrite
- Directus
- SupaBase

### **Pros and cons for each service**

### Firebase
**Pros**

- Good SDK
- Can create separate projects on the same account
- Very robust
- Cloud Hosting option

**Cons**
- No self-hosting (takes it out of contention)

### PocketBase
**Pros**
- Self Hosting option
- Very lightweight
- Can create separate projects on the same instance

**Cons**
- Seems less robust
- No Cloud Hosting option

### AppWrite
**Pros**
- Good SDK
- Looks robust
- Can create separate projects on the same instance
- Self Hosting option
- Cloud Hosting option

**Cons**
- Relies solely on cookies for authentication, which makes it very annoying to do server-side auth management (takes it out of contention)

### Directus
**Pros**
- Self Hosting option
- Cloud Hosting option
- Is robust
- Easy to manage user access at role level

**Cons**
- Bad SDK
    - The SDK always assumes it is running in a browser/mobile app, making it bad for server-side auth managament. This can be worked around, but the solution feels very hacky.

### SupaBase
**Pros**
- Good SDK
- Is robust
- Self Hosting option
- Cloud Hosting option

**Cons**
- Can only run one project per self-hosted instance (multiple in cloud hosting)
- User access at role level requires extensive research.

### **The Choice**
In the end I decided to use SupaBase because it fulills all of my requirements. 

The only big downside to SupaBase is, as mentioned in the cons, that there is no native way to set roles on users. A custom table would be required for this, at which point you'd have to do a lot of research into how RLS policies work in order to restrict access at a role level to content. If this is expertise is acquired SupaBase is a near perfect option.

An alternative to restrict access to content at role level is simply creating separate projects within the chosen service. This, of course, is only viable if users of different roles are not required to do access database content within the same project. This can be viable when access to content is handled by an external system (using the auth service as an external dependency).

In case it is not viable to have users on separate projects I would opt for PocketBase or Directus instead, or do the required research to achieve this with SupaBase.



