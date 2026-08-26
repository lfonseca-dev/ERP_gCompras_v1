import { Router } from "express";
import ComprasController from "./compras.controller.js";
import { validate } from "../../../core/middlewares/validate.js";
import { createCompraDTO, updateCompraDTO, getCompraDTO, updateStatusCompraDTO } from "./compras.dto.js";
import { auth } from "../../../core/middlewares/auth.middleware.js";
import { authorize } from "../../../core/middlewares/authorize.js";

const router = Router();

router.post("/",
    auth,
    validate(createCompraDTO),
    ComprasController.create
);

router.get("/",
    auth,
    ComprasController.getAllByEmpresa
);

router.get("/:id",
    auth,
    validate(getCompraDTO, "params"),
    ComprasController.getById
);

router.patch("/status/:id",
    auth,
    authorize(1,2),
    validate(getCompraDTO, "params"),
    validate(updateStatusCompraDTO),
    ComprasController.updateStatus
);

router.put("/:id",
    auth,
    validate(getCompraDTO, "params"),
    validate(updateCompraDTO),
    ComprasController.update
);

router.delete("/:id",
    auth,
    authorize(1,2),
    validate(getCompraDTO, "params"),
    ComprasController.delete
);

export default router;