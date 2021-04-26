import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import config from "../../config/index";
const { JWT_SECRET } = config;

import User from "../../models/user";
import Follow from "../../models/follow";

// express router를 생성한다. (이 라우터를 express object에서 사용한다.)
const router = express.Router();

// @route   POST api/auth
// @desc    로그인 API
// @access  public
router.post("/", (req, res) => {
  console.log("login 시도");
  const { email, password } = req.body;

  // email이나 password 값이 넘어오지 않았을 경우 400 error response 응답 처리.
  if (!email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요." });
  }

  // email 값으로 MongoDB의 사용자 정보를 찾는다.
  User.findOne({ email }).then((user) => {
    // email 값으로 사용자 데이터를 찾지 못했을 경우 400 error return.
    if (!user) return res.status(400).json({ msg: "유저가 존재하지 않습니다" });

    // 해싱되어 저장된 패스워드 값과 요청받은 패스워드 값을 비교한다.
    bcrypt.compare(password, user.password).then((isMatch) => {
      // 일치하지 않는다면 400 error 응답 처리.
      if (!isMatch)
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });

      // json web token을 생성한다. (expiresIn을 통해 만료일 설정)
      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "2 days" },
        (err, token) => {
          if (err) throw err;

          // 생성된 token과 사용자 정보를 함께 json으로 응답 처리.
          res.json({
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              profileImageUrl: user.profileImageUrl,
              role: user.role,
            },
          });
        }
      );
    });
  });
});

router.post("/logout", (req, res) => {
  res.json("로그아웃 성공");
});

// @route   POST api/auth/user
// @desc    사용자 Token 검증 API, middleware auth 사용. (전체 페이지 로딩에 사용)
// @access  public
router.get("/user", auth, async (req, res) => {
  try {
    console.log("----- auth POST api ---");
    // middleware auth를 통해 설정된 req.user.id에 대해 MongoDB 검색
    // lean() method를 통해 결과 값을 변경할 수 있도록 함.
    let user = await User.findById(req.user.id).select("-password").lean();

    // MongoDB에 사용자 정보가 없을 경우 throw Error.
    if (!user) throw Error("유저가 존재하지 않습니다");

    // 사용자 정보에 팔로워/팔로잉 수 설정.
    const followerCount = await Follow.find({ follow: req.user.id }).count();
    const followCount = await Follow.find({ user: req.user.id }).count();
    const followers = await Follow.find({ follow: req.user.id }).populate(
      "follow"
    );
    const follows = await Follow.find({ user: req.user.id }).populate([
      "user",
      "follow",
    ]);

    console.log("user data", user);
    console.log("follower/follow count: ", followerCount, ", ", followCount);

    // user object에 follow, follower, token 정보를 담는다.
    user.followCount = followCount;
    user.followerCount = followerCount;
    user.follows = follows;
    user.followers = followers;
    user.token = req.header("x-auth-token");

    console.log("resultUser", user);
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

export default router;
