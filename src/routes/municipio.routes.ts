import { Router } from "express"

const router = Router()

import { getMunicipios, createMunicipio, getMunicipio, deleteMunicipio, updateMunicipio,  } from "../controllers/municipio.controller";

router.route('/')
    .get(getMunicipios)
    .post(createMunicipio)

router.route('/:idMunicipio')
    .get(getMunicipio)
    .delete(deleteMunicipio)
    .put(updateMunicipio)


export default router