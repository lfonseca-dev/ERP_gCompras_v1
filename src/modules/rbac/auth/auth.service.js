import AuthRepository from "./auth.repository.js";
import { AppError } from "../../../core/utils/AppError.js";
import { validatePass } from "../../../core/security/hash.js";
import JWT from "../../../core/security/jwt.js";

const AuthService = {
    async login(data, req) {
        const usuario = await AuthRepository.authentication(data.email);

        if (!usuario) {
            throw new AppError({
                message: "Usuário não encontrado",
                reason: "USER_NOT_FOUND",
                statusCode: 401,
            });
        }

        const validatePassword = await validatePass(usuario.senha, data.senha);

        if (!validatePassword) {
            throw new AppError({
                message: "Senha incorreta",
                reason: "INVALID_PASSWORD",
                statusCode: 401,
            }); 
        }

        const payload = {
            sub: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            empresa: usuario.empresa_id,
            nivel_acesso: usuario.nivel_acesso_id,
        };

            return JWT.generateAccessToken(payload);
    }
};

export default AuthService;