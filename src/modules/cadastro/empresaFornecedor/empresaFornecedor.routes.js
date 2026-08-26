import { Router } from "express";
import EmpresaFornecedorController from "./empresaFornecedor.controller.js";
import { createEmpresaFornecedorDTO,idEmpresaFornecedorDTO } from "./empresaFornecedor.dto.js";
import { validate } from "../../../core/middlewares/validate.js";
import { auth } from "../../../core/middlewares/auth.middleware.js";
import { authorize } from "../../../core/middlewares/authorize.js";

const router = Router();

router.post("/",
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(createEmpresaFornecedorDTO),
    EmpresaFornecedorController.create
);

router.get("/",
    auth,
    EmpresaFornecedorController.getAllByEmpresa
);

router.get("/:id",
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(idEmpresaFornecedorDTO, "params"),
    EmpresaFornecedorController.getById
);

export default router;