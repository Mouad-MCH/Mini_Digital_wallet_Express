import { createDB, deleteDB, readAllDB, saveDB, update } from "../data/db.js";
import { generateId } from "../utils/id.js";
import { createWallet } from "./wallet.controller.js";


export const createUser = async (req, res) => {
    
    const user = {
        id: generateId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    const wallet = {
        id: generateId(),
        userId: user.id,
        name: "walet_1",
    }

    try {
        const create = await createDB("users", user);
        createWallet({ body: wallet })
        if(!create.success) {
          return  res.status(409).json({ success: false, message: create.message })
        }

        res.status(201).json({ success: true, message: create.message})

    }catch(err) {
        res.status(500).json({ success: false, message:'something worng try agin later' })
    }

}

export const getAllUsers = async (req, res) => {
    try {

        const db = await readAllDB("users");
        const users = db.users;
        res.status(200).json({ success: true, message:"ok", users })

    }catch(err) {
        res.status(500).json({ success: false, message: "server problem" })
    }
}

export const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const db = await readAllDB("users");
        const user = db.users.find(el => el.id == id)
        console.log(id)
        if(!user) {
            return res.status(404).json({ success: false, message: "user note found" })
        }

        res.status(200).json({ success: true, message:"ok", user })

    }catch(err) {
        res.status(500).json({ success: false, message: "server problem " + err.message })
    }
}

export const deleteUser = async (req, res) => {
    let {id} = req.params;
    try {
        const delet = await deleteDB("users", parseInt(id));

        if(!delet.success) {
            return res.status(400).json({ success: false, message: delet.message })
        }

        res.status(200).json({ success: true, message: delet.message })

    }catch(err) {
        res.status(500).json({ success: false, message: 'server problem' })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id);
    const db = await readAllDB();
    const exist = db.users.find(el => el.id === userId);

    if(!exist) {
        return res.status(400).json({ success: false, message: 'user not found' })
    }
    
    const user = {
        name : req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    try {
        const u = await update(userId, user)

        if(!u.success) {
            return res.status(400).json({ success: false, message: u.message })
        }

        res.status(200).json({ success: true, message: u.message })
    }catch(err) {
        res.status(500).json({ success: false, message: 'server problem' })
    }

}