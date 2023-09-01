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
exports.updateHabita = exports.deleteHabita = exports.getHabita = exports.createHabita = exports.getHabitas = void 0;
const database_1 = require("../database");
function getHabitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const habitas = yield conn.query('SELECT * FROM Habita');
        return res.json(habitas[0]);
    });
}
exports.getHabitas = getHabitas;
function createHabita(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        conn.query('INSERT INTO Habita SET?', [newPost]);
        return res.json({
            message: 'Habita CREATED'
        });
    });
}
exports.createHabita = createHabita;
function getHabita(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idHabita;
        const conn = yield (0, database_1.connect)();
        const Habita = yield conn.query('SELECT * FROM Habita WHERE idHabita = ?', [id]);
        return res.json(Habita[0]);
    });
}
exports.getHabita = getHabita;
function deleteHabita(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idHabita;
        const conn = yield (0, database_1.connect)();
        yield conn.query('DELETE FROM Habita WHERE idHabita = ?', [id]);
        return res.json({
            message: 'Habita DELETED'
        });
    });
}
exports.deleteHabita = deleteHabita;
function updateHabita(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idHabita;
        const updateHabita = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE Habita set ? WHERE idHabita = ?', [updateHabita, id]);
        return res.json({
            message: 'Habita UPDATED'
        });
    });
}
exports.updateHabita = updateHabita;
