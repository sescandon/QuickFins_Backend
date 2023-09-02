"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const dependiente_controller_1 = require("../controllers/dependiente.controller");
router.route('/')
    .get(dependiente_controller_1.getDependientes)
    .post(dependiente_controller_1.createDependiente);
router.route('/:idDependiente')
    .get(dependiente_controller_1.getDependiente)
    .delete(dependiente_controller_1.deleteDependiente)
    .put(dependiente_controller_1.updateDependiente);
exports.default = router;
