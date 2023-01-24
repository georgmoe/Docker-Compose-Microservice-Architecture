const express = require("express");
const cors = require("cors")
const { Pool } = require("pg")

const port = process.env.PORT
const app = express();
app.use(express.json())
app.use(cors())
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE
})


// app.get("/", async (req, res) => {
//   console.log("in get huhu")
//   try{
//     const data = await pool.query('SELECT * FROM shortener;')
//     res.json({rows: data.rows})
//   }catch (err){
//     res.json({error: err})
//   }
// });

app.post("/", async (req, res) => {
  // console.log("reached microservice")
  // const dropTable = await pool.query("DROP TABLE shortener;")
  const createTable = await pool.query(`CREATE TABLE IF NOT EXISTS shortener(
    id serial PRIMARY KEY,
    long text,
    short text);`)
  
  try{
    const longUrl = req.body.url
    console.log(longUrl)
    // create unique short url
    let shortUrl = '/'
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for(i=0; i<6; i++){
      shortUrl += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    // res.json({long: long, short: short})
    const sql = 'INSERT INTO shortener (long, short) VALUES ($1, $2);'
    const values = [longUrl, shortUrl]
    const response = await pool.query(sql, values)
    // res.json({r: "saved"})
    // console.log(shortUrl)
    res.json({url: shortUrl})
  } catch (err){
    // console.log(err.stack)
    res.json({error: err.stack})
  }
})

app.get("*", async (req, res) => {
  // console.log("huhu")
  try{
    const path = req.path
    const sql = 'SELECT * FROM shortener WHERE short=$1'
    const values = [path]
    const { rows } = await pool.query(sql, values)
    const redirectUrl = rows[0].long
    res.redirect(redirectUrl)
    // res.json({redirect: redirectUrl})
  } catch (err){
    res.json({error: err.stack})
  }
})

app.listen(port, () => console.log(`microservice listening at http://0.0.0.0:${port}`));