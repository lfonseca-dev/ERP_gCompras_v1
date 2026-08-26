import { z } from "zod";

export const createFornecedorDTO = z.object({
    codigo: z
        .string({required_error: "Código é obrigatório"})
        .min(1, "Código não pode ser vazio"),

    razao_social: z
        .string({required_error: "Razão Social é obrigatória"})
        .min(1, "Razão Social não pode ser vazia")
        .max(100, "Razão Social deve ter no máximo 100 caracteres"),

    cnpj: z
        .string({required_error: "CNPJ é obrigatório"})
        .min(14, "CNPJ deve ter no mínimo 14 caracteres")
        .max(18, "CNPJ deve ter no máximo 18 caracteres"),

    inscricao_estadual: z
        .string({required_error: "Inscrição Estadual é obrigatória"})
        .min(1, "Inscrição Estadual não pode ser vazia")
        .max(20, "Inscrição Estadual deve ter no máximo 20 caracteres"),

    email: z
        .string({required_error: "Email é obrigatório"})
        .max(100, "Email deve ter no máximo 100 caracteres"),

    telefone: z
        .string()
        .max(15, "Telefone deve ter no máximo 15 caracteres"),

    endereco: z
        .string()
        .max(200, "Endereço deve ter no máximo 200 caracteres"),

    regimeT_id: z
        .number({required_error: "ID do Regime Tributário é obrigatório"})
        .int("ID do Regime Tributário deve ser um número inteiro")
        .positive("ID do Regime Tributário deve ser maior que zero")
});

export const updateFornecedorDTO = createFornecedorDTO.partial();

export const getRazaoSocialFornecedorDTO = z.object({
    razao_social: z
        .string({required_error: "Razão Social é obrigatória"})
});

export const getFornecedorDTO = z.object({
    id: z.coerce
    .number({message: "O ID deve ser um número"})
    .int("O ID deve ser um número inteiro")
    .positive("O ID deve ser maior que zero")
});