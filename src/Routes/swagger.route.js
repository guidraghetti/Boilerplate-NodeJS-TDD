import swaggerUI from "swagger-ui-express";
import YAML from 'yamljs'
import { Router } from "express";

const router = Router();
const swagger = YAML.load("./swagger.yaml");
router.use("", swaggerUI.serve);
router.get("", swaggerUI.setup(swagger));

export default router;
