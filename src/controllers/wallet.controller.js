import { createDB, readAllDB, saveDB } from "../data/db.js";
import { generateId } from "../utils/id.js";


export const createWallet = async (req, res) => {
    const wallet = {
        id : generateId(),
        name: req.body.name,
        userId: req.body.userId,
        solde: 0
    }

    try {
        await createDB(db)
    }catch {
        res.status(500).json({ success: false })
    }
}