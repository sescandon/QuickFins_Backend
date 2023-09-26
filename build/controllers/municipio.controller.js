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
exports.getMunicipioDetails = exports.updateMunicipio = exports.deleteMunicipio = exports.getMunicipio = exports.createMunicipio = exports.getMunicipios = void 0;
const database_1 = require("../database");
function getMunicipios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const posts = yield conn.query('SELECT * FROM municipio');
        return res.json(posts[0]);
    });
}
exports.getMunicipios = getMunicipios;
function createMunicipio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        conn.query('INSERT INTO municipio SET?', [newPost]);
        return res.json({
            message: 'POST CREATED'
        });
    });
}
exports.createMunicipio = createMunicipio;
function getMunicipio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_municipio;
        const conn = yield (0, database_1.connect)();
        const municipio = yield conn.query('SELECT * FROM municipio WHERE id_municipio = ?', [id]);
        return res.json(municipio[0]);
    });
}
exports.getMunicipio = getMunicipio;
function deleteMunicipio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_municipio;
        const conn = yield (0, database_1.connect)();
        try {
            yield conn.query('DELETE FROM vivienda_en_venta WHERE id_vivienda IN (SELECT id_vivienda FROM persona WHERE id_municipio = ?)', [id]);
            yield conn.query('DELETE FROM persona WHERE id_municipio = ?', [id]);
            yield conn.query('DELETE FROM vivienda WHERE id_municipio = ?', [id]);
            yield conn.query('DELETE FROM municipio WHERE id_municipio = ?', [id]);
            return res.json({
                message: 'municipio DELETED'
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Error Deleting municipio',
                error
            });
        }
    });
}
exports.deleteMunicipio = deleteMunicipio;
function updateMunicipio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_municipio;
        const updatemunicipio = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE municipio set ? WHERE id_municipio = ?', [updatemunicipio, id]);
        return res.json({
            message: 'POST UPDATED'
        });
    });
}
exports.updateMunicipio = updateMunicipio;
function getMunicipioDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_municipio; // 
        const conn = yield (0, database_1.connect)();
        const query = `
    SELECT 
        m.id_municipio,
        m.area,
        m.presupuesto,
        (SELECT persona_id_cedula FROM gobierna WHERE departamento_id_departamento = m.departamento_id_departamento LIMIT 1) AS 'id_gobernante',
        (SELECT nombre FROM persona WHERE id_cedula = (SELECT persona_id_cedula FROM gobierna WHERE departamento_id_departamento = m.departamento_id_departamento LIMIT 1)) AS 'nombre_gobernante',
        (SELECT telefono FROM persona WHERE id_cedula = (SELECT persona_id_cedula FROM gobierna WHERE departamento_id_departamento = m.departamento_id_departamento LIMIT 1)) AS 'telefono',
        (SELECT GROUP_CONCAT(id_vivienda) FROM vivienda WHERE municipio_id_municipio = m.id_municipio) AS 'ids_vivienda',
        (SELECT GROUP_CONCAT(direccion) FROM vivienda WHERE municipio_id_municipio = m.id_municipio) AS 'direcciones',
        (SELECT GROUP_CONCAT(area) FROM vivienda WHERE municipio_id_municipio = m.id_municipio) AS 'areas_vivienda',
        (SELECT GROUP_CONCAT(persona_id_cedula) FROM habita WHERE vivienda_id_vivienda IN (SELECT id_vivienda FROM vivienda WHERE municipio_id_municipio = m.id_municipio)) AS 'id_habitantes',
        (SELECT GROUP_CONCAT(nombre) FROM persona WHERE id_cedula IN (SELECT persona_id_cedula FROM habita WHERE vivienda_id_vivienda IN (SELECT id_vivienda FROM vivienda WHERE municipio_id_municipio = m.id_municipio))) AS 'nombres_habitantes',
        (SELECT GROUP_CONCAT(telefono) FROM persona WHERE id_cedula IN (SELECT persona_id_cedula FROM habita WHERE vivienda_id_vivienda IN (SELECT id_vivienda FROM vivienda WHERE municipio_id_municipio = m.id_municipio))) AS 'telefonos_habitantes'
    FROM municipio m
    WHERE m.id_municipio = ?;
    `;
        const municipioDetails = yield conn.query(query, [id]);
        return res.json(municipioDetails[0]);
    });
}
exports.getMunicipioDetails = getMunicipioDetails;
