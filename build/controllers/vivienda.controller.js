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
exports.getViviendaDetails = exports.updateVivienda = exports.deleteVivienda = exports.getVivienda = exports.createVivienda = exports.getViviendas = void 0;
const database_1 = require("../database");
function getViviendas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const viviendas = yield conn.query('SELECT * FROM vivienda');
        return res.json(viviendas[0]);
    });
}
exports.getViviendas = getViviendas;
function createVivienda(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        conn.query('INSERT INTO vivienda SET?', [newPost]);
        return res.json({
            message: 'VIVIENDA CREATED'
        });
    });
}
exports.createVivienda = createVivienda;
function getVivienda(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_vivienda;
        const conn = yield (0, database_1.connect)();
        const Vivienda = yield conn.query('SELECT * FROM Vivienda WHERE id_vivienda = ?', [id]);
        return res.json(Vivienda[0]);
    });
}
exports.getVivienda = getVivienda;
function deleteVivienda(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_vivienda;
        const conn = yield (0, database_1.connect)();
        try {
            // Primero eliminar registros en tablas Habita y Posee que están relacionados con esta Vivienda
            yield conn.query('DELETE FROM habita WHERE id_vivienda = ?', [id]);
            yield conn.query('DELETE FROM posee WHERE id_vivienda = ?', [id]);
            // Ahora puedes eliminar de la tabla Vivienda
            yield conn.query('DELETE FROM vivienda WHERE id_vivienda = ?', [id]);
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
        const id = req.params.id_vivienda;
        const updateVivienda = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE Vivienda set ? WHERE id_vivienda = ?', [updateVivienda, id]);
        return res.json({
            message: 'VIVIENDA UPDATED'
        });
    });
}
exports.updateVivienda = updateVivienda;
function getViviendaDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id_vivienda;
        const conn = yield (0, database_1.connect)();
        const query = `
    SELECT 
        v.id_vivienda,
        v.estrato,
        m.nombre AS 'municipio',
        m.id_municipio,
        (SELECT p.nombre FROM persona p INNER JOIN posee po ON p.id_cedula = po.persona_id_cedula WHERE po.vivienda_id_vivienda = v.id_vivienda) AS 'nombre_propietario',
        (SELECT p.id_cedula FROM persona p INNER JOIN posee po ON p.id_cedula = po.persona_id_cedula WHERE po.vivienda_id_vivienda = v.id_vivienda) AS 'id_propietario',
        m.id_municipio AS 'id_municipio_propietario',
        v.area AS 'area_vivienda',
        v.capacidad,
        v.niveles,
        v.baños,
        (SELECT GROUP_CONCAT(h.persona_id_cedula) FROM habita h WHERE h.vivienda_id_vivienda = v.id_vivienda) AS 'id_residentes',
        (SELECT GROUP_CONCAT(pr.nombre) FROM habita h INNER JOIN persona pr ON h.persona_id_cedula = pr.id_cedula WHERE h.vivienda_id_vivienda = v.id_vivienda) AS 'nombres_residentes',
        (SELECT GROUP_CONCAT(pr.telefono) FROM habita h INNER JOIN persona pr ON h.persona_id_cedula = pr.id_cedula WHERE h.vivienda_id_vivienda = v.id_vivienda) AS 'telefonos_residentes'
    FROM vivienda v
    INNER JOIN municipio m ON v.municipio_id_municipio = m.id_municipio
    WHERE v.id_vivienda = ?  -- Reemplaza el signo de interrogación con el ID de la vivienda que estás buscando
    `;
        const viviendaDetails = yield conn.query(query, [id]);
        return res.json(viviendaDetails[0]);
    });
}
exports.getViviendaDetails = getViviendaDetails;
