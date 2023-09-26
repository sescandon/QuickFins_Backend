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
    const id = req.params.id_persona;
    const conn = await connect();
    const persona = await conn.query('SELECT * FROM persona WHERE id_cedula = ?', [id]);
    return res.json(persona[0]);
}

export async function deletePersona(req: Request, res: Response) {
    const id = req.params.id_persona;
    const conn = await connect();
    
    try {
        // Primero eliminar registros en tablas Dependiente, Habita, Posee y ViviendaEnVenta que están relacionados con esta Persona
        await conn.query('DELETE FROM dependiente WHERE persona_id_cedula = ?', [id]);
        await conn.query('DELETE FROM habita WHERE persona_id_cedula = ?', [id]);
        await conn.query('DELETE FROM posee WHERE persona_id_cedula = ?', [id]);
        await conn.query('DELETE FROM vivienda_en_venta WHERE persona_id_cedula = ?', [id]); 
        await conn.query('DELETE FROM gobierna WHERE persona_id_cedula = ?', [id]);

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
    const id = req.params.id_persona;
    const updatedPersona: Persona = req.body;
    const conn = await connect();
    await conn.query('UPDATE persona SET ? WHERE id_cedula = ?', [updatedPersona, id]);
    return res.json({
        message: 'Persona Updated'
    });
}


export async function getPersonaDetails(req: Request, res: Response): Promise<Response> {
    const id = req.params.id_persona;  // 
    const conn = await connect();
    const query = `
    SELECT 
        p.id_cedula,
        p.edad,
        p.sexo,
        p.telefono,
        p.fecha_de_nacimiento,
        v.id_vivienda,
        v.direccion,
        v.estrato,
        m.id_municipio,
        m.nombre AS 'nombre_municipio',
        GROUP_CONCAT(DISTINCT CONCAT(vv.id_vivienda, ':', vv.direccion, ':', vv.area) ORDER BY vv.id_vivienda ASC) AS 'ID_Casas:Direcciones:Area',
        GROUP_CONCAT(DISTINCT CONCAT(d.dependiente_id_cedula, ':', dp.nombre, ':', dp.telefono) ORDER BY d.dependiente_id_cedula ASC) AS 'ID_Dependientes:Nombres:Telefonos'
    FROM persona p
    LEFT JOIN posee po ON p.id_cedula = po.persona_id_cedula
    LEFT JOIN vivienda v ON po.vivienda_id_vivienda = v.id_vivienda
    LEFT JOIN municipio m ON v.municipio_id_municipio = m.id_municipio
    LEFT JOIN vivienda vv ON po.vivienda_id_vivienda = vv.id_vivienda
    LEFT JOIN dependiente d ON p.id_cedula = d.persona_id_cedula
    LEFT JOIN persona dp ON d.dependiente_id_cedula = dp.id_cedula
    WHERE p.id_cedula = 3456789012  -- Reemplaza el signo de interrogación con el ID de la persona que estás buscando
    GROUP BY p.id_cedula, v.id_vivienda, m.id_municipio;
    `;
    const personaDetails = await conn.query(query, [id]);
    return res.json(personaDetails[0]);
}