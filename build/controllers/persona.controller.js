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
exports.updatePersona = exports.deletePersona = exports.getPersona = exports.createPersona = exports.getPersonas = void 0;
const database_1 = require("../database");
function getPersonas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const personas = yield conn.query('SELECT * FROM Persona');
        return res.json(personas[0]);
    });
}
exports.getPersonas = getPersonas;
function createPersona(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPersona = req.body;
        const conn = yield (0, database_1.connect)();
        conn.query('INSERT INTO Persona SET ?', [newPersona]);
        return res.json({
            message: 'Persona Created'
        });
    });
}
exports.createPersona = createPersona;
function getPersona(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idPersona;
        const conn = yield (0, database_1.connect)();
        const persona = yield conn.query('SELECT * FROM Persona WHERE idPersona = ?', [id]);
        return res.json(persona[0]);
    });
}
exports.getPersona = getPersona;
function deletePersona(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idPersona;
        const conn = yield (0, database_1.connect)();
        yield conn.query('DELETE FROM Persona WHERE idPersona = ?', [id]);
        return res.json({
            message: 'Persona Deleted'
        });
    });
}
exports.deletePersona = deletePersona;
function updatePersona(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idPersona;
        const updatedPersona = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE Persona SET ? WHERE idPersona = ?', [updatedPersona, id]);
        return res.json({
            message: 'Persona Updated'
        });
    });
}
exports.updatePersona = updatePersona;
