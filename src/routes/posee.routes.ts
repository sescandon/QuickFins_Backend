import { Router } from "express"

const router = Router()

import { getPosees, createPosee, getPosee, deletePosee, updatePosee } from "../controllers/posee.controller"

router.route('/')
    .get(getPosees)
    .post(createPosee)

router.route('/:idPosee')
    .get(getPosee)
    .delete(deletePosee)
    .put(updatePosee)

export default router