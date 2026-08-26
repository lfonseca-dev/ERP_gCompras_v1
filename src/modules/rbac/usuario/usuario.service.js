import UsuarioRepository from "./usuario.repository.js";
import { hashPass } from "../../../core/security/hash.js";
import { AppError } from "../../../core/utils/AppError.js";

import NivelService from "../nivelacesso/nivel.service.js";
import EmpresaService from "../../cadastro/empresa/empresa.service.js";

const UsuarioService = {
    async create(usuario) {

        await NivelService.getById(usuario.nivel_acesso_id);
        await EmpresaService.getById(usuario.empresa_id);

        const existingUsuario = await UsuarioRepository.getByEmail(usuario.email);

        if (existingUsuario) {
            throw new AppError({
                message: "Email já cadastrado",
                reason: "EMAIL_ALREADY_EXISTS",
                statusCode: 409
            });
        }

        const hashedPass = await hashPass(usuario.senha);

        return await UsuarioRepository.create({...usuario, senha: hashedPass});
    },

    async getAll() {
        return await UsuarioRepository.getAll();
    },

    async getById(id) {
        const usuario = await UsuarioRepository.getById(id);

        if (!usuario) {
            throw new AppError({
                message: "Usuário não encontrado",
                reason: "USUARIO_NOT_FOUND",
                statusCode: 404
            });
        }
        return usuario;
    },

    async update(id, usuario) {

        await NivelService.getById(usuario.nivel_acesso_id);
        await EmpresaService.getById(usuario.empresa_id);

        const existingUsuario = await UsuarioRepository.getById(id);

        if (!existingUsuario) {
            throw new AppError({
                message: "Usuário não encontrado",
                reason: "USUARIO_NOT_FOUND",
                statusCode: 404
            });
        }   

        const hashedPass = usuario.senha ? await hashPass(usuario.senha) : existingUsuario.senha;

        return await UsuarioRepository.update(id, {...usuario, senha: hashedPass});
    },

    async delete(id) {
        const existingUsuario = await UsuarioRepository.getById(id);

        if (!existingUsuario) {
            throw new AppError({
                message: "Usuário não encontrado",
                reason: "USUARIO_NOT_FOUND",
                statusCode: 404
            });
        }
        return await UsuarioRepository.delete(id);
    }
};

export default UsuarioService;      