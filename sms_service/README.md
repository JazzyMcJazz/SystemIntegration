# SMS Service
This project allows a user to login with their fiotext credentials and send sms messages. 

This assumes that a user has already signed up and verified their account. Unverified accounts can log in but the SMS form will be disabled.

<br>

# How to run this project

This assume the repo has already been cloned and that NodeJS and Rust are installed on the operating system.

<br>

### 1: cd into the public folder
```shell
cd public/
```

<br>

### 2. Copy `.env.example` to `.env`
```shell
cp .env.example .env
```
It is not necessary to fill out the variables, they are only used for development but must be present for the code to compile.

<br>

### 3. Build the static frontend
```shell
npm run build
```

<br>

### 4. cd back to root and run backend
```shell
cd ..
cargo run
```

<br>

## 5. Go to localhost:3000 and have fun