import {Request, Response  } from "express"
import { connect } from "../database"
import { Habita } from "../interface/habita.interface"

export async function getHabitas(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const habitas = await conn.query('SELECT * FROM habita')
    return res.json(habitas[0])
}

export async function createHabita(req: Request, res: Response) {
    const newPost: Habita = req.body
    const conn = await connect()
    conn.query('INSERT INTO habita SET?',[newPost])
    return res.json({
        message:'Habita CREATED'
    })
}

export async function getHabita(req: Request, res:Response): Promise<Response>{
    const id = req.params.idHabita
    const conn = await connect()
    const Habita = await conn.query('SELECT * FROM habita WHERE persona_id_cedula = ?', [id])
    return res.json(Habita[0])
}

export async function deleteHabita(req: Request, res: Response) {
    const id = req.params.idHabita;
    const conn = await connect();

    try {
        await conn.query('DELETE FROM habita WHERE persona_id_cedula = ?', [id]);
        return res.json({
            message: 'Habita DELETED'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Deleting Habita',
            error
        });
    }
}


export async function updateHabita (req: Request, res:Response){
    const id = req.params.idHabita
    const updateHabita: Habita = req.body;
    const conn = await connect()
    await conn.query('UPDATE habita set ? WHERE persona_id_cedula = ?', [updateHabita, id])
    return res.json({
        message:'Habita UPDATED'
    })
}