import StatusService from "./status.service.js";
import * as response from "../../../core/utils/response.js";
import { asyncHandler } from "../../../core/utils/asyncHandler.js";

const StatusController = {
    create: asyncHandler(async (req, res) => {
        const data = await StatusService.create(req.body);
        return response.created(res, {
            message: "Status cadastrado",
            data
        });
    }),

    getAll: asyncHandler(async (req, res) => {
        const data = await StatusService.getAll();
        return response.success(res, {
            message: "Status listados",
            data
        });
    }),

    getById: asyncHandler(async (req, res) => {
        const data = await StatusService.getById(req.params.id);
        return response.success(res, {
            message: "Status encontrado",
            data
        });
    }),

    update: asyncHandler(async (req, res) => {
        const data = await StatusService.update(Number(req.params.id), req.body);
        return response.success(res, {
            message: "Status atualizado",
            data
        });
    }),

    delete: asyncHandler(async (req, res) => {
        const data = await StatusService.delete(Number(req.params.id));
        return response.success(res, {
            message: "Status excluído",
            data
        });
    })
};

export default StatusController;