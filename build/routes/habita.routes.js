"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const habita_controller_1 = require("../controllers/habita.controller");
router.route('/')
    .get(habita_controller_1.getHabitas)
    .post(habita_controller_1.createHabita);
router.route('/:idHabita')
    .get(habita_controller_1.getHabita)
    .delete(habita_controller_1.deleteHabita)
    .put(habita_controller_1.updateHabita);
exports.default = router;
