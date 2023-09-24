import { Request, Response } from "express";
import { connect } from '../database';
import { ViviendaEnVenta } from "../interface/viviendaEnVenta.interface";

export async function getViviendasEnVenta(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const viviendasEnVenta = await conn.query('SELECT * FROM vivienda_en_venta');
    return res.json(viviendasEnVenta[0]);
}

export async function createViviendaEnVenta(req: Request, res: Response) {
    const newViviendaEnVenta: ViviendaEnVenta = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO vivienda_en_venta SET ?', [newViviendaEnVenta]);
    return res.json({
        message: 'ViviendaEnVenta Created'
    });
}

export async function getViviendaEnVenta(req: Request, res: Response): Promise<Response> {
    const id = req.params.id_venta;
    const conn = await connect();
    const viviendaEnVenta = await conn.query('SELECT * FROM vivienda_en_venta WHERE id_venta = ?', [id]);
    return res.json(viviendaEnVenta[0]);
}

export async function deleteViviendaEnVenta(req: Request, res: Response) {
    const id = req.params.id_venta;
    const conn = await connect();
    await conn.query('DELETE FROM vivienda_en_venta WHERE id_venta = ?', [id]);
    return res.json({
        message: 'ViviendaEnVenta Deleted'
    });
}

export async function updateViviendaEnVenta(req: Request, res: Response) {
    const id = req.params.id_venta;
    const updatedViviendaEnVenta: ViviendaEnVenta = req.body;
    const conn = await connect();
    await conn.query('UPDATE vivienda_en_venta SET ? WHERE id_venta = ?', [updatedViviendaEnVenta, id]);
    return res.json({
        message: 'ViviendaEnVenta Updated'
    });
}
