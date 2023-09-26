import { Router } from "express"
import { getDepartamentos } from "../controllers/departamento.controller"

const router = Router()


router.route('/')
    .get(getDepartamentos)

export default router