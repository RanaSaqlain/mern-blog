import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {
  errorHandler
} from "../utils/error.js";
import jwt from 'jsonwebtoken';
class AuthController {
  async signup(req, res, next) {
    const {
      username,
      email,
      password
    } = req.body;

    if (!username || !email || !password || username == '' || email == '' || password == '') {
      next(errorHandler(422, "Username, Email and Password is required."));
    }
    var hashPassword = bcryptjs.hashSync(password, 10);
    const registerUser = new User({
      username,
      email,
      password: hashPassword,
    })
    try {
      await registerUser.save();
      return res.status(200).json({
        message: "User created successfully."
      });

    } catch (err) {
      next(err)

    }
  }

  async index(req, res) {
    return res.json();
  }

  async signIn(req, res, next) {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
     return  next(errorHandler(400, 'Required fields not found'));
    }

    try {

      const validUser = await User.findOne({
        email
      })

      if (!validUser) {
       return next(errorHandler(404, 'User not found'));
      }

      const validPassword = bcryptjs.compareSync(password, validUser.password);

      if (!validPassword) {
       return   next(errorHandler(400, 'Invalid Password'));
      }

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
      const {password: pass,...rest}= validUser._doc;

      res.status(200).cookie('access_token', token, {
        httpOnly: true
      }).json(rest);

    } catch (error) {
      next(error);
    }
  }
}


export default new AuthController();