import pool from "../../../core/database/data.js";

const EmpresaRepository = {
    async create(empresa) {
        const [result] = await pool.execute("INSERT INTO empresa (codigo, razao_social, cnpj, inscricao_estadual, email, telefone, endereco) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [empresa.codigo, empresa.razao_social, empresa.cnpj, empresa.inscricao_estadual, empresa.email, empresa.telefone, empresa.endereco]);
        return result;
    },

    async getAll() {
        const [rows] = await pool.query("SELECT * FROM empresa WHERE deleted_at IS NULL");
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM empresa WHERE id = ? AND deleted_at IS NULL", [id]);
        return rows[0];
    },

    async getByCodigo(codigo) {
        const [rows] = await pool.query("SELECT * FROM empresa WHERE codigo = ? AND deleted_at IS NULL", [codigo]);
        return rows[0];
    },

    async getByCNPJ(cnpj) {
        const [rows] = await pool.query("SELECT * FROM empresa WHERE cnpj = ? AND deleted_at IS NULL", [cnpj]);
        return rows[0];
    },

    async update(id, empresa) {
        const [result] = await pool.execute("UPDATE empresa SET codigo = ?, razao_social = ?, cnpj = ?, inscricao_estadual = ?, email = ?, telefone = ?, endereco = ?, updated_at = NOW() WHERE id = ?", 
            [empresa.codigo, empresa.razao_social, empresa.cnpj, empresa.inscricao_estadual, empresa.email, empresa.telefone, empresa.endereco, id]);
        return result;
    },

    async delete(id) {
        const [result] = await pool.execute("UPDATE empresa SET deleted_at = NOW() WHERE id = ?", [id]);
        return result;
    }
};

export default EmpresaRepository;