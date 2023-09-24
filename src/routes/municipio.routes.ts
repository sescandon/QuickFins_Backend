import { Router } from "express"

const router = Router()

import { getMunicipios, createMunicipio, getMunicipio, deleteMunicipio, updateMunicipio, getMunicipioDetails  } from "../controllers/municipio.controller";

router.route('/')
    .get(getMunicipios)
    .post(createMunicipio)

router.route('/:id_municipio')
    .get(getMunicipioDetails)
    .delete(deleteMunicipio)
    .put(updateMunicipio)


export default router