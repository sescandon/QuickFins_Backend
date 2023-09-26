"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamento_controller_1 = require("../controllers/departamento.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(departamento_controller_1.getDepartamentos);
exports.default = router;
