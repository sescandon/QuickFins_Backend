import {Request, Response  } from "express"
import { connect } from "../database"
import { Dependiente } from "../interface/dependiente.interface"

export async function getDependientes(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const dependientes = await conn.query('SELECT * FROM dependiente')
    return res.json(dependientes[0])
}

export async function createDependiente(req: Request, res: Response) {
    const newPost: Dependiente = req.body
    const conn = await connect()
    conn.query('INSERT INTO dependiente SET?',[newPost])
    return res.json({
        message:'Dependiente CREATED'
    })
}

export async function getDependiente(req: Request, res:Response): Promise<Response>{
    const id = req.params.persona_id_cedula
    const conn = await connect()
    const Dependiente = await conn.query('SELECT * FROM dependiente WHERE persona_id_cedula = ?', [id])
    return res.json(Dependiente[0])
}

export async function deleteDependiente(req: Request, res: Response) {
    const id = req.params.persona_id_cedula;
    const conn = await connect();

    try {
        await conn.query('DELETE FROM dependiente WHERE persona_id_cedula_cabeza = ?', [id]);
        return res.json({
            message: 'Dependiente DELETED'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Deleting Dependiente',
            error
        });
    }
}


export async function updateDependiente (req: Request, res:Response){
    const id = req.params.dependiente_id_cedula
    const updateDependiente: Dependiente = req.body;
    const conn = await connect()
    await conn.query('UPDATE dependiente set ? WHERE persona_id_cedula = ?', [updateDependiente, id])
    return res.json({
        message:'Dependiente UPDATED'
    })
}