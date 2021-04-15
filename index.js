const pgp = require("pg-promise")(/* options */);
const constants = require("./constant");
const expesss = require("express");
var db = pgp(constants.connectionURL);
const port = constants.PORT;
const app = expesss();
app.get("/api/branches/autocomplete", (req, res) => {
  const param = req.query;
  const kw = param.q.toUpperCase();
  const limit = Number.parseInt(param.limit);
  const offset = Number.parseInt(param.offset);
  let data;
  db.many(
    `SELECT * FROM branches WHERE branch like '%${kw}%' ORDER BY ifsc LIMIT ${limit} OFFSET ${offset}`
  )
    .then(function (data) {
      res.send(data);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });
});

app.get("/api/branches", (req, res) => {
  const param = req.query;
  const kw = param.q.toUpperCase();
  const limit = Number.parseInt(param.limit);
  const offset = Number.parseInt(param.offset);
  db.many(
    `SELECT * FROM branches WHERE ifsc like '%${kw}%' OR CAST(bank_id as CHAR) like '%${kw}%' OR branch like '%${kw}%' or address like '%${kw}%' or address like '%${kw}%' OR city like '%${kw}%' OR district like '%${kw}%' OR state like '%${kw}%' ORDER BY ifsc LIMIT ${limit} OFFSET ${offset}`
  )
    .then((Data) => {
      res.send(Data);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
