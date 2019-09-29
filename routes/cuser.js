const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const CUser = require("../models/cuser");
const Payment = require("../models/payment");
const Notifications = require("../models/notifications");
const Modifications = require("../models/modications");
const Company = require("../models/projectinfo");
const BidStatus = require("../models/bidstatus");
const ANoti = require("../models/anoti");
const CNoti = require("../models/unoti");
const randomInt = require("random-int");
router.post("/cuserreg", (req, res) => {
  CUser.findOne({ ID: req.body.ID }).then(user => {
    if (user) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newCUser = new CUser({
        FullName: req.body.FullName,
        Email: req.body.Email,
        ID: req.body.ID,
        Key: req.body.Key
      });
      newCUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

router.post("/cuserlogin", (req, res) => {
  CUser.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    if (req.body.Key === user.Key) {
      const payload = {
        id: user.id,
        ID: user.ID
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
      new Notifications({
        ID: req.body.ID,
        Role: "CUser",
        Content: req.body.ID + " is loged in."
      }).save();
    } else {
      return res.status(400).json({ keyincorrect: "Key incorrect" });
    }
  });
});

router.post("/getcuser", (req, res) => {
  const ID = req.body.ID;
  console.log(ID);

  CUser.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    } else {
      Company.findOne({ ID: req.body.ID }).then(comp => {
        if (!comp) {
          return res.status(404).json({ IDNotFound: "ID not found" });
        } else {
          const result = {
            FullName: user.FullName,
            Email: user.Email,
            ACN: comp.ACN,
            CompanyName: comp.CompanyName,
            Status: comp.Status
          };
          return res.json(result);
        }
      });
    }
  });
});

router.post("/getunoti", (req, res) => {
  CNoti.find({ ID: req.body.ID }).then(user => {
    if (!user) {
      return json({ Content: "None", Date: new Date() });
    }
    console.log("There");
    return res.json(user);
  });
});

router.post("/modifications", (req, res) => {
  const ID = req.body.ID;
  new Modifications({
    ID: req.body.ID,
    ProjectName: req.body.ProjectName,
    Updations: req.body.Updations
  })
    .save()
    .then(err => {
      new Notifications({
        ID: req.body.ID,
        CompanyName: req.body.CompanyName,
        ProjectName: req.body.ProjectName,
        Content: "Modifications added."
      }).save();
      res.json({ message: "Succeed" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/compreq", (req, res) => {
  console.log(req.body);
  new Company({
    ID: req.body.ID,
    CompanyName: req.body.CompanyName,
    UserName: req.body.UserName,
    Address: req.body.Address,
    Type: req.body.Type,
    CEOName: req.body.CEOName,
    Headquarter: req.body.Headquarter,
    Status: "Pendding",
    Date: new Date(),
    ACN: "Pay Your Payments"
  })

    .save()
    .then(err => {
      new ANoti({
        ID: req.body.ID,
        Date: new Date(),
        Content: "New Company Registered Payment Pendding."
      }).save();
      res.json({ message: "Succeed" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/addnotification", (req, res) => {
  new Notifications({
    ID: req.body.ID,
    Date: req.body.Date,
    Content: req.body.Content
  })
    .save()
    .then(r => {
      res.json({ message: "OK" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/getbidstatus", (req, res) => {
  BidStatus.find()
    .then(projects => {
      console.log("There");
      if (projects) {
        return res.json(projects);
      } else {
        return res.json([
          {
            CompanyName: "None",
            ProjectName: "None",
            Bid: "None",
            Reason: "None"
          }
        ]);
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/payment", (req, res) => {
  Company.findOne({ ID: req.body.ID }).then(company => {
    (company.Status = "Registered"), (company.ACN = company._id);
    company.save();
  });
  new Payment({
    ID: req.body.ID,
    Name: req.body.Name,
    Number: req.body.Number,
    Date: req.body.Date,
    CVV: req.body.CVV
  }).save();
  new ANoti({
    ID: req.body.ID,
    Date: new Date(),
    Content: "Payments paid."
  })
    .save()
    .then(r => {
      res.json({ message: "OK" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
  new CNoti({
    ID: req.body.ID,
    Date: new Date(),
    Content: "Congrats you have registered you company"
  })
    .save()
    .then(r => {
      res.json({ message: "OK" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/uctype", (req, res) => {
  Company.findOne({ ID: req.body.ID }).then(company => {
    company.Type = req.bodyUCType;
    company.save();
  });
  new ANoti({
    ID: req.body.ID,
    Date: new Date(),
    Content: "Company type Updated to " + req.body.UCTypes
  })
    .save()
    .then(r => {
      res.json({ message: "OK" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

//File Download
const fs = require("fs");

router.post("/pdf", (req, res) => {
  console.log(req);
  var file = fs.createReadStream(
    `${__dirname}/client/public/uploads/${req.body.FileName}.pdf`
  );
  file.pipe(res);
});

module.exports = router;
