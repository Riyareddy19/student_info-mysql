const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000;
app.use(express.json());

const con = mysql.createConnection ({
  host : "localhost",
  user : "root",
  password : "Riakreddy_1911",
  database : "student_info"
});

con.connect((err) => {
  if(err)
    console.log(err)
  else
    console.log("CONNECTED!!")
})

app.get('/student/all',(req,res) => {
  con.query('SELECT * FROM student',(err, result) => {
    if(err)
      console.log(err);
    else
      res.send(result)
  })
})

app.get('/student/:std_id',(req, res) =>{
  const std_id = req.params.std_id;
  con.query('SELECT * FROM student WHERE id = ?',std_id,(err,result) => {
    if(err)
      console.log(err)
    else
      res.send(result)
  })
})

app.post('/student',(req, res) => {
  const id = req.body.id;
  const rollno = req.body.rollno;
  const name = req.body.name;
  const grade = req.body.grade;
  const email = req.body.email;
  const course = req.body.course;
  con.query('INSERT INTO student VALUES (?, ?, ?, ?, ?, ?)',[id, rollno, name, grade, email, course],(err)=>{
    if(err)
      console.log(err);
    else
      res.send("POSTED!!");
  })
})

app.put('/student/:std_id',(req, res) => {
  const std_id = req.params.std_id;
  const rollno = req.body.rollno;
  const name = req.body.name;
  const grade = req.body.grade;
  const email = req.body.email;
  const course = req.body.course;
  con.query('UPDATE student SET rollno = ?, name = ?, grade = ?, email = ? , course = ? WHERE id = ?',[rollno, name, grade, email, course, std_id], (err,result) => {
    if(err)
      console.log(err)
    else
      res.send("UPDATED!!")
  })
})


app.put('/student/:std_id/grade/:grade',(req, res) => {
  const std_id = req.params.std_id;
  const grade = req.params.grade;
  con.query('UPDATE student SET  grade = ? WHERE id = ?',[ grade, std_id], (err,result) => {
    if(err)
      console.log(err)
    else
      res.send("GRADE UPDATED!!")
  })
})

app.put('/student/:std_id/course/:course',(req, res) => {
  const std_id = req.params.std_id;
  const course = req.params.course;
  con.query('UPDATE student SET  course = ? WHERE id = ?',[ course , std_id], (err,result) => {
    if(err)
      console.log(err)
    else
      res.send("COURSE UPDATED!!")
  })
})


app.delete('/student/:std_id',(req, res) => {
  const std_id = req.params.std_id;
  con.query('DELETE FROM student WHERE id = ?',std_id,(err) => {
    if(err)
      console.log(err);
    else
      res.send("DELETED!!")
  })
})

app.put('/student/col/:colname',(req, res)=>{
  const colname = req.params.colname;
  con.query(`ALTER TABLE student ADD COLUMN ${colname} VARCHAR(50)`,colname,(err)=>{
    if(err)
      console.log(err);
    else
      res.send("COLUMN ADDED!!")
  })
})

app.listen(port,() => {
  console.log(`Listening on port ${port}`)
});