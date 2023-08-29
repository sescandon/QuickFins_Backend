import { Router } from "express"

const router = Router()

import { getDependientes, createDependiente, getDependiente, deleteDependiente, updateDependiente } from "../controllers/dependiente.controller"

router.route('/')
    .get(getDependientes)
    .post(createDependiente)

router.route('/:idDependiente')
    .get(getDependiente)
    .delete(deleteDependiente)
    .put(updateDependiente)

export default router