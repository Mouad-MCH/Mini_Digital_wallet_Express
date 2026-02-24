

export const validateUser = (req, res, next) => {
  if(!req.body.name || !req.body.email || !req.body.phone) {
    return res.status(400).json({ success: false, message: "name, email and phone are required" })
  }

  next()
}