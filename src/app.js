const mongoose = require('mongoose')
const express=require("express");
const path=require("path");
const Register = require("./models/register")
const app=express();

// const DB = 'mongodb+srv://arya:arya1234@cluster0.qekbf41.mongodb.net/pawworld?retryWrites=true&w=majority'
// mongoose.connect(DB,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
    
// }).then(()=>{
//     console.log('connection successful');
// }).catch((err) => console.log(err));

require("./db/conn");



const port=process.env.PORT || 3000

const static_path= path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../template/views")

app.use(express.static(static_path));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("viewengine", "hbs")

app.set("views", template_path)

app.get("/",(req,res)=>{
    res.send("hello from aryapiku")
});

app.get("/home",(req,res)=>{
    res.render("home")
});

app.post("/login", (req,res)=> {
    const email = req.body.email
    const password = req.body.password
})

app.post("/register",async(req,res)=>{
    try {
          const password = req.body.password;
          const confirmpassword = req.body.confirmpassword;
          if(password===confirmpassword){
            const userdata = new Register({
                fullname:req.body.name,
                email:req.body.email,
                // mobile:req.body.mobile,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            });
            // const token = await userdata.mytoken();
            // console.log("my token is "+ token);
            
            // res.cookie("jwt",token,{
            //     expires:new Date(Date.now() +50000),
            //     httpOnly:true
            // });
            const savedata = await userdata.save();
            res.status(201).redirect("/home");
          }
    } catch (error) {
        res.status(400).send(error)
        
    }
});

app.post("/login",async(req,res)=>{
    try {
         const email = req.body.email;
         const password  = req.body.password;
     const useremail = await Register.findOne({email:email});
    //  const token = await useremail.mytoken();
    //  console.log("This is my token "+ token);
 
    //  res.cookie("jwt",token,{
    //      expires:new Date(Date.now() +50000),
    //      httpOnly:true
    //  });
     if(useremail.password===password){
         res.status(201).render("home")
     }else{
         res.send("invalid login details")
     }
    } catch (error) {
     res.status(400).send("invalid login detail")
    }
 });
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`)
})

