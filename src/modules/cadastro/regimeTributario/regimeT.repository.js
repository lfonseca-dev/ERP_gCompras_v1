import pool from "../../../core/database/data.js";

const RegimeTRepository = {
    async create(regime) {
        const [result] = await pool.execute("INSERT INTO regime_tributario (codigo, descricao) VALUES (?, ?)", [regime.codigo, regime.descricao]);
        return result;
    },

    async getAll() {
        const [rows] = await pool.query("SELECT * FROM regime_tributario WHERE deleted_at IS NULL");
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM regime_tributario WHERE id = ? AND deleted_at IS NULL", [id]);
        return rows[0];
    },

    async getByCodigo(codigo) {
        const [rows] = await pool.query("SELECT * FROM regime_tributario WHERE codigo = ? AND deleted_at IS NULL", [codigo]);
        return rows[0];
    },

    async update(id, regime) {
        const [result] = await pool.execute("UPDATE regime_tributario SET codigo = ?, descricao = ?, updated_at = NOW() WHERE id = ?", 
            [regime.codigo, regime.descricao, id]);
        return result;
    },

    async delete(id) {
        const [result] = await pool.execute("UPDATE regime_tributario SET deleted_at = NOW() WHERE id = ?", [id]);
        return result;
    }
};

export default RegimeTRepository;