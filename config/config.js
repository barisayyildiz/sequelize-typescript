require('dotenv').config()

const {
	USER_NAME, HOST, DATABASE, PASSWORD, DIALECT
} = process.env

module.exports = 
{
  "development": {
    "username": USER_NAME,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "dialect": DIALECT
  }
}
