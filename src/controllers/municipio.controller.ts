import { Request, Response } from "express"
import {connect} from '../database'
import { municipio } from "../interface/municipio.interface";

export async function getMunicipios(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const posts = await conn.query('SELECT * FROM municipio')
    return res.json(posts[0])
}

export async function createMunicipio(req: Request, res: Response) {
    const newPost: municipio = req.body
    const conn = await connect()
    conn.query('INSERT INTO municipio SET?',[newPost])
    return res.json({
        message:'POST CREATED'
    })
}

export async function getMunicipio(req: Request, res:Response): Promise<Response>{
    const id = req.params.id_municipio
    const conn = await connect()
    const municipio = await conn.query('SELECT * FROM municipio WHERE id_municipio = ?', [id])
    return res.json(municipio[0])
}

export async function deleteMunicipio(req: Request, res: Response) {
    const id = req.params.id_municipio;
    const conn = await connect();

    try {
        await conn.query('DELETE FROM vivienda_en_venta WHERE vivienda_id_vivienda IN (SELECT id_vivienda FROM vivienda WHERE municipio_id_municipio = ?)', [id]);
        
        await conn.query('DELETE FROM vivienda WHERE municipio_id_municipio = ?', [id]);

        await conn.query('DELETE FROM municipio WHERE id_municipio = ?', [id]);
        
        return res.json({
            message:'municipio DELETED'
        });
    } catch (error) {
        console.error(error);  //
        return res.status(500).json({
            message: 'Error Deleting municipio',
            error
        });
    }
}




export async function updateMunicipio (req: Request, res:Response){
    const id = req.params.id_municipio
    const updatemunicipio: municipio = req.body;
    const conn = await connect()
    await conn.query('UPDATE municipio set ? WHERE id_municipio = ?', [updatemunicipio, id])
    return res.json({
        message:'POST UPDATED'
    })
}

export async function getMunicipioDetails(req: Request, res: Response): Promise<Response> {
    const id = req.params.id_municipio;  // 
    const conn = await connect();
    const query = `
    SELECT 
        m.id_municipio,
        m.area,
        m.presupuesto,
        (SELECT persona_id_cedula FROM gobierna WHERE departamento_id_departamento = m.departamento_id_departamento LIMIT 1) AS 'id_gobernante',
        (SELECT nombre FROM persona WHERE id_cedula = (SELECT persona_id_cedula FROM gobierna WHERE departamento_id_departamento = m.departamento_id_departamento LIMIT 1)) AS 'nombre_gobernante',
        (SELECT telefono FROM persona WHERE id_cedula = (SELECT persona_id_cedula FROM gobierna WHERE departamento_id_departamento = m.departamento_id_departamento LIMIT 1)) AS 'telefono',
        (SELECT GROUP_CONCAT(id_vivienda) FROM vivienda WHERE municipio_id_municipio = m.id_municipio) AS 'ids_vivienda',
        (SELECT GROUP_CONCAT(direccion) FROM vivienda WHERE municipio_id_municipio = m.id_municipio) AS 'direcciones',
        (SELECT GROUP_CONCAT(area) FROM vivienda WHERE municipio_id_municipio = m.id_municipio) AS 'areas_vivienda',
        (SELECT GROUP_CONCAT(persona_id_cedula) FROM habita WHERE vivienda_id_vivienda IN (SELECT id_vivienda FROM vivienda WHERE municipio_id_municipio = m.id_municipio)) AS 'id_habitantes',
        (SELECT GROUP_CONCAT(nombre) FROM persona WHERE id_cedula IN (SELECT persona_id_cedula FROM habita WHERE vivienda_id_vivienda IN (SELECT id_vivienda FROM vivienda WHERE municipio_id_municipio = m.id_municipio))) AS 'nombres_habitantes',
        (SELECT GROUP_CONCAT(telefono) FROM persona WHERE id_cedula IN (SELECT persona_id_cedula FROM habita WHERE vivienda_id_vivienda IN (SELECT id_vivienda FROM vivienda WHERE municipio_id_municipio = m.id_municipio))) AS 'telefonos_habitantes'
    FROM municipio m
    WHERE m.id_municipio = ?;
    `;
    const municipioDetails = await conn.query(query, [id]);
    return res.json(municipioDetails[0]);
}