import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import config from "../../config";

const { JWT_SECRET } = config;
const router = express.Router();

import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "purples/upload",
    region: "ap-northeast-2",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100Mb
});

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
  const { email, name, profileImageUrl, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요." });
  }

  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다." });

    const newUser = new User({
      email,
      name,
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

// @route   POST api/user/:username/profile
// @desc    POST Edit Password
// @access  Private
router.post(
  "/:prevUserName/profile",
  uploadS3.single("image"),
  async (req, res) => {
    console.log("file...", req.file.location);
    try {
      const { profileImage, prevUserName, userName, userId } = req.body;
      console.log("request body: ", req.body);

      const result = await User.findById(userId);
      console.log("request user: ", result);

      result.name = userName;

      if (req.file !== null) {
        result.profileImageUrl = req.file.location;
      }
      result.save();
    } catch (e) {
      console.log(e);
    }
  }
);

export default router;
