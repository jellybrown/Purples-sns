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

/*
  @route    GET api/user
  @desc     Get all user
  @access   public
 */
router.get("/", async (req, res) => {
  try {
    // 전체 사용자 검색
    const users = await User.find();
    if (!users) throw Error("No users");

    // 검색한 사용자 Document 정보 응답
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

/*
  @route    POST api/user
  @desc     Register user
  @access   public
 */
router.post("/", async (req, res) => {
  // request body에서 사용자 회원가입에 필요한 정보 파싱
  const { email, name, profileImageUrl, password } = req.body;

  // 필수값이 없을 경우 400 error code 응답
  if (!email || !name || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요." });
  }

  User.findOne({ email }).then((user) => {
    // Users collection에 이미 존재하는 경우 400 error code 응답
    if (user)
      return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다." });

    // 새로운 사용자를 추가하기 위해 Model Object 쌩성
    const newUser = new User({
      email,
      name,
      profileImageUrl,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      // 신규 사용자 정보의 password 값을 해싱한다.
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        // 패스워드 값을 해싱된 값으로 변경.
        newUser.password = hash;

        // model object를 document로 저장한다.
        newUser.save().then((user) => {
          // JWT 발행 처리
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 }, // 만료일
            (err, token) => {
              if (err) throw err;

              // JWT와 신규 생성한 User 정보를 함께 응답
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

/*
  @route    POST api/user/:username/profile
  @desc     POST Edit Password
  @access   Private
 */
router.post(
  "/:prevUserName/profile",
  uploadS3.single("image"), // 프로필 이미지 AWS S3 업로드를 위한 미들웨어
  async (req, res) => {
    // uploadS3 미들웨어를 통해 AWS S3 업로드한 프로필 이미지 URL 확인
    console.log("file...", req.file.location);
    try {
      // request body에서 사용자 이름과 아이디를 파싱
      const { profileImage, prevUserName, userName, userId } = req.body;

      // User document 검색 및 사용자 이름 변경
      const result = await User.findById(userId);
      result.name = userName;

      // 프로필 이미지 변경을 위해 파일이 함께 넘어왔을 경우에만 MongoDB Document 내 URL 값 설정
      if (req.file !== null) {
        result.profileImageUrl = req.file.location;
      }

      // 변경한 정보 MongoDB Document 반영
      result.save();
    } catch (e) {
      console.log(e);
    }
  }
);

export default router;
