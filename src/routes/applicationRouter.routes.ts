import { Router, NextFunction, Request, Response } from "express";
import { TaskService } from "../services/task.service";
const router = Router();

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    TaskService.findAllTasks()
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
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    TaskService.addTask(req.body)
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
  })
  .put((req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 403; /*Not supported*/
    res.end("PUT operation not supported on /");
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    TaskService.removeAllTasks()
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
  });

router
  .route("/:taskId")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    TaskService.findTaskById(req.params.taskId)
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
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 403; /*Not supported*/
    res.send("POST operation not supported on /" + req.params.taskId);
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.sendStatus(400);

    TaskService.updateTaskById(req.params.taskId, req.body)
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
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    TaskService.removeTaskById(req.params.taskId)
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
  });
export { router as applicationRouter };
