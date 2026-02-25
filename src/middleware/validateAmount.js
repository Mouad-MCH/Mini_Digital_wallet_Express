


export const validateAmount = (req, res, next) => {
    const { amount } = req.body
    if(!amount) {
        return res.status(403).json({ success: false, message:"amount is required" })
    }

    if(isNaN(amount)) {
        return res.status(403).json({ success:false,  message:'amount should be number' })
    }

    if(amount < 0) {
        return res.status(403).json({ success:false, message:'amount should be > 0' })
    }

    next()
}