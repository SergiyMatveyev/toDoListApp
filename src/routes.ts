import bodyParser from "body-parser";
import { Express, Router } from "express";
import { applicationRouter } from "./routes/applicationRouter.routes";

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use("/", applicationRouter);

function configureRoutes(app: Express) {
  app.use("/", router);
}

export { configureRoutes };
