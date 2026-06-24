const express = require("express");

const router = express.Router();

const {
  createProvider,
  getProviders
} = require("../controllers/providerController");

router.post("/create", createProvider);

router.get("/", getProviders);

module.exports = router;