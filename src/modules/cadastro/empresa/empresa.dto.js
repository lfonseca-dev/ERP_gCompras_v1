import { z } from "zod";

export const createEmpresaDTO = z.object({
    codigo: z
        .string({required_error: "Código é obrigatório"})
        .min(1, "Código não pode ser vazio"),

    razao_social: z
        .string({required_error: "Razão Social é obrigatória"})
        .min(1, "Razão Social não pode ser vazia")
        .max(100, "Razão Social deve ter no máximo 100 caracteres"),

    cnpj: z
        .string({required_error: "CNPJ é obrigatório"})
        .min(13, "CNPJ deve ter no mínimo 13 caracteres")
        .max(14, "CNPJ deve ter no máximo 14 caracteres"),

    inscricao_estadual: z
        .string({required_error: "Inscrição Estadual é obrigatória"})
        .min(1, "Inscrição Estadual não pode ser vazia")
        .max(20, "Inscrição Estadual deve ter no máximo 20 caracteres"),

    email: z
        .string()
        .max(100, "Email deve ter no máximo 100 caracteres"),

    telefone: z
        .string()
        .max(15, "Telefone deve ter no máximo 15 caracteres"),

    endereco: z
        .string()
        .max(200, "Endereço deve ter no máximo 200 caracteres")
});

export const updateEmpresaDTO = createEmpresaDTO.partial();

export const getEmpresaDTO = z.object({
    id: z.coerce
    .number({message: "O ID deve ser um número"})
    .int("O ID deve ser um número inteiro")
    .positive("O ID deve ser maior que zero")
});