import express, { NextFunction, Request, Response } from "express"
import cors from 'cors'
import router from "./routes/routes"

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use("/", router)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack)
    res.status(500).json({ error: "Erro interno do servidor"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})