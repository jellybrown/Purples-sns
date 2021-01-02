import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import config from "../../config";

const { JWT_SECRET } = config;
const router = express.Router();

// @routes    GET api/user
// @desc      Get all user
// @access    public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users");

    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// @routes    POST api/user
// @desc      Register user
// @access    public
router.post("/", async (req, res) => {
  const { email, name, nickname, profileImageUrl, password } = req.body;

  if (!email || !name || !nickname || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요." });
  }

  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다." });

    const newUser = new User({
      email,
      name,
      nickname,
      profileImageUrl,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  nickname: user.nickname,
                  profileImageUrl: user.profileImageUrl,
                },
              });
            }
          );
        });
      });
    });
  });
});

export default router;
