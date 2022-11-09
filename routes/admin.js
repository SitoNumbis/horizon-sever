const express = require("express");

// controller
const {
  addBuildings,
  addTechnologies,
  addShips,
} = require("../controller/technologies");

// auth
const { verifyBearer } = require("../utils/secure");

const load = require("../utils/loading");

const router = express.Router();

router.post("/add-buildings", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { buildings } = req.body;
          await addBuildings(buildings);
          load.stop();
          return;
        }
      }
    }
    res.send({ status: 403, data: { error: "unauthorized" } });
  } catch (err) {
    res.send({ err }).status(500);
  }
  load.stop();
});

router.post("/add-ships", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { ships } = req.body;
          await addShips(ships);
          load.stop();
          return;
        }
      }
    }
    res.send({ status: 403, data: { error: "unauthorized" } });
  } catch (err) {
    res.send({ err }).status(500);
  }
  load.stop();
});

router.post("/add-technologies", async (req, res) => {
  load.start();
  try {
    if (req.headers.authorization) {
      if (req.headers.authorization.indexOf("Bearer ") === 0) {
        const verified = verifyBearer(req.headers.authorization);
        if (verified) {
          const { technologies } = req.body;
          await addTechnologies(technologies);
          load.stop();
          return;
        }
      }
    }
    res.send({ status: 403, data: { error: "unauthorized" } });
  } catch (err) {
    res.send({ err }).status(500);
  }
  load.stop();
});

module.exports = router;
