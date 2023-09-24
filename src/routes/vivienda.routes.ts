import { Router } from "express"

const router = Router()

import { getViviendas, createVivienda, getVivienda, deleteVivienda, updateVivienda,getViviendaDetails } from "../controllers/vivienda.controller"

router.route('/')
    .get(getViviendas)
    .post(createVivienda)

router.route('/:id_vivienda')
    .get(getViviendaDetails)
    .delete(deleteVivienda)
    .put(updateVivienda)

export default router