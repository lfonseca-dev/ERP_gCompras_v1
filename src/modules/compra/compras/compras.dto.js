import z from "zod";

export const createCompraDTO = z.object({
    numero: z
        .string({required_error: "Número é obrigatório"})
        .min(1, "Número não pode ser vazio"),

    descricao: z
        .string({required_error: "Descrição é obrigatória"})
        .min(1, "Descrição não pode ser vazia")
        .max(200, "Descrição deve ter no máximo 200 caracteres"),

    data: z
        .string({required_error: "Data é obrigatória"})
        .min(1, "Data não pode ser vazia")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),

    valor: z
        .number({required_error: "Valor é obrigatório"})
        .positive("Valor deve ser maior que zero"),

    observacao: z
        .string()
        .max(500, "Observação deve ter no máximo 500 caracteres"),
    
    fornecedor_id: z
        .number({required_error: "ID do Fornecedor é obrigatório"})
        .int("ID do Fornecedor deve ser um número inteiro")
        .positive("ID do Fornecedor deve ser maior que zero"),

    status_compra_id: z
        .number({required_error: "ID do Status da Compra é obrigatório"})
        .int("ID do Status da Compra deve ser um número inteiro")
        .positive("ID do Status da Compra deve ser maior que zero")
});

export const updateCompraDTO = createCompraDTO.partial();

export const updateStatusCompraDTO = z.object({
    status_compra_id: z
        .number({required_error: "ID do Status da Compra é obrigatório"})
        .int("ID do Status da Compra deve ser um número inteiro")
        .positive("ID do Status da Compra deve ser maior que zero")
});

export const getCompraDTO = z.object({
    id: z.coerce
    .number({message: "O ID deve ser um número"})
    .int("O ID deve ser um número inteiro")
    .positive("O ID deve ser maior que zero")
});