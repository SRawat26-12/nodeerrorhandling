const express = require("express");
const app=express();
const bodyparser = require('body-parser')
const cors= require("cors");
const errHandler= require("./middleware/errorHandler");

require("dotenv").config();
const port=process.env.PORT || 3000
app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.get("/home", (req, res)=>{
   res.send("My home page");
})
app.get("/about", (req, res,next)=>{
   try {
      let a=10;
      let b=0;
       if (b==0)
       {
         throw new Error("App zero se divide na kare!!!");
       }
      let c=a/b;
      res.status(200).send({ans:c});
   } catch (error) {
       next(error)
   }
})


app.get("/service", (req, res, next)=>{
   // code may generate error
   const err= new Error("ye service ka error message hai!");
   next(err);
})
app.get("/join", (req, res)=>{
   res.send("My Join page");
})
app.get("/contact", (req, res, next)=>{
    const err= new Error("ye contact page ki error hai!");
    next(err);
})


app.use(errHandler);

app.listen(port, ()=>{
    console.log(`server run on ${port}!!!`);
})