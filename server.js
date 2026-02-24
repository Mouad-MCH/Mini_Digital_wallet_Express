import express from 'express';
import userRouter from './src/routes/user.routes.js';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome')
})


app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})