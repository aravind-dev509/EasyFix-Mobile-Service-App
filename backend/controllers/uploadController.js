exports.uploadImage = async (req, res) => {

  try {

    res.status(200).json({

      message: "Image Uploaded Successfully",

      file: req.file.filename

    });

  } catch (error) {

    res.status(500).json(error);

  }

};