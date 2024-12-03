exports.home = (req, res) => {
    res.status(200).json({
      message: `Welcome to the home page, ${req.user.phoneNumber}!`,
    });
  };
  