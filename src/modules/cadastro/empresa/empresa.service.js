import EmpresaRepository from "./empresa.repository.js";
import { AppError } from "../../../core/utils/AppError.js";

const EmpresaService = {
    async create(empresa) {
        const existingEmpresa = await EmpresaRepository.getByCodigo(empresa.codigo);

        if (existingEmpresa) {
            throw new AppError({
                message: "Empresa já cadastrada",
                reason: "EMPRESA_ALREADY_EXISTS",
                statusCode: 409,
            });
        }

        const existingEmpresaCNPJ = await EmpresaRepository.getByCNPJ(empresa.cnpj);

        if (existingEmpresaCNPJ) {
            throw new AppError({
                message: "Empresa já cadastrada com este CNPJ",
                reason: "EMPRESA_CNPJ_ALREADY_EXISTS",
                statusCode: 409,
            });
        }

        return await EmpresaRepository.create(empresa);
    },

    async getAll() {
        return await EmpresaRepository.getAll();
    },

    async getById(id) {
        const empresa = await EmpresaRepository.getById(id);

        if (!empresa) {
            throw new AppError({
                message: "Empresa não encontrada",
                reason: "EMPRESA_NOT_FOUND",
                statusCode: 404,
            });
        }
        return empresa;
    },


    async update(id, empresa) {
        const existingEmpresa = await EmpresaRepository.getById(id);

        if (!existingEmpresa) {
            throw new AppError({
                message: "Empresa não encontrada",
                reason: "EMPRESA_NOT_FOUND",
                statusCode: 404,
            });
        }

        return await EmpresaRepository.update(id, empresa);
    },

    async delete(id) {
        const empresa = await EmpresaRepository.getById(id);

        if (!empresa) {
            throw new AppError({
                message: "Empresa não encontrada",
                reason: "EMPRESA_NOT_FOUND",
                statusCode: 404,
            });
        }

        return await EmpresaRepository.delete(id);
    }
};

export default EmpresaService;