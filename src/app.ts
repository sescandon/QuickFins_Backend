import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors';

//Routes
import IndexRoutes from './routes/index.routes'
import MunicipioRoutes from './routes/municipio.routes'
import PersonaRoutes from './routes/persona.routes'
import ViviendaRoutes from './routes/vivienda.routes'
import PoseeRoutes from './routes/posee.routes'
import DependienteRoutes from "./routes/dependiente.routes";
import ViviendaEnVentaRoutes from "./routes/viviendaEnVenta.routes";


export class App {
    private app: Application

    constructor(private port?: number | string) {
        this.app = express()
        this.settings()
        this.useCors()
        this.middlewares()
        this.routes()
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    middlewares() {
        this.app.use(morgan('dev'))
        this.app.use(express.json())
    }

    routes() {
        this.app.use(IndexRoutes)
        this.app.use('/municipios', MunicipioRoutes)
        this.app.use('/personas', PersonaRoutes)
        this.app.use('/viviendas', ViviendaRoutes)
        this.app.use('/posee', PoseeRoutes)
        this.app.use('/dependiente', DependienteRoutes)
        this.app.use('/viviendaEnVenta', ViviendaEnVentaRoutes)
    }

    useCors() {
        this.app.use(cors({
            origin: '*',
        }));
        console.log('Cors available!')
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log('Sever on port', this.app.get('port'))
    }

}