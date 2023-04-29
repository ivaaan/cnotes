"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const port = 4201;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
(async () => {
    try {
        app.listen(port, () => {
            console.log(`🌽 Listening on http://localhost:${port}`);
        });
    }
    catch (e) {
        console.log('Error in connecting to database :', e);
    }
})();
exports.default = app;
