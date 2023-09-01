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
exports.updateVivienda = exports.deleteVivienda = exports.getVivienda = exports.createVivienda = exports.getViviendas = void 0;
const database_1 = require("../database");
function getViviendas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const viviendas = yield conn.query('SELECT * FROM Vivienda');
        return res.json(viviendas[0]);
    });
}
exports.getViviendas = getViviendas;
function createVivienda(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        conn.query('INSERT INTO Vivienda SET?', [newPost]);
        return res.json({
            message: 'VIVIENDA CREATED'
        });
    });
}
exports.createVivienda = createVivienda;
function getVivienda(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idVivienda;
        const conn = yield (0, database_1.connect)();
        const Vivienda = yield conn.query('SELECT * FROM Vivienda WHERE idVivienda = ?', [id]);
        return res.json(Vivienda[0]);
    });
}
exports.getVivienda = getVivienda;
function deleteVivienda(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idVivienda;
        const conn = yield (0, database_1.connect)();
        try {
            // Primero eliminar registros en tablas Habita y Posee que están relacionados con esta Vivienda
            yield conn.query('DELETE FROM Habita WHERE idVivienda = ?', [id]);
            yield conn.query('DELETE FROM Posee WHERE idVivienda = ?', [id]);
            // Ahora puedes eliminar de la tabla Vivienda
            yield conn.query('DELETE FROM Vivienda WHERE idVivienda = ?', [id]);
            return res.json({
                message: 'VIVIENDA DELETED'
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Error Deleting Vivienda',
                error
            });
        }
    });
}
exports.deleteVivienda = deleteVivienda;
function updateVivienda(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idVivienda;
        const updateVivienda = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE Vivienda set ? WHERE idVivienda = ?', [updateVivienda, id]);
        return res.json({
            message: 'VIVIENDA UPDATED'
        });
    });
}
exports.updateVivienda = updateVivienda;
