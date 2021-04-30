import swaggerUI from "swagger-ui-express";
import swagger from "../../swagger.json";
import { Router } from "express";

const router = Router();

router.use("", swaggerUI.serve);
router.get("", swaggerUI.setup(swagger));

export default router;
