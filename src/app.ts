import express, { Application } from 'express'
import morgan from 'morgan'

//Routes
import IndexRoutes from './routes/index.routes'
import MunicipioRoutes from './routes/municipio.routes'


export class App {
    private app: Application

    constructor(private port?: number | string){
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    middlewares(){
        this.app.use(morgan('dev'))
        this.app.use(express.json())
    }

    routes(){
        this.app.use(IndexRoutes)
        this.app.use('/posts',MunicipioRoutes)
    }

    async listen(){
        await this.app.listen(this.app.get('port'))
        console.log('Sever on port', this.app.get('port'))
    }

}