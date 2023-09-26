import {Request, Response  } from "express"
import { connect } from "../database"
import { Dependiente } from "../interface/dependiente.interface"

export async function getDepartamentos(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const dependientes = await conn.query('SELECT * FROM departamento')
    return res.json(dependientes[0])
}