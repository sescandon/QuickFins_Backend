import { Request, Response } from "express";
import { connect } from '../database';
import { Persona } from "../interface/persona.interface";  // Assume you have a Persona interface

export async function getPersonas(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const personas = await conn.query('SELECT * FROM persona');
    return res.json(personas[0]);
}

export async function createPersona(req: Request, res: Response) {
    const newPersona: Persona = req.body;
    const conn = await connect();
    conn.query('INSERT INTO persona SET ?', [newPersona]);
    return res.json({
        message: 'Persona Created'
    });
}

export async function getPersona(req: Request, res: Response): Promise<Response> {
    const id = req.params.idPersona;
    const conn = await connect();
    const persona = await conn.query('SELECT * FROM persona WHERE id_cedula = ?', [id]);
    return res.json(persona[0]);
}

export async function deletePersona(req: Request, res: Response) {
    const id = req.params.idPersona;
    const conn = await connect();
    
    try {
        // Primero eliminar registros en tablas Dependiente, Habita, Posee y ViviendaEnVenta que están relacionados con esta Persona
        await conn.query('DELETE FROM Dependiente WHERE id_cedula = ?', [id]);
        await conn.query('DELETE FROM Habita WHERE id_cedula = ?', [id]);
        await conn.query('DELETE FROM Posee WHERE id_cedula = ?', [id]);
        await conn.query('DELETE FROM ViviendaEnVenta WHERE idVivienda = ?', [id]);  // Añadido

        // Ahora puedes eliminar de la tabla Persona
        await conn.query('DELETE FROM persona WHERE id_cedula = ?', [id]);
        
        return res.json({
            message: 'Persona Deleted'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Deleting Persona',
            error
        });
    }
}



export async function updatePersona(req: Request, res: Response) {
    const id = req.params.idPersona;
    const updatedPersona: Persona = req.body;
    const conn = await connect();
    await conn.query('UPDATE persona SET ? WHERE id_cedula = ?', [updatedPersona, id]);
    return res.json({
        message: 'Persona Updated'
    });
}


export async function getPersonaDetails(req: Request, res: Response): Promise<Response> {
    const id = req.params.idPersona;  // 
    const conn = await connect();
    const query = `
        SELECT 
            p.id_cedula,
            p.nombre,
            CASE
                WHEN g.persona_id_cedula IS NOT NULL THEN 'Sí'
                ELSE 'No'
            END AS 'Es Gobernante',
            GROUP_CONCAT(d2.nombre) AS 'Nombres de los Dependientes',
            GROUP_CONCAT(v.direccion) AS 'Direcciones de Casas Poseídas'
        FROM persona p
        LEFT JOIN dependiente d ON p.id_cedula = d.persona_id_cedula
        LEFT JOIN persona d2 ON d.dependiente_id_cedula = d2.id_cedula
        LEFT JOIN gobierna g ON p.id_cedula = g.persona_id_cedula
        LEFT JOIN posee po ON p.id_cedula = po.persona_id_cedula
        LEFT JOIN vivienda v ON po.vivienda_id_vivienda = v.id_vivienda
        WHERE p.id_cedula = ?
        GROUP BY p.id_cedula
    `;
    const personaDetails = await conn.query(query, [id]);
    return res.json(personaDetails[0]);
}