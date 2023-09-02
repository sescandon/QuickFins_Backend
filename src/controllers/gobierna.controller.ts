import { Request, Response } from "express";
import { connect } from "../database";
import { Gobierna } from "../interface/gobierna.interface";

export async function getGobiernas(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const gobiernas = await conn.query('SELECT * FROM Gobierna');
    return res.json(gobiernas[0]);
}

export async function createGobierna(req: Request, res: Response) {
    const newGobierna: Gobierna = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO Gobierna SET ?', [newGobierna]);
    return res.json({
        message: 'Gobierna CREATED'
    });
}

export async function getGobierna(req: Request, res: Response): Promise<Response> {
    const id = req.params.Persona_idPersona;
    const conn = await connect();
    const gobierna = await conn.query('SELECT * FROM Gobierna WHERE Persona_idPersona = ?', [id]);
    return res.json(gobierna[0]);
}

export async function deleteGobierna(req: Request, res: Response) {
    const id = req.params.Persona_idPersona;
    const conn = await connect();
    await conn.query('DELETE FROM Gobierna WHERE Persona_idPersona = ?', [id]);
    return res.json({
        message: 'Gobierna DELETED'
    });
}

export async function updateGobierna(req: Request, res: Response) {
    const id = req.params.Persona_idPersona;
    const updatedGobierna: Gobierna = req.body;
    const conn = await connect();
    await conn.query('UPDATE Gobierna SET ? WHERE Persona_idPersona = ?', [updatedGobierna, id]);
    return res.json({
        message: 'Gobierna UPDATED'
    });
}
