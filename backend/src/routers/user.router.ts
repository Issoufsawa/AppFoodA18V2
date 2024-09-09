import {Router} from 'express';
import asyncHandler from 'express-async-handler';

import { sample_users } from "../data";
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();


router.get("/seed", asyncHandler(
    async (req, res) => {
       const usersCount = await UserModel.countDocuments();
       if(usersCount> 0){
         res.send("Seed is already done!");
         return;
       }
  
       await UserModel.create(sample_users);
       res.send("Seed Is Done!");
   }
   ))


router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).send("Email and password are required.");
    }
    const user = sample_users.find(user => user.email === email && user.password === password);
  
    if (user) {
      res.send(generateTokenReponse(user));
    } else {
     
      res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
    }
  });



  router.post('/register', asyncHandler(
    async (req, res) => {
      const {name, email, password, address} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(HTTP_BAD_REQUEST)
        .send('User is already exist, please login!');
        return;
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      const newUser:User = {
        id:'',
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false
      }
  
      const dbUser = await UserModel.create(newUser);
      res.send(generateTokenReponse(dbUser));
    }
  ))

  const generateTokenReponse = (user : any) => {
    const token = jwt.sign({
      email:user.email, isAdmin: user.isAdmin
    },"SomeRandomText",{
      expiresIn:"30d"
    });
  
    user.token = token;
    return user;
  }
  export default router;