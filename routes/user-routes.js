const express = require("express");
const router = express.Router();

const UserModel = require("../model/user");

router.get("/profile", async (req, res, next) => {
  const id = req.user._id;
  // let user = {};
  // await UserModel.findById(id, (error, u) => {user = u});
  UserModel.findById(
    id,
    "username firstName lastName password",
    null,
    (error, u) => {
      res.json(u);
    }
  );
  // res.json({
  //     user: user,
  // })
});

router.put("/", async (req, res, next) => {
  UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      },
    },
    { new: true },
    async (err, u) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.json({
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
      });
    }
  );
});

router.put("/favorite-vocabularies", async (req, res, next) => {
  UserModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { vocabularies: req.body.vocabularyId } },
    { new: true },
    async (err, u) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.json({
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
      });
    }
  );
});

router.get("/favorite-vocabularies", async (req, res, next) => {
  UserModel.findById(req.user._id, "username firstName lastName vocabularies")
    .populate("vocabularies")
    .exec(async (err, u) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.json(u);
    });
});

router.delete("/favorite-vocabularies/:vId", async (req, res, next) => {
  UserModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { vocabularies: req.params.vId } },
    { new: true },
    async (err, u) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.status(204).send();
    }
  );
});

module.exports = router;
