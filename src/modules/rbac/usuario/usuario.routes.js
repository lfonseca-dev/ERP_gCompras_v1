import { Router } from "express";
import UsuarioController from "./usuario.controller.js";
import { auth } from "../../../core/middlewares/auth.middleware.js";
import { validate } from "../../../core/middlewares/validate.js";
import { createUsuarioDTO, updateUsuarioDTO, getUsuarioDTO } from "./usuario.dto.js";
import { authorize } from "../../../core/middlewares/authorize.js";

const router = Router();

router.post("/", 
    auth,
    authorize(1),
    validate(createUsuarioDTO), 
    UsuarioController.create
);

router.get("/",
    auth,
    authorize(1),
    UsuarioController.getAll
);

router.get("/:id",
    auth,
    validate(getUsuarioDTO, "params"),
    UsuarioController.getById
);

router.put("/:id",
    auth,
    authorize(1),
    validate(getUsuarioDTO, "params"),
    validate(updateUsuarioDTO), 
    UsuarioController.update
);

router.delete("/:id",
    auth,
    authorize(1),
    validate(getUsuarioDTO, "params"), 
    UsuarioController.delete
);

export default router;