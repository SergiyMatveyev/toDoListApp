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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./config/db");
const routes_1 = require("./routes");
const PORT = 8080;
const mongoDB = db_1.config.db;
mongoose_1.default.set("autoIndex", true);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield mongoose_1.default.connect(mongoDB);
    console.log(`MongoDB Connected.`);
});
connectDB();
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "/../public")));
app.set("view engine", "pug");
(0, routes_1.configureRoutes)(app);
app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
});
//# sourceMappingURL=app.js.map