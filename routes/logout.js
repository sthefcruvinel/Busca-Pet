const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/homepage");
    });
  });

module.exports = router