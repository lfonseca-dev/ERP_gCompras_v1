import RegimeTRepository from "./regimeT.repository.js";
import { AppError } from "../../../core/utils/AppError.js";

const RegimeTService = {
    async create(regime) {
        const existingRegime = await RegimeTRepository.getByCodigo(regime.codigo);

        if (existingRegime) {
            throw new AppError({
                message: "Regime tributário já cadastrado",
                reason: "REGIME_TRIBUTARIO_ALREADY_EXISTS",
                statusCode: 409,
            });
        }
        return await RegimeTRepository.create(regime);
    },

    async getAll() {
        return await RegimeTRepository.getAll();
    },

    async getById(id) {
        const regime = await RegimeTRepository.getById(id);

        if (!regime) {
            throw new AppError({
                message: "Regime tributário não encontrado",
                reason: "REGIME_TRIBUTARIO_NOT_FOUND",
                statusCode: 404,
            });
        }
        return regime;
    },

    async update(id, regime) {
        const existingRegime = await RegimeTRepository.getById(id);

        if (!existingRegime) {
            throw new AppError({
                message: "Regime tributário não encontrado",
                reason: "REGIME_TRIBUTARIO_NOT_FOUND",
                statusCode: 404,
            });
        }
        return await RegimeTRepository.update(id, regime);
    },

    async delete(id) {
        const existingRegime = await RegimeTRepository.getById(id);

        if (!existingRegime) {
            throw new AppError({
                message: "Regime tributário não encontrado",
                reason: "REGIME_TRIBUTARIO_NOT_FOUND",
                statusCode: 404,
            });
        }
        return await RegimeTRepository.delete(id);
    }
}

export default RegimeTService;