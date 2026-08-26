import { AppError } from "../utils/AppError.js";

export const authorize = (...niveis) =>
    (req, res, next) => {

        if (!niveis.includes(req.user.nivel_acesso)) {
            throw new AppError({
                message: "Acesso negado",
                statusCode: 403
            });
        }

        next();
    };