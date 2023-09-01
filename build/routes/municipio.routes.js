"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const municipio_controller_1 = require("../controllers/municipio.controller");
router.route('/')
    .get(municipio_controller_1.getMunicipios)
    .post(municipio_controller_1.createMunicipio);
router.route('/:idMunicipio')
    .get(municipio_controller_1.getMunicipio)
    .delete(municipio_controller_1.deleteMunicipio)
    .put(municipio_controller_1.updateMunicipio);
exports.default = router;
