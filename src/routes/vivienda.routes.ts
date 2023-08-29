import { Router } from "express"

const router = Router()

import { getViviendas, createVivienda, getVivienda, deleteVivienda, updateVivienda } from "../controllers/vivienda.controller"

router.route('/')
    .get(getViviendas)
    .post(createVivienda)

router.route('/:idVivienda')
    .get(getVivienda)
    .delete(deleteVivienda)
    .put(updateVivienda)

export default router