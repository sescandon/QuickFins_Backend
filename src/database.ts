import { createPool } from 'mysql2/promise'

export async function connect(){

    const connection = await createPool({
        host: '107.178.210.83',
        port: 3306,
        user: 'root',
        password: '1JyxpHaG25',
        database: 'mydb',
        connectionLimit: 10
    })

    return connection
}