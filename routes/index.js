
var express = require('express');
var router = express.Router();
var { Client } = require('pg');

// var client = new Client({
//   user: 'keijunkumagai',
//   host: 'localhost',
//   database: 'template1',
//   password: 'kei12jun21',
//   port: 5432
// })

var client = new Client({
  user: 'Keijun',
  host: 'ebihurya-db.cjuxdzs4lxoo.ap-northeast-1.rds.amazonaws.com',
  database: 'ebihurya_db',
  password: 'kei12jun21',
  port: 5432
})
 
client.connect()

router.get('/', function(req, res, next) {
  res.send({ message: "apiは正常に動いています!! ver 1.0.11" })
})

router.get('/flick_images', async function(req, res, next) {

  try {
    const response = await client.query(
      `SELECT * FROM reviews LEFT JOIN stores ON (stores.id = reviews.store)`
    )
    const array = response.rows
    for(var i = array.length - 1; i > 0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return res.send({ result: array })
  } catch (err) {
    console.log(err)
    return res.send({ message: "something going wrong", err }) 
  }
  
  
})

module.exports = router;
