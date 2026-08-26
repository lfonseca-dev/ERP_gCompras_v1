import pool from "../../../core/database/data.js";

const StatusRepository = {
    async create(status) {
        const [result] = await pool.execute("INSERT INTO status_compra (codigo, descricao) VALUES (?, ?)", [status.codigo, status.descricao]);
        return result;
    },

    async getAll() {
        const [rows] = await pool.query("SELECT * FROM status_compra WHERE deleted_at IS NULL");
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM status_compra WHERE id = ? AND deleted_at IS NULL", [id]);
        return rows[0];
    },

    async getByCodigo(status) {
        const [rows] = await pool.query("SELECT * FROM status_compra WHERE codigo = ? AND deleted_at IS NULL", [status.codigo]);
        return rows[0];
    },

    async update(id, status) {
        const [result] = await pool.execute("UPDATE status_compra SET codigo = ?, descricao = ?, updated_at = NOW() WHERE id = ?", 
            [status.codigo, status.descricao, id]);
        return result;
    },

    async delete(id) {
        const [result] = await pool.execute("UPDATE status_compra SET deleted_at = NOW() WHERE id = ?", [id]);
        return result;
    }
};

export default StatusRepository;