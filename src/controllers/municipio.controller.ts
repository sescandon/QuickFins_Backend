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

export async function deleteMunicipio(req: Request, res: Response) {
    const id = req.params.idMunicipio;
    const conn = await connect();

    try {
        // First delete records in ViviendaEnVenta that are related to the Persona rows you plan to delete
        await conn.query('DELETE FROM ViviendaEnVenta WHERE idVivienda IN (SELECT idVivienda FROM Persona WHERE idMunicipio = ?)', [id]);
        
        // Then delete records in Persona that are related to this Municipio
        await conn.query('DELETE FROM Persona WHERE idMunicipio = ?', [id]);

        // Then delete from Vivienda that are related to this Municipio
        await conn.query('DELETE FROM Vivienda WHERE idMunicipio = ?', [id]);
        
        // Finally, delete the Municipio
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