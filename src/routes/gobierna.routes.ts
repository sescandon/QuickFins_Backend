import { Router } from "express"

const router = Router()

import { getGobiernas, createGobierna, getGobierna, deleteGobierna, updateGobierna } from "../controllers/gobierna.controller"

router.route('/')
    .get(getGobiernas)
    .post(createGobierna)

router.route('/:Persona_idPersona')
    .get(getGobierna)
    .delete(deleteGobierna)
    .put(updateGobierna)

export default router
