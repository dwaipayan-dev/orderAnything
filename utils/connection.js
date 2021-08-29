const Sequelize = require('sequelize');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || 'root';
const database = process.env.DB_NAME || 'orderdb';
const port = process.env.DB_PORT || '3308';

//Below is untested code. Could not run on my system as the default port used by the package mysql-import was already in use. So instead

/*
const Importer = require('mysql-import');
const importer = new Importer({host, user, password, database});

// New onProgress method, added in version 5.0!
importer.onProgress(progress=>{
  var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
  console.log(`${percent}% Completed`);
});

importer.import('./defaultDatabase/').then(()=>{
  var files_imported = importer.getImported();
  console.log(`${files_imported.length} SQL file(s) imported.`);
}).catch(err=>{
  console.error(err);
});
*/
const sequelize = new Sequelize(
    database,
    user,
    password,{
        dialect: 'mysql',
        host: host,
        port: port
    }
);



module.exports = sequelize;