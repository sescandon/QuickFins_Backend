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
        yield conn.query('DELETE FROM Municipio WHERE idMunicipio = ?', [id]);
        return res.json({
            message: 'POST DELETED'
        });
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
