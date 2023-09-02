import { Router } from "express"
import { getPersonas, createPersona, getPersona, deletePersona, updatePersona } from "../controllers/persona.controller";

const router = Router()

router.route('/')
    .get(getPersonas)
    .post(createPersona)

router.route('/:idPersona')
    .get(getPersona)
    .delete(deletePersona)
    .put(updatePersona)

export default router;