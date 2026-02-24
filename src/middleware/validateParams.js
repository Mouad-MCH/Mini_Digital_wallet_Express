

export const validateParams = (req, res, next) => {
  const { id } = req.params;
  if(!id) {
    return res.status(400).json({ success: false, message: "ID parameter is required" })
  }

  if(isNaN(id)) {
    return res.status(400).json({ success: false, message: "ID must be a number" })
  }

  next()
}