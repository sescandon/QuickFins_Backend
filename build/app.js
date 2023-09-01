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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//Routes
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const municipio_routes_1 = __importDefault(require("./routes/municipio.routes"));
const persona_routes_1 = __importDefault(require("./routes/persona.routes"));
const vivienda_routes_1 = __importDefault(require("./routes/vivienda.routes"));
const posee_routes_1 = __importDefault(require("./routes/posee.routes"));
const dependiente_routes_1 = __importDefault(require("./routes/dependiente.routes"));
const viviendaEnVenta_routes_1 = __importDefault(require("./routes/viviendaEnVenta.routes"));
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.settings();
        this.useCors();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/municipios', municipio_routes_1.default);
        this.app.use('/personas', persona_routes_1.default);
        this.app.use('/viviendas', vivienda_routes_1.default);
        this.app.use('/posee', posee_routes_1.default);
        this.app.use('/dependiente', dependiente_routes_1.default);
        this.app.use('/viviendaEnVenta', viviendaEnVenta_routes_1.default);
    }
    useCors() {
        this.app.use((0, cors_1.default)({
            origin: '*',
        }));
        console.log('Cors available!');
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('Sever on port', this.app.get('port'));
        });
    }
}
exports.App = App;
