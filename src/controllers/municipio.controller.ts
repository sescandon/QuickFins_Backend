import { Request, Response } from "express"
import {connect} from '../database'
import { Municipio } from "../interface/municipio.interface";

export async function getMunicipios(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const posts = await conn.query('SELECT * FROM Municipio')
    return res.json(posts[0])
}

export async function createMunicipio(req: Request, res: Response) {
    const newPost: Municipio = req.body
    const conn = await connect()
    conn.query('INSERT INTO Municipio SET?',[newPost])
    return res.json({
        message:'POST CREATED'
    })
}

export async function getMunicipio(req: Request, res:Response): Promise<Response>{
    const id = req.params.idMunicipio
    const conn = await connect()
    const municipio = await conn.query('SELECT * FROM Municipio WHERE idMunicipio = ?', [id])
    return res.json(municipio[0])
}

export async function deleteMunicipio(req: Request, res:Response) {
    const id = req.params.idMunicipio;
    const conn = await connect();

    try {
        // Primero eliminar registros en tablas Persona y Vivienda que están relacionados con este Municipio
        await conn.query('DELETE FROM Persona WHERE idMunicipio = ?', [id]);
        await conn.query('DELETE FROM Vivienda WHERE idMunicipio = ?', [id]);

        // Ahora puedes eliminar de la tabla Municipio
        await conn.query('DELETE FROM Municipio WHERE idMunicipio = ?', [id]);

        return res.json({
            message:'MUNICIPIO DELETED'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Deleting Municipio',
            error
        });
    }
}


export async function updateMunicipio (req: Request, res:Response){
    const id = req.params.idMunicipio
    const updateMunicipio: Municipio = req.body;
    const conn = await connect()
    await conn.query('UPDATE Municipio set ? WHERE idMunicipio = ?', [updateMunicipio, id])
    return res.json({
        message:'POST UPDATED'
    })
}