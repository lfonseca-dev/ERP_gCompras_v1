import { Router } from "express";
import EmpresaController from "./empresa.controller.js";
import { validate } from "../../../core/middlewares/validate.js";
import { createEmpresaDTO, updateEmpresaDTO, getEmpresaDTO } from "./empresa.dto.js";
import { auth } from "../../../core/middlewares/auth.middleware.js";
import { authorize } from "../../../core/middlewares/authorize.js";

const router = Router();

router.post("/",
    auth, 
    authorize("ADMIN", "GERENTE"),
    validate(createEmpresaDTO), 
    EmpresaController.create
);

router.get("/", 
    auth,
    EmpresaController.getAll
);

router.get("/:id", 
    auth,
    validate(getEmpresaDTO, "params"), 
    EmpresaController.getById
);

router.put("/:id", 
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(getEmpresaDTO, "params"),
    validate(updateEmpresaDTO), 
    EmpresaController.update
);

router.delete("/:id", 
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(getEmpresaDTO, "params"), 
    EmpresaController.delete
);

export default router;