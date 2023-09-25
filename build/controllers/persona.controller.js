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
exports.getPersonaDetails = exports.updatePersona = exports.deletePersona = exports.getPersona = exports.createPersona = exports.getPersonas = void 0;
const database_1 = require("../database");
function getPersonas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const personas = yield conn.query('SELECT * FROM persona');
        return res.json(personas[0]);
    });
}
exports.getPersonas = getPersonas;
function createPersona(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPersona = req.body;
        const conn = yield (0, database_1.connect)();
        conn.query('INSERT INTO persona SET ?', [newPersona]);
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
        const persona = yield conn.query('SELECT * FROM persona WHERE id_cedula = ?', [id]);
        return res.json(persona[0]);
    });
}
exports.getPersona = getPersona;
function deletePersona(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idPersona;
        const conn = yield (0, database_1.connect)();
        try {
            // Primero eliminar registros en tablas Dependiente, Habita, Posee y ViviendaEnVenta que están relacionados con esta Persona
            yield conn.query('DELETE FROM dependiente WHERE persona_id_cedula = ?', [id]);
            yield conn.query('DELETE FROM habita WHERE persona_id_cedula = ?', [id]);
            yield conn.query('DELETE FROM posee WHERE persona_id_cedula = ?', [id]);
            yield conn.query('DELETE FROM vivienda_en_venta WHERE persona_id_cedula = ?', [id]);
            yield conn.query('DELETE FROM gobierna WHERE persona_id_cedula = ?', [id]);
            // Ahora puedes eliminar de la tabla Persona
            yield conn.query('DELETE FROM persona WHERE id_cedula = ?', [id]);
            return res.json({
                message: 'Persona Deleted'
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Error Deleting Persona',
                error
            });
        }
    });
}
exports.deletePersona = deletePersona;
function updatePersona(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idPersona;
        const updatedPersona = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE persona SET ? WHERE id_cedula = ?', [updatedPersona, id]);
        return res.json({
            message: 'Persona Updated'
        });
    });
}
exports.updatePersona = updatePersona;
function getPersonaDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idPersona; // 
        const conn = yield (0, database_1.connect)();
        const query = `
    SELECT 
        p.id_cedula,
        p.edad,
        p.sexo,
        p.telefono,
        p.fecha_de_nacimiento,
        v.id_vivienda,
        v.direccion,
        v.estrato,
        m.id_municipio,
        m.nombre AS 'nombre_municipio',
        GROUP_CONCAT(DISTINCT CONCAT(vv.id_vivienda, ':', vv.direccion, ':', vv.area) ORDER BY vv.id_vivienda ASC) AS 'ID_Casas:Direcciones:Area',
        GROUP_CONCAT(DISTINCT CONCAT(d.dependiente_id_cedula, ':', dp.nombre, ':', dp.telefono) ORDER BY d.dependiente_id_cedula ASC) AS 'ID_Dependientes:Nombres:Telefonos'
    FROM persona p
    LEFT JOIN posee po ON p.id_cedula = po.persona_id_cedula
    LEFT JOIN vivienda v ON po.vivienda_id_vivienda = v.id_vivienda
    LEFT JOIN municipio m ON v.municipio_id_municipio = m.id_municipio
    LEFT JOIN vivienda vv ON po.vivienda_id_vivienda = vv.id_vivienda
    LEFT JOIN dependiente d ON p.id_cedula = d.persona_id_cedula
    LEFT JOIN persona dp ON d.dependiente_id_cedula = dp.id_cedula
    WHERE p.id_cedula = 3456789012  -- Reemplaza el signo de interrogación con el ID de la persona que estás buscando
    GROUP BY p.id_cedula, v.id_vivienda, m.id_municipio;
    `;
        const personaDetails = yield conn.query(query, [id]);
        return res.json(personaDetails[0]);
    });
}
exports.getPersonaDetails = getPersonaDetails;
