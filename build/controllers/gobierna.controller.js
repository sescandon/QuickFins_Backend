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
exports.updateGobierna = exports.deleteGobierna = exports.getGobierna = exports.createGobierna = exports.getGobiernas = void 0;
const database_1 = require("../database");
function getGobiernas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const gobiernas = yield conn.query('SELECT * FROM gobierna');
        return res.json(gobiernas[0]);
    });
}
exports.getGobiernas = getGobiernas;
function createGobierna(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newGobierna = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('INSERT INTO gobierna SET ?', [newGobierna]);
        return res.json({
            message: 'Gobierna CREATED'
        });
    });
}
exports.createGobierna = createGobierna;
function getGobierna(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.Persona_idPersona;
        const conn = yield (0, database_1.connect)();
        const gobierna = yield conn.query('SELECT * FROM gobierna WHERE persona_id_cedula = ?', [id]);
        return res.json(gobierna[0]);
    });
}
exports.getGobierna = getGobierna;
function deleteGobierna(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.Persona_idPersona;
        const conn = yield (0, database_1.connect)();
        yield conn.query('DELETE FROM gobierna WHERE persona_id_cedula = ?', [id]);
        return res.json({
            message: 'Gobierna DELETED'
        });
    });
}
exports.deleteGobierna = deleteGobierna;
function updateGobierna(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.Persona_idPersona;
        const updatedGobierna = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE gobierna SET ? WHERE persona_id_cedula = ?', [updatedGobierna, id]);
        return res.json({
            message: 'Gobierna UPDATED'
        });
    });
}
exports.updateGobierna = updateGobierna;
