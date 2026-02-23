import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const filepath = fileURLToPath(new URL('./db.json', import.meta.url));

// GET All data
export const readAllDB = async () => {
    let data = await fs.readFile(filepath, 'utf-8')
    return JSON.parse(data)
}

// save data

export const saveDB = async (db) => {
    try {
        await fs.writeFile(filepath, JSON.stringify(db, null, 2))
        return { success: true }
    }catch(e) {
        return { success: false , message: e.message}
    }
}

// create

export const createDB = async (type, data) => {
    let db = await readAllDB();
    
    if(type === "users") {
        const exist = db[type].find(el => el.name === data.name);
        if(exist) {
            return { success: false, message:  `${type.slice(type.length - 2)} alridy exist` }
        }
    }


    try {
        db[type].push(data)
        let save = await saveDB(db)
        if(!save.success) {
            return { success: false, message: save.message }
        }

        return { success: true, message: 'user is created succusfly' }
    }catch(e) {
        return { success: false, message: e.message }
    }
}

// delete

export const deleteDB = async (type, id) => {
    const db = await readAllDB();
    const data = db[type].find(e => e.id === id)

    if(!data) {
        return { success: false, message:"id not valid" }
    }

    let d = db[type].filter(el => el.id !== id)
    db[type] = d;

    if(type === "users") {
        let walet = db.wallets.filter(el => el.userId !== id)
        db.wallets = walet
    }

    try {
        let save = await saveDB(db)

        if(!save.success) {
           return { success: false, message: save.message } 
        }

        return { success: true, message: "delete success" }
    }catch(e) {
        return { success: false, message: e.message }
    }
}


// console.log(await deleteDB("users", 1771432343834))

// update

export const update = async (id, body) => {
    const db = await readAllDB();
    const user = db.users.find(el => el.id === id);
    const walet = db.wallets.find(el => el.userId === id)

    if(!user) {
        return { success: false, message: 'id not found' }
    }

    try {
        user.name = body.name;
        walet.name = body.name;

        const save = await saveDB(db);
        if(!save.success) {
            return { success: false, message: save.message }
        }

        return { success: true, message:' updated succusfuly' }
    }catch(e) {
        return { success: false, message: e.message }
    }
}

