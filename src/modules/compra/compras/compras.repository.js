import pool from "../../../core/database/data.js";

const ComprasRepository = {
    async create(compra) {
        const [result] = await pool.execute("INSERT INTO compra (numero, descricao, data, valor, observacao, fornecedor_id, usuario_id, empresa_id, status_compra_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [compra.numero, compra.descricao, compra.data, compra.valor, compra.observacao, compra.fornecedor_id, compra.usuario_id, compra.empresa_id, compra.status_compra_id]);
        return result;
    },

    async getAllByEmpresa(empresa_id) {
        const [rows] = await pool.query("SELECT * FROM compra WHERE empresa_id = ? AND deleted_at IS NULL", [empresa_id]);
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM compra WHERE id = ? AND deleted_at IS NULL", [id]);
        return rows[0];
    },

    async getByNumero(numero) {
        const [rows] = await pool.query("SELECT * FROM compra WHERE numero = ? AND deleted_at IS NULL", [numero]);
        return rows[0];
    },

    async updateStatus(id, status_compra_id) {
        const [result] = await pool.execute("UPDATE compra SET status_compra_id = ?, updated_at = NOW() WHERE id = ?",
            [status_compra_id, id]);
        return result;
    },

    async update(id, compra) {
        const [result] = await pool.execute("UPDATE compra SET numero = ?, descricao = ?, data = ?, valor = ?, observacao = ?, fornecedor_id = ?, updated_at = NOW() WHERE id = ?",
            [compra.numero, compra.descricao, compra.data, compra.valor, compra.observacao, compra.fornecedor_id, id]);
        return result;
    },

    async delete(id) {
        const [result] = await pool.execute("UPDATE compra SET deleted_at = NOW() WHERE id = ?", [id]);
        return result;
    }
}

export default ComprasRepository;