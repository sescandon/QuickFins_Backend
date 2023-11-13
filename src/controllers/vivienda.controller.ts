import {Request, Response  } from "express"
import { connect } from "../database"
import { Vivienda } from "../interface/vivienda.interface"

export async function getViviendas(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const viviendas = await conn.query('SELECT * FROM vivienda')
    return res.json(viviendas[0])
}

export async function createVivienda(req: Request, res: Response) {
    const newPost: Vivienda = req.body
    const conn = await connect()
    conn.query('INSERT INTO vivienda SET?',[newPost])
    return res.json({
        message:'VIVIENDA CREATED'
    })
}

export async function getVivienda(req: Request, res:Response): Promise<Response>{
    const id = req.params.id_vivienda
    const conn = await connect()
    const Vivienda = await conn.query('SELECT * FROM vivienda WHERE id_vivienda = ?', [id])
    return res.json(Vivienda[0])
}

export async function deleteVivienda(req: Request, res:Response) {
    const id = req.params.id_vivienda;
    const conn = await connect();

    try {
        await conn.query('DELETE FROM vivienda_en_venta WHERE vivienda_id_vivienda = ?', [id]);
        await conn.query('DELETE FROM habita WHERE vivienda_id_vivienda = ?', [id]);
        await conn.query('DELETE FROM posee WHERE vivienda_id_vivienda = ?', [id]);
        
        await conn.query('DELETE FROM vivienda WHERE id_vivienda = ?', [id]);

        return res.json({
            message:'VIVIENDA DELETED'
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: 'Error Deleting Vivienda',
            error
        });
    }
}




export async function updateVivienda (req: Request, res:Response){
    const id = req.params.id_vivienda
    
    const updateVivienda: Vivienda = req.body;
    console.log(updateVivienda)
    const conn = await connect()
    await conn.query('UPDATE vivienda set ? WHERE id_vivienda = ?', [updateVivienda, id])
    return res.json({
        message:'VIVIENDA UPDATED'
    })
}


export async function getViviendaDetails(req: Request, res: Response): Promise<Response> {
    const id = req.params.id_vivienda;  
    const conn = await connect();
    const query = `
    SELECT 
        v.id_vivienda,
        v.estrato,
        m.nombre AS 'municipio',
        m.id_municipio,
        (SELECT p.nombre FROM persona p INNER JOIN posee po ON p.id_cedula = po.persona_id_cedula WHERE po.vivienda_id_vivienda = v.id_vivienda) AS 'nombre_propietario',
        (SELECT p.id_cedula FROM persona p INNER JOIN posee po ON p.id_cedula = po.persona_id_cedula WHERE po.vivienda_id_vivienda = v.id_vivienda) AS 'id_propietario',
        m.id_municipio AS 'id_municipio_propietario',
        v.area AS 'area_vivienda',
        v.capacidad,
        v.niveles,
        v.baños,
        (SELECT GROUP_CONCAT(h.persona_id_cedula) FROM habita h WHERE h.vivienda_id_vivienda = v.id_vivienda) AS 'id_residentes',
        (SELECT GROUP_CONCAT(pr.nombre) FROM habita h INNER JOIN persona pr ON h.persona_id_cedula = pr.id_cedula WHERE h.vivienda_id_vivienda = v.id_vivienda) AS 'nombres_residentes',
        (SELECT GROUP_CONCAT(pr.telefono) FROM habita h INNER JOIN persona pr ON h.persona_id_cedula = pr.id_cedula WHERE h.vivienda_id_vivienda = v.id_vivienda) AS 'telefonos_residentes'
    FROM vivienda v
    INNER JOIN municipio m ON v.municipio_id_municipio = m.id_municipio
    WHERE v.id_vivienda = ?  -- Reemplaza el signo de interrogación con el ID de la vivienda que estás buscando
    `;
    const viviendaDetails = await conn.query(query, [id]);
    return res.json(viviendaDetails[0]);
}



