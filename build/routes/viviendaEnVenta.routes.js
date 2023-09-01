"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const viviendaEnVenta_controller_1 = require("../controllers/viviendaEnVenta.controller");
router.route('/')
    .get(viviendaEnVenta_controller_1.getViviendasEnVenta)
    .post(viviendaEnVenta_controller_1.createViviendaEnVenta);
router.route('/:idVenta')
    .get(viviendaEnVenta_controller_1.getViviendaEnVenta)
    .delete(viviendaEnVenta_controller_1.deleteViviendaEnVenta)
    .put(viviendaEnVenta_controller_1.updateViviendaEnVenta);
exports.default = router;
