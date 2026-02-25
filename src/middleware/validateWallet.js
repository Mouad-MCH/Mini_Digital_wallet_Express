
export const validateWallet = (req, res, next) => {
    if(!req.body.name || !req.params.userId) {
        return res.status(403).json({ success: false, message:"name and userId are required" })
    }

    req.params.userId = parseInt(req.params.userId);
    next()
}

export const validateUpdateWallet = (req, res, next) => {
    if(!req.body.name) {
        return res.status(403).json({ success: false, message: 'name is required' });
    }

    next()
}
