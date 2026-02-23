import { createDB, readAllDB, saveDB } from "../data/db.js";
import { generateId } from "../utils/id.js";


export const createUser = async (req, res) => {
    
    const user = {
        id: generateId(),
        name: req.body.name
    }

    try {
        const create = await createDB("user", user);

        if(!create.success) {
          return  res.status(403).json({ success: false, message: create.message })
        }

        res.status(201).json({ success: true, message: create.message})

    }catch(err) {
        res.status(503).json({ success: false, message:'something worng try agin later' })
    }

}

// console.log(await createUser({body: {name:"mouad charadi"}}))
