import { Router } from "express";
import HistoricoController from "./historico.controller.js";
import { validate } from "../../../core/middlewares/validate.js";
import { auth } from "../../../core/middlewares/auth.middleware.js";
import { getHistoricoDTO } from "./historico.dto.js";

const routes = Router();

routes.get("/", 
    auth,
    HistoricoController.getAll
);

export default routes;