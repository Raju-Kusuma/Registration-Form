var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    var fname = req.body.fname
    var lname = req.body.lname
    var age = req.body.age
    var email = req.body.email
    var password= req.body.password
    var phno= req.body.phno
    var gender= req.body.gender

    var data={
        "fname":fname,
        "lname":lname,
        "age":age,
        "email":email,
        "password":password,
        "phno":phno,
        "gender":gender
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
     })
     return res.redirect("signup_success.html")
}

)

app.get("/",(req,res) => {
    res.set({ 
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("listening on port 3000")