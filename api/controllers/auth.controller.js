import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

class AuthController {
  async signup(req, res, next) {
    const {
      username,
      email,
      password
    } = req.body;

    if (!username || !email || !password || username == '' || email == '' || password == '') {
      next(errorHandler(422,"Username, Email and Password is required."));
    }
    var hashPassword = bcryptjs.hashSync(password,10);
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
}

export default new AuthController();