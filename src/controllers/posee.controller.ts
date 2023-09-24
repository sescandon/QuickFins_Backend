import {Request, Response  } from "express"
import { connect } from "../database"
import { Posee } from "../interface/posee.interface"

export async function getPosees(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const posees = await conn.query('SELECT * FROM posee')
    return res.json(posees[0])
}

export async function createPosee(req: Request, res: Response) {
    const newPost: Posee = req.body
    const conn = await connect()
    conn.query('INSERT INTO posee SET?',[newPost])
    return res.json({
        message:'Posee CREATED'
    })
}

export async function getPosee(req: Request, res:Response): Promise<Response>{
    const id = req.params.idPosee
    const conn = await connect()
    const Posee = await conn.query('SELECT * FROM posee WHERE persona_id_cedula = ?', [id])
    return res.json(Posee[0])
}

export async function deletePosee(req: Request, res: Response) {
    const id = req.params.idPosee;
    const conn = await connect();

    try {
        await conn.query('DELETE FROM posee WHERE persona_id_cedula = ?', [id]);
        return res.json({
            message: 'Posee DELETED'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Deleting Posee',
            error
        });
    }
}


export async function updatePosee (req: Request, res:Response){
    const id = req.params.idPosee
    const updatePosee: Posee = req.body;
    const conn = await connect()
    await conn.query('UPDATE posee set ? WHERE persona_id_cedula = ?', [updatePosee, id])
    return res.json({
        message:'Posee UPDATED'
    })
}