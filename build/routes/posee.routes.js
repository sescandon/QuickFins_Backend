"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const posee_controller_1 = require("../controllers/posee.controller");
router.route('/')
    .get(posee_controller_1.getPosees)
    .post(posee_controller_1.createPosee);
router.route('/:idPosee')
    .get(posee_controller_1.getPosee)
    .delete(posee_controller_1.deletePosee)
    .put(posee_controller_1.updatePosee);
exports.default = router;
