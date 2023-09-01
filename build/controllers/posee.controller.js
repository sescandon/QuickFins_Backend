"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePosee = exports.deletePosee = exports.getPosee = exports.createPosee = exports.getPosees = void 0;
const database_1 = require("../database");
function getPosees(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const posees = yield conn.query('SELECT * FROM Posee');
        return res.json(posees[0]);
    });
}
exports.getPosees = getPosees;
function createPosee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        conn.query('INSERT INTO Posee SET?', [newPost]);
        return res.json({
            message: 'Posee CREATED'
        });
    });
}
exports.createPosee = createPosee;
function getPosee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idPosee;
        const conn = yield (0, database_1.connect)();
        const Posee = yield conn.query('SELECT * FROM Posee WHERE idPosee = ?', [id]);
        return res.json(Posee[0]);
    });
}
exports.getPosee = getPosee;
function deletePosee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idPosee;
        const conn = yield (0, database_1.connect)();
        yield conn.query('DELETE FROM Posee WHERE idPosee = ?', [id]);
        return res.json({
            message: 'Posee DELETED'
        });
    });
}
exports.deletePosee = deletePosee;
function updatePosee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idPosee;
        const updatePosee = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE Posee set ? WHERE idPosee = ?', [updatePosee, id]);
        return res.json({
            message: 'Posee UPDATED'
        });
    });
}
exports.updatePosee = updatePosee;
