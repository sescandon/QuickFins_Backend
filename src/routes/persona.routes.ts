import { Router } from "express"
import { getPersonas, createPersona, getPersona, deletePersona, updatePersona } from "../controllers/persona.controller";

const router = Router()


router.get("/personas", getPersonas);
router.post("/personas", createPersona);
router.get("/personas/:idPersona", getPersona);
router.delete("/personas/:idPersona", deletePersona);
router.put("/personas/:idPersona", updatePersona);

export default router;