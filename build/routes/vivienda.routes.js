"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const vivienda_controller_1 = require("../controllers/vivienda.controller");
router.route('/')
    .get(vivienda_controller_1.getViviendas)
    .post(vivienda_controller_1.createVivienda);
router.route('/:id_vivienda')
    .get(vivienda_controller_1.getViviendaDetails)
    .delete(vivienda_controller_1.deleteVivienda)
    .put(vivienda_controller_1.updateVivienda);
exports.default = router;
