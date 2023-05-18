"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const google_1 = require("./google");
const get = async (req, res) => {
    try {
        const data = await (0, google_1.getData)();
        res.status(200).json(data);
        // return data;
    }
    catch (e) {
        res.status(500);
    }
};
exports.get = get;
// module.exports = { get };
