import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from "./routers/user.router";
import { dbConnect } from './configs/database.config';
dbConnect();
const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods",foodRouter);
app.use("/api/users",userRouter);
// app.get("/api/foods", (req,res) => {
//     res.send(sample_foods);
// })

// app.get("/api/foods/search/:searchTerm", (req,res) => {
//     const searchTerm = req.params.searchTerm;
//     const foods = sample_foods
//     .filter(food => food.name.toLowerCase()
//     .includes(searchTerm.toLowerCase()));
//     res.send(foods);
// })
//  app.get("/api/foods/tags", (req,res) => {
//     res.send(sample_tags);
//  })

//  app.get("/api/foods/tag/:tagName", (req, res) => {
//     const tagName = req.params.tagName;
//     const foods = sample_foods
//     .filter(food => food.tags?.includes(tagName));
//     res.send(foods);
//   })

//   app.get("/api/foods/:foodId", (req, res) => {
//     const foodId = req.params.foodId;
//     const food = sample_foods.find(food => food.id == foodId);
//     res.send(food);
//   })

  // app.post("/api/users/login", (req, res) => {
  //   const {email, password} = req.body;
    
  //   const user = sample_users.find(user => user.email === email 
  //     && user.password === password);
  
  //    if(user) {
  //     res.send(generateTokenReponse(user));
  //    }
  //    else{
  //      const BAD_REQUEST = 400;
  //      res.status(BAD_REQUEST).send("Username or password is invalid!");
  //    }
  
  // })
  
  // app.post("/api/users/login", (req, res) => {
  //   const { email, password } = req.body;
  
  //   if (!req.body || !req.body.email || !req.body.password) {
  //     return res.status(400).send("Email and password are required.");
  //   }
  //   const user = sample_users.find(user => user.email === email && user.password === password);
  
  //   if (user) {
  //     res.send(generateTokenReponse(user));
  //   } else {
  //     const BAD_REQUEST = 400;
  //     res.status(BAD_REQUEST).send("Username or password is invalid!");
  //   }
  // });

  // const generateTokenReponse = (user : any) => {
  //   const token = jwt.sign({
  //     email:user.email, isAdmin: user.isAdmin
  //   },"SomeRandomText",{
  //     expiresIn:"30d"
  //   });
  
  //   user.token = token;
  //   return user;
  // }

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})