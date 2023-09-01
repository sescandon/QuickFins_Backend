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
exports.updateMunicipio = exports.deleteMunicipio = exports.getMunicipio = exports.createMunicipio = exports.getMunicipios = void 0;
const database_1 = require("../database");
function getMunicipios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const posts = yield conn.query('SELECT * FROM Municipio');
        return res.json(posts[0]);
    });
}
exports.getMunicipios = getMunicipios;
function createMunicipio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        conn.query('INSERT INTO Municipio SET?', [newPost]);
        return res.json({
            message: 'POST CREATED'
        });
    });
}
exports.createMunicipio = createMunicipio;
function getMunicipio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idMunicipio;
        const conn = yield (0, database_1.connect)();
        const municipio = yield conn.query('SELECT * FROM Municipio WHERE idMunicipio = ?', [id]);
        return res.json(municipio[0]);
    });
}
exports.getMunicipio = getMunicipio;
function deleteMunicipio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idMunicipio;
        const conn = yield (0, database_1.connect)();
        try {
            // Delete records from ViviendaEnVenta related to this Municipio
            yield conn.query('DELETE FROM ViviendaEnVenta WHERE idVivienda IN (SELECT idVivienda FROM Vivienda WHERE idMunicipio = ?)', [id]);
            // Delete other related records
            yield conn.query('DELETE FROM Posee WHERE idPersona IN (SELECT idPersona FROM Persona WHERE idMunicipio = ?)', [id]);
            yield conn.query('DELETE FROM Habita WHERE idPersona IN (SELECT idPersona FROM Persona WHERE idMunicipio = ?)', [id]);
            yield conn.query('DELETE FROM Dependiente WHERE idPersona IN (SELECT idPersona FROM Persona WHERE idMunicipio = ?)', [id]);
            yield conn.query('DELETE FROM Vivienda WHERE idMunicipio = ?', [id]);
            yield conn.query('DELETE FROM Persona WHERE idMunicipio = ?', [id]);
            // Finally, delete from Municipio table itself
            yield conn.query('DELETE FROM Municipio WHERE idMunicipio = ?', [id]);
            return res.json({
                message: 'MUNICIPIO DELETED'
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Error Deleting Municipio',
                error
            });
        }
    });
}
exports.deleteMunicipio = deleteMunicipio;
function updateMunicipio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idMunicipio;
        const updateMunicipio = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE Municipio set ? WHERE idMunicipio = ?', [updateMunicipio, id]);
        return res.json({
            message: 'POST UPDATED'
        });
    });
}
exports.updateMunicipio = updateMunicipio;
