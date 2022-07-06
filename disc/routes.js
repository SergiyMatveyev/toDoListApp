"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const applicationRouter_routes_1 = require("./routes/applicationRouter.routes");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use("/", applicationRouter_routes_1.applicationRouter);
function configureRoutes(app) {
    app.use("/", router);
}
exports.configureRoutes = configureRoutes;
//# sourceMappingURL=routes.js.map