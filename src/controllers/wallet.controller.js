import { createDB, deleteDB, readAllDB, saveDB } from "../data/db.js";
import { generateId } from "../utils/id.js";


export const createWallet = async (req, res) => {

    let {userId} = req.params
    
    const wallet = {
        id : generateId(),
        name: req.body.name,
        userId: userId,
        solde: 0
    }

    try {
        await createDB("wallets", wallet)
        res.status(20)
    }catch {
        res.status(500).json({ success: false })
    }
}

export const getAllWalles = async (req, res) => {
    let db = await readAllDB();
    let wallets = db.wallets;

    res.status(200).json({ success: true, wallets })
}

export const getWalletByUserID = async (req, res) => {
    let {id} = req.params;
    let db = await readAllDB();
    let wallet = db.wallets.find(el => el.userId === id);

    if(!wallet) {
        res.status(404).json({ success:false, message: 'wallet not found' })
        return
    }

    res.status(200).json({ success: true, wallet })
}

export const deleteWalletByID = async (req, res) => {
    const { id } = req.params;
    const db = await readAllDB();

    const wallet = db.wallets.find(el => el.id === id)

    if(!wallet) {
        return res.status(404).json({ success: false, message: 'wallet not found' })
    }

    try {
        const delet = await deleteDB("wallets", wallet.id)
        
        if(!delet.success) {
            return res.status(404).json({ success: false, message: delet.message })
        }

        res.status(200).json({ success: true, message: delet.message })
    }catch(e) {
        res.status(500).json({ success: false, message: e.message })
    }

}

export const updateWallet = async (req, res) => {
    const { id } = req.params;

    const db = await readAllDB();
    const wallet = db.wallets.find(e => e.id === id);

    if(!wallet) {
        return res.status(404).json({ success: false, message: 'wallet not found' });
    }

    try {
        wallet.name = req.body.name
        const data = await saveDB(db);

        if(!data.success){
            return res.status(400).json({ success: false, message: data.message });
        }

        res.status(200).json({ success: false, message: 'updated success!' });
    }catch(e) {
        res.status(500).json({ success: false, message: e.me });
    }

}

export const deposit = async (req, res) => {

    const {id} = req.params;
    const db = await readAllDB();

    const wallet = db.wallets.find(el => el.userId === id);

    if(!wallet) {
        res.status.json({ success: false, message: "wallet not found" });
        return
    }

    wallet.sold += req.body.amount;


    let operation = {
                    id: Date.now(),
                    wallet_id: wallet.id, 
                    type: "withdraw",
                    amount: req.body.amount,
                    date: new Date().toISOString(),
                }

    db.operations.push(operation)

    try {
        await saveDB(db)
        res.status(201).json({ success: true, message: "solde is deposit" , operation});
    }catch(e) {
        res.status(500).json({ success: false, message: 'solde not deposit' });
    }
    
}

export const withdraw = async (req, res) => {

    const {id} = req.params;
    const db = await readAllDB();

    const wallet = db.wallets.find(el => el.userId === id);

    if(!wallet) {
        res.status(404).json({ success: false, message: "wallet not found" });
        return
    }

    let newSold = wallet.sold - req.body.amount;

    let operation = {
                    id: Date.now(),
                    wallet_id: wallet.id, 
                    type: "withdraw",
                    amount: req.body.amount,
                    date: new Date().toISOString(),
                }

    db.operations.push(operation)


    if(newSold < 0) {
        res.status(403).json({ success: false, message: 'Your balance is insufficient' });
        return
    }


    try {

        db.wallets.forEach(walet => {
            if(walet.userId == id) {
                walet.sold = newSold;
            }
        });


        await saveDB(db)
        res.status(201).json({ success: true, message: 'withdraw succsess!' , operation});
    }catch(e) {
        res.status(500).json({ success: false, message: 'problem server try again later' + e.message })
    }

}