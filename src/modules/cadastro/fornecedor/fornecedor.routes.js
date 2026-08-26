import { Router } from "express";
import FornecedorController from "./fornecedor.controller.js";
import { validate } from "../../../core/middlewares/validate.js";
import { createFornecedorDTO, updateFornecedorDTO, getFornecedorDTO, getRazaoSocialFornecedorDTO } from "./fornecedor.dto.js";
import { auth } from "../../../core/middlewares/auth.middleware.js";
import { authorize } from "../../../core/middlewares/authorize.js";

const router = Router();

router.post("/", 
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(createFornecedorDTO), 
    FornecedorController.create
);

router.get("/", 
    auth,
    FornecedorController.getAll
);

router.get("/:id", 
    auth,
    validate(getFornecedorDTO, "params"), 
    FornecedorController.getById
);

router.get("/razaoSocial/:razao_social",
    auth,
    validate(getRazaoSocialFornecedorDTO, "params"),
    FornecedorController.getByRazaoSocial
);

router.put("/:id", 
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(getFornecedorDTO, "params"),
    validate(updateFornecedorDTO), 
    FornecedorController.update
);

router.delete("/:id", 
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(getFornecedorDTO, "params"), 
    FornecedorController.delete
);

export default router;