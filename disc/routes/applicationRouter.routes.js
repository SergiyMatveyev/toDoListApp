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
exports.applicationRouter = void 0;
const express_1 = require("express");
const task_service_1 = require("../services/task.service");
const router = (0, express_1.Router)();
exports.applicationRouter = router;
router
    .route("/")
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    task_service_1.TaskService.findAllTasks()
        .then((result) => {
        res.setHeader("Content-Type", "text/html");
        res.render("page", {
            title: "To do list",
            tasks: result,
        });
    })
        .catch((error) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 500;
        res.send(error);
    });
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.sendStatus(400);
    console.log(req.body);
    task_service_1.TaskService.addTask(req.body)
        .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json(result);
    })
        .catch((error) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 500;
        res.json(error);
    });
}))
    .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /");
})
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    task_service_1.TaskService.removeAllTasks()
        .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json(result);
    })
        .catch((error) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 500;
        res.json(error);
    });
}));
router
    .route("/:taskId")
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    task_service_1.TaskService.findTaskById(req.params.taskId)
        .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json(result);
    })
        .catch((error) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 500;
        res.json(error);
    });
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.statusCode = 403;
    res.send("POST operation not supported on /" + req.params.taskId);
}))
    .put((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.sendStatus(400);
    task_service_1.TaskService.updateTaskById(req.params.taskId, req.body)
        .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json(result);
    })
        .catch((error) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 500;
        res.json(error);
    });
}))
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    task_service_1.TaskService.removeTaskById(req.params.taskId)
        .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json(result);
    })
        .catch((error) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 500;
        res.json(error);
    });
}));
//# sourceMappingURL=applicationRouter.routes.js.map