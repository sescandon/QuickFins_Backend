import {Request, Response  } from "express"
import { connect } from "../database"
import { Dependiente } from "../interface/dependiente.interface"

export async function getDependientes(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const dependientes = await conn.query('SELECT * FROM Dependiente')
    return res.json(dependientes[0])
}

export async function createDependiente(req: Request, res: Response) {
    const newPost: Dependiente = req.body
    const conn = await connect()
    conn.query('INSERT INTO Dependiente SET?',[newPost])
    return res.json({
        message:'Dependiente CREATED'
    })
}

export async function getDependiente(req: Request, res:Response): Promise<Response>{
    const id = req.params.idDependiente
    const conn = await connect()
    const Dependiente = await conn.query('SELECT * FROM Dependiente WHERE idDependiente = ?', [id])
    return res.json(Dependiente[0])
}

export async function deleteDependiente(req: Request, res: Response) {
    const id = req.params.idDependiente;
    const conn = await connect();

    try {
        await conn.query('DELETE FROM Dependiente WHERE idDependiente = ?', [id]);
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
    const id = req.params.idDependiente
    const updateDependiente: Dependiente = req.body;
    const conn = await connect()
    await conn.query('UPDATE Dependiente set ? WHERE idDependiente = ?', [updateDependiente, id])
    return res.json({
        message:'Dependiente UPDATED'
    })
}