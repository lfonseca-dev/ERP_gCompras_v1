import ComprasRepository from "./compras.repository.js";
import HistoricoRepository from "../historico/historico.repository.js";
import FornecedorService from "../../cadastro/fornecedor/fornecedor.service.js";
import statusService from "../status/status.service.js";
import { AppError } from "../../../core/utils/AppError.js";

const ComprasService = {
    async create(compra, usuario) {
        const existingCompra = await ComprasRepository.getByNumero(compra.numero);

        if (existingCompra) {
            throw new AppError({
                message: "Compra já cadastrada",
                reason: "COMPRA_ALREADY_EXISTS",
                statusCode: 409,
            });
        }

        await statusService.getById(compra.status_compra_id);
        await FornecedorService.getById(compra.fornecedor_id);

        const result = await ComprasRepository.create({
            ...compra, 
            usuario_id: usuario.sub, 
            empresa_id: usuario.empresa
        });

        await HistoricoRepository.create({
            compra_id: result.insertId,
            usuario_id: usuario.sub,
            status_compra_id: compra.status_compra_id,
            observacao: "Compra criada"
        });

        return result;
    },

    async getAllByEmpresa(usuario) {
        return await ComprasRepository.getAllByEmpresa(usuario.empresa);
    },

    async getById(id, usuario) {
        const existingCompra = await ComprasRepository.getById(id);

        if (!existingCompra) {
            throw new AppError({
                message: "Compra não encontrada",
                reason: "COMPRA_NOT_FOUND",
                statusCode: 404,
            });
        }

        if (existingCompra.empresa_id !== usuario.empresa) {
            throw new AppError({ 
                message: "A compra não pertence à empresa do usuário",
                reason: "COMPRA_NOT_BELONG_TO_USER_COMPANY",
                statusCode: 403,
            });
        }
        return existingCompra;
    },

    async updateStatus(id, status_compra_id, usuario) {
        const existingCompra = await ComprasRepository.getById(id, usuario.empresa);

        if (!existingCompra) {
            throw new AppError({
                message: "Compra não encontrada",
                reason: "COMPRA_NOT_FOUND",
                statusCode: 404,
            });
        }

        if (existingCompra.empresa_id !== usuario.empresa) {
            throw new AppError({
                message: "A compra não pertence à empresa do usuário",
                reason: "COMPRA_NOT_BELONG_TO_USER_COMPANY",
                statusCode: 403,
            });
        }

        const result = await ComprasRepository.updateStatus(id, status_compra_id);

        await HistoricoRepository.create({
            compra_id: id,
            usuario_id: usuario.sub,
            status_compra_id,
            observacao: "Status da compra alterado"
        });

        return result;
    },

    async update(id, compra, usuario) {
        const existingCompra = await ComprasRepository.getById(id);

        if (!existingCompra) {
            throw new AppError({
                message: "Compra não encontrada",
                reason: "COMPRA_NOT_FOUND",
                statusCode: 404,
            });
        }

        if (existingCompra.empresa_id !== usuario.empresa) {
            throw new AppError({
                message: "A compra não pertence à empresa do usuário",
                reason: "COMPRA_NOT_BELONG_TO_USER_COMPANY",
                statusCode: 403,
            });
        }

        const result = await ComprasRepository.update(id, {
            ...compra, 
            usuario_id: usuario.sub, 
            empresa_id: usuario.empresa
        });

        await HistoricoRepository.create({
            compra_id: id,
            usuario_id: usuario.sub,
            status_compra_id: existingCompra.status_compra_id,
            observacao: "Compra atualizada"
        });

        return result;
    },

    async delete(id, usuario) {
        const existingCompra = await ComprasRepository.getById(id);

        if (!existingCompra) {
            throw new AppError({
                message: "Compra não encontrada",
                reason: "COMPRA_NOT_FOUND",
                statusCode: 404,
            });
        }

        if (existingCompra.empresa_id !== usuario.empresa) {
            throw new AppError({
                message: "A compra não pertence à empresa do usuário",
                reason: "COMPRA_NOT_BELONG_TO_USER_COMPANY",
                statusCode: 403,
            });
        }

        const result = await ComprasRepository.delete(id);

        await HistoricoRepository.create({
            compra_id: id,
            usuario_id: usuario.sub,
            status_compra_id: existingCompra.status_compra_id,
            observacao: "Compra excluída"
        });

        return result;
    }
};

export default ComprasService;