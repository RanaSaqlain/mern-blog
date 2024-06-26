import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

class AuthController {
  async signup(req, res) {
    const {
      username,
      email,
      password
    } = req.body;

    if (!username || !email || !password || username == '' || email == '' || password == '') {
      return res.status(422).json({
        message: "Username, Email and Password is required."
      });
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
      return res.status(500).json({
        message: err.message
      });

    }
  }

  async index(req, res) {
    return res.json();
  }
}

export default new AuthController();