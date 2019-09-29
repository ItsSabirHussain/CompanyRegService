const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const CEO = require("../models/ceo");
const Notification = require("../models/notifications");
const Company = require("../models/projectinfo");
const BidStatus = require("../models/bidstatus");
const ANoti = require("../models/anoti");
const CNoti = require("../models/unoti");

router.post("/ceoreg", (req, res) => {
  CEO.findOne({ ID: req.body.ID }).then(ceo => {
    if (ceo) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newCEO = new CEO({
        FullName: req.body.FullName,
        OfficeID: req.body.OfficeID,
        ID: req.body.ID,
        Key: req.body.Key
      });

      newCEO
        .save()
        .then(ceo => res.json(newCEO))
        .catch(err => console.log(err));
    }
  });
});

router.post("/ceologin", (req, res) => {
  CEO.findOne({ ID: req.body.ID }).then(ceo => {
    if (!ceo) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    if (req.body.ID === ceo.Key) {
      const payload = {
        id: ceo.id,
        ID: ceo.ID
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Key incorrect" });
    }
  });
});

router.post("/getceo", (req, res) => {
  CEO.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

router.post("/getcnotifications", (req, res) => {
  Notification.find()
    .then(noti => {
      if (noti) {
        return res.json(noti);
      } else {
        return res.json({
          ID: "None",
          ProjectName: "None",
          CompanyName: "None",
          Content: "None"
        });
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/getallcomp", (req, res) => {
  Company.find().then(noti => {
    if (noti) {
      console.log(noti);
      return res.json(noti);
    } else {
      return res.json({
        UserID: "None",
        UserName: "None",
        CompanyName: "None",
        Address: "None",
        Type: "None",
        CEOName: "None",
        Headquarter: "None",
        Date: "None"
      });
    }
  });
});

router.post("/getanoti", (req, res) => {
  ANoti.find()
    .then(noti => {
      if (noti) {
        return res.json(noti);
      } else {
        return res.json({
          ID: "None",
          Date: "None",
          Content: "None"
        });
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/updatebidstatus", (req, res) => {
  new BidStatus({
    ID: req.body.ID,
    ProjectName: req.body.ProjectName,
    CompanyName: req.body.CompanyName,
    Bid: req.body.Bid,
    Reason: req.body.Reason,
    Status: req.body.Status
  })
    .save()
    .then(r => {
      res.json({ message: "Done" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/areq", (req, res) => {
  new CNoti({
    ID: req.body.ID,
    Date: new Date(),
    Content:
      "Its informed you to submit you anual records. " + req.body.Description
  })
    .save()
    .then(ee => {
      res.json({ message: "succeeded" });
    });
});
module.exports = router;
