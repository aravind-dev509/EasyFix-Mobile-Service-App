const Provider = require("../models/Provider");

exports.createProvider = async (req, res) => {
  try {
    const provider = await Provider.create(req.body);

    res.status(201).json({
      message: "Provider Added Successfully",
      provider
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getProviders = async (req, res) => {
  try {
    const providers = await Provider.find();

    res.status(200).json(providers);

  } catch (error) {
    res.status(500).json(error);
  }
};