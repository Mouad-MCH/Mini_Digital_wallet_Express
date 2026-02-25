import express from 'express';
import userRouter from './src/routes/user.routes.js';
import walletRouter from './src/routes/wallet.routes.js';
import { errHandler } from './src/middleware/errorHandler.js';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(errHandler)

app.get('/', (req, res) => {
    res.send('welcome')
})


app.use("/user", userRouter)
app.use("/wallet", walletRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})