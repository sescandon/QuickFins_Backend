"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const gobierna_controller_1 = require("../controllers/gobierna.controller");
router.route('/')
    .get(gobierna_controller_1.getGobiernas)
    .post(gobierna_controller_1.createGobierna);
router.route('/:Persona_idPersona')
    .get(gobierna_controller_1.getGobierna)
    .delete(gobierna_controller_1.deleteGobierna)
    .put(gobierna_controller_1.updateGobierna);
exports.default = router;
