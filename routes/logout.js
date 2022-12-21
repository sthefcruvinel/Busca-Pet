const express = require("express")
const router = express.Router()

router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/homepage");
    });
  });

module.exports = router