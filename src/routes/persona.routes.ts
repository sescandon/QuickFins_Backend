import { Router } from "express"
import { getPersonas, createPersona, getPersona, deletePersona, updatePersona, getPersonaDetails } from "../controllers/persona.controller";

const router = Router()

router.route('/')
    .get(getPersonas)
    .post(createPersona)

router.route('/:idPersona')
    .delete(deletePersona)
    .put(updatePersona)
    .get(getPersonaDetails)

export default router;