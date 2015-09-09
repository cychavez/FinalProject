import db from 'mysql-chassis'

db.init({
  host: 'localhost',
  database: 'databasename',
  user: 'username',
  password: '',
  sqlPath: '../sql'
});

export default db
