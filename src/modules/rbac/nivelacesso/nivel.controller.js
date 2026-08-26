import NivelService from "./nivel.service.js";
import * as response from "../../../core/utils/response.js";
import { asyncHandler } from "../../../core/utils/asyncHandler.js";

const NivelController = {
    create: asyncHandler(async (req, res) => {
        const data = await NivelService.create(req.body);
        return response.created(res, {
            message: "Nível de acesso cadastrado",
            data
        });
    }),

    getAll: asyncHandler(async (req, res) => {
        const data = await NivelService.getAll();
        return response.success(res, {
            message: "Níveis de acesso listados",
            data
        });
    }),

    getById: asyncHandler(async (req, res) => {
        const data = await NivelService.getById(req.params.id);
        return response.success(res, {
            message: "Nível de acesso encontrado",
            data
        });
    }),

    update: asyncHandler(async (req, res) => {  
        const data = await NivelService.update(Number(req.params.id), req.body);
        return response.success(res, {
            message: "Nível de acesso atualizado",
            data
        });
    }),

    delete: asyncHandler(async (req, res) => {
        const data = await NivelService.delete(Number(req.params.id));
        return response.success(res, {
            message: "Nível de acesso excluído",
            data
        });
    })
};

export default NivelController;