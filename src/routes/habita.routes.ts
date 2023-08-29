import { Router } from "express"

const router = Router()

import { getHabitas, createHabita, getHabita, deleteHabita, updateHabita } from "../controllers/habita.controller"

router.route('/')
    .get(getHabitas)
    .post(createHabita)

router.route('/:idHabita')
    .get(getHabita)
    .delete(deleteHabita)
    .put(updateHabita)

export default router