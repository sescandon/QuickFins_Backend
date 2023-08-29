import {Request, Response  } from "express"
import { connect } from "../database"
import { Posee } from "../interface/posee.interface"

export async function getPosees(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const posees = await conn.query('SELECT * FROM Posee')
    return res.json(posees[0])
}

export async function createPosee(req: Request, res: Response) {
    const newPost: Posee = req.body
    const conn = await connect()
    conn.query('INSERT INTO Posee SET?',[newPost])
    return res.json({
        message:'Posee CREATED'
    })
}

export async function getPosee(req: Request, res:Response): Promise<Response>{
    const id = req.params.idPosee
    const conn = await connect()
    const Posee = await conn.query('SELECT * FROM Posee WHERE idPosee = ?', [id])
    return res.json(Posee[0])
}

export async function deletePosee(req: Request, res:Response) {
    const id = req.params.idPosee
    const conn = await connect()
    await conn.query('DELETE FROM Posee WHERE idPosee = ?', [id])
    return res.json({
        message:'Posee DELETED'
    })
}

export async function updatePosee (req: Request, res:Response){
    const id = req.params.idPosee
    const updatePosee: Posee = req.body;
    const conn = await connect()
    await conn.query('UPDATE Posee set ? WHERE idPosee = ?', [updatePosee, id])
    return res.json({
        message:'Posee UPDATED'
    })
}