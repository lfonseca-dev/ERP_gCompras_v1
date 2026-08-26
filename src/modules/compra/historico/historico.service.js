import HistoricoRepository from "./historico.repository.js";
import ComprasService from "../compras/compras.service.js";
import { AppError} from "../../../core/utils/AppError.js";

const HistoricoService = {
    async create(data, usuario) {
        const compra = await ComprasService.getById(data.compra_id);

        if (compra.empresa_id !== usuario.empresa_id) {
            throw new AppError({
                message: "A compra não pertence à empresa do usuário",
                reason: "COMPRA_NOT_BELONG_TO_USER_COMPANY",
                statusCode: 403,
            });
        }

        return await HistoricoRepository.create({
            ...data,
            usuario_id: usuario.sub
        });
    },

    async getAll() {
        return await HistoricoRepository.getAll();
    }
};

export default HistoricoService;