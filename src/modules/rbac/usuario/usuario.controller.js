import UsuarioService from "./usuario.service.js";
import * as response from "../../../core/utils/response.js";
import { asyncHandler } from "../../../core/utils/asyncHandler.js";

const UsuarioController = {
    create: asyncHandler(async (req, res) => {
        const data = await UsuarioService.create(req.body);
        return response.created(res, {
            message: "Usuário cadastrado",
            data
        });
    }),

    getAll: asyncHandler(async (req, res) => {
        const data = await UsuarioService.getAll();
        return response.success(res, {
            message: "Usuários listados",
            data
        });
    }),

    getById: asyncHandler(async (req, res) => {
        const data = await UsuarioService.getById(req.params.id);
        return response.success(res, {
            message: "Usuário encontrado",
            data
        });
    }),

    update: asyncHandler(async (req, res) => {
        const data = await UsuarioService.update(Number(req.params.id), req.body);
        return response.success(res, {
            message: "Usuário atualizado",
            data
        });
    }),

    delete: asyncHandler(async (req, res) => {
        const data = await UsuarioService.delete(Number(req.params.id));
        return response.success(res, {
            message: "Usuário excluído",
            data
        });
    })
};

export default UsuarioController;