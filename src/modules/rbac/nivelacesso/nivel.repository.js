import pool from "../../../core/database/data.js";

const NivelRepository = {
    async create(nivelAcesso) {
        const [result] = await pool.execute("INSERT INTO nivel_acesso (codigo, descricao) VALUES (?, ?)", [nivelAcesso.codigo, nivelAcesso.descricao]);
        return result;
    },

    async getAll() {
        const [rows] = await pool.query("SELECT * FROM nivel_acesso WHERE deleted_at IS NULL");
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.execute("SELECT * FROM nivel_acesso WHERE id = ? AND deleted_at IS NULL", [id]);
        return rows[0];
    },

    async getByCodigo(codigo) {
        const [rows] = await pool.execute("SELECT * FROM nivel_acesso WHERE codigo = ? AND deleted_at IS NULL", [codigo]);
        return rows[0];
    },

    async update(id, nivelAcesso) {
        const [result] = await pool.execute("UPDATE nivel_acesso SET codigo = ?, descricao = ?, updated_at = NOW() WHERE id = ?", 
            [nivelAcesso.codigo, nivelAcesso.descricao, id]);
        return result;
    },

    async delete(id) {
        const [result] = await pool.execute("UPDATE nivel_acesso SET deleted_at = NOW() WHERE id = ?", [id]);
        return result;
    }
};

export default NivelRepository;