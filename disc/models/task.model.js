"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const task = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
});
const Task = (0, mongoose_1.model)("Task", task);
exports.Task = Task;
//# sourceMappingURL=task.model.js.map