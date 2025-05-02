export const updateProfile = async (req, res) => {
  const { fullName, profilePic, email } = req.user;
  //testing the protectRoute middle ware
  res.status(200).json({
    message: 'protectRoute middleWare is working correctly',
    data: req.user,
  });
};
