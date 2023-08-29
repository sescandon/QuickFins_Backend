import { Request, Response } from "express";
import { connect } from '../database';
import { Persona } from "../interface/persona.interface";  // Assume you have a Persona interface

export async function getPersonas(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const personas = await conn.query('SELECT * FROM Persona');
    return res.json(personas[0]);
}

export async function createPersona(req: Request, res: Response) {
    const newPersona: Persona = req.body;
    const conn = await connect();
    conn.query('INSERT INTO Persona SET ?', [newPersona]);
    return res.json({
        message: 'Persona Created'
    });
}

export async function getPersona(req: Request, res: Response): Promise<Response> {
    const id = req.params.idPersona;
    const conn = await connect();
    const persona = await conn.query('SELECT * FROM Persona WHERE idPersona = ?', [id]);
    return res.json(persona[0]);
}

export async function deletePersona(req: Request, res: Response) {
    const id = req.params.idPersona;
    const conn = await connect();
    await conn.query('DELETE FROM Persona WHERE idPersona = ?', [id]);
    return res.json({
        message: 'Persona Deleted'
    });
}

export async function updatePersona(req: Request, res: Response) {
    const id = req.params.idPersona;
    const updatedPersona: Persona = req.body;
    const conn = await connect();
    await conn.query('UPDATE Persona SET ? WHERE idPersona = ?', [updatedPersona, id]);
    return res.json({
        message: 'Persona Updated'
    });
}
