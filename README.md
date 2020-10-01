# Family App
This is a simple ReactJS application where you can keep track of everything you need to know about other members of your family.<br />

--------------------------------------------------
### Usage
`Not documented yet`

--------------------------------------------------
### Libraries/Frameworks used
- `React JS`
- `GraphQL`
- `Sequelize`
- `MySQL database`

--------------------------------------------------
### Setup
Clone/download the repo
```
git clone https://github.com/NielzosFilms/Family-App
```
Create a MySQL database `family_app`. <br/>
Go to `~/Family-App` in a terminal. <br/>
Create a `.env` file and put this inside:
```
DB_NAME=family_app
DB_USER=<YOUR DATABASE USER>
DB_PASS=<YOUR DATABASE PASS>
REACT_APP_DEV_DB_HOST=<YOUR HOST>
```
Install all dependencies:
```
yarn install
```
Migrate the MySQL database:
```
yarn server:migrate
```
Start Apollo/GraphQL Server:
```
yarn start:server
```
Start the React client:
```
yarn start
```
--------------------------------------------------
