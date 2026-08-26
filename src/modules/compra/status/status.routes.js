import {Router} from "express";
import StatusController from "./status.controller.js";
import { validate } from "../../../core/middlewares/validate.js";
import { auth } from "../../../core/middlewares/auth.middleware.js";
import { createStatusDTO, updateStatusDTO, getStatusDTO } from "./status.dto.js";
import { authorize } from "../../../core/middlewares/authorize.js";

const router = Router();

router.post("/", 
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(createStatusDTO), 
    StatusController.create
);

router.get("/",
    auth,
    StatusController.getAll
);

router.get("/:id",
    auth,
    validate(getStatusDTO, "params"),
    StatusController.getById
);

router.put("/:id",
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(getStatusDTO, "params"),
    validate(updateStatusDTO), 
    StatusController.update
);

router.delete("/:id",
    auth,
    authorize("ADMIN", "GERENTE"),
    validate(getStatusDTO, "params"), 
    StatusController.delete
);

export default router;