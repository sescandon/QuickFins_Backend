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
exports.updateViviendaEnVenta = exports.deleteViviendaEnVenta = exports.getViviendaEnVenta = exports.createViviendaEnVenta = exports.getViviendasEnVenta = void 0;
const database_1 = require("../database");
function getViviendasEnVenta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const viviendasEnVenta = yield conn.query('SELECT * FROM ViviendaEnVenta');
        return res.json(viviendasEnVenta[0]);
    });
}
exports.getViviendasEnVenta = getViviendasEnVenta;
function createViviendaEnVenta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newViviendaEnVenta = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('INSERT INTO ViviendaEnVenta SET ?', [newViviendaEnVenta]);
        return res.json({
            message: 'ViviendaEnVenta Created'
        });
    });
}
exports.createViviendaEnVenta = createViviendaEnVenta;
function getViviendaEnVenta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idVenta;
        const conn = yield (0, database_1.connect)();
        const viviendaEnVenta = yield conn.query('SELECT * FROM ViviendaEnVenta WHERE idVenta = ?', [id]);
        return res.json(viviendaEnVenta[0]);
    });
}
exports.getViviendaEnVenta = getViviendaEnVenta;
function deleteViviendaEnVenta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idVenta;
        const conn = yield (0, database_1.connect)();
        yield conn.query('DELETE FROM ViviendaEnVenta WHERE idVenta = ?', [id]);
        return res.json({
            message: 'ViviendaEnVenta Deleted'
        });
    });
}
exports.deleteViviendaEnVenta = deleteViviendaEnVenta;
function updateViviendaEnVenta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idVenta;
        const updatedViviendaEnVenta = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE ViviendaEnVenta SET ? WHERE idVenta = ?', [updatedViviendaEnVenta, id]);
        return res.json({
            message: 'ViviendaEnVenta Updated'
        });
    });
}
exports.updateViviendaEnVenta = updateViviendaEnVenta;
