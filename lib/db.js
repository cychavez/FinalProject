import db from 'mysql-chassis'

db.init({
  host: 'localhost',
  database: 'rockit-express',
  user: 'root',
  password: '',
  sqlPath: 'sql'
});

export default db