import { Request, Response } from "express";
import { connect } from '../database';
import { ViviendaEnVenta } from "../interface/viviendaEnVenta.interface";

export async function getViviendasEnVenta(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const viviendasEnVenta = await conn.query('SELECT * FROM ViviendaEnVenta');
    return res.json(viviendasEnVenta[0]);
}

export async function createViviendaEnVenta(req: Request, res: Response) {
    const newViviendaEnVenta: ViviendaEnVenta = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO ViviendaEnVenta SET ?', [newViviendaEnVenta]);
    return res.json({
        message: 'ViviendaEnVenta Created'
    });
}

export async function getViviendaEnVenta(req: Request, res: Response): Promise<Response> {
    const id = req.params.idVenta;
    const conn = await connect();
    const viviendaEnVenta = await conn.query('SELECT * FROM ViviendaEnVenta WHERE idVenta = ?', [id]);
    return res.json(viviendaEnVenta[0]);
}

export async function deleteViviendaEnVenta(req: Request, res: Response) {
    const id = req.params.idVenta;
    const conn = await connect();
    await conn.query('DELETE FROM ViviendaEnVenta WHERE idVenta = ?', [id]);
    return res.json({
        message: 'ViviendaEnVenta Deleted'
    });
}

export async function updateViviendaEnVenta(req: Request, res: Response) {
    const id = req.params.idVenta;
    const updatedViviendaEnVenta: ViviendaEnVenta = req.body;
    const conn = await connect();
    await conn.query('UPDATE ViviendaEnVenta SET ? WHERE idVenta = ?', [updatedViviendaEnVenta, id]);
    return res.json({
        message: 'ViviendaEnVenta Updated'
    });
}
