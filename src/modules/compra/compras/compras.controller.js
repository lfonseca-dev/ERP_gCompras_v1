import ComprasService from "./compras.service.js";
import * as response from "../../../core/utils/response.js";
import { asyncHandler } from "../../../core/utils/asyncHandler.js";

const ComprasController = {
    create: asyncHandler(async (req, res) => {
        console.log("req.user", req.user);
        const data = await ComprasService.create(req.body, req.user);
        return response.created(res, {
            message: "Compra cadastrada com sucesso",
            data,
        });
    }),

    getAllByEmpresa: asyncHandler(async (req, res) => {
        const data = await ComprasService.getAllByEmpresa(req.user);
        return response.success(res, {
            message: "Compras listadas com sucesso",
            data,
        });
    }),

    getById: asyncHandler(async (req, res) => {
        const data = await ComprasService.getById(req.params.id, req.user);
        return response.success(res, {
            message: "Compra encontrada com sucesso",
            data,
        });
    }),

    updateStatus: asyncHandler(async (req, res) => {
        const data = await ComprasService.updateStatus(req.params.id, req.body.status_compra_id, req.user);
        return response.success(res, {
            message: "Status da compra atualizado com sucesso",
            data,
        });
    }),

    update: asyncHandler(async (req, res) => {
        const data = await ComprasService.update(req.params.id, req.body, req.user);
        return response.success(res, {
            message: "Compra atualizada com sucesso",
            data,
        });
    }),

    delete: asyncHandler(async (req, res) => {
        const data = await ComprasService.delete(req.params.id, req.user);
        return response.success(res, {
            message: "Compra excluída com sucesso",
            data,
        });
    })
};

export default ComprasController;   