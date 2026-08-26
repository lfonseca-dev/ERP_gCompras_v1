import pool from "../../../core/database/data.js";

const FornecedorRepository = {
    async create(fornecedor) {      
        const [result] = await pool.execute("INSERT INTO fornecedor (codigo, razao_social, cnpj, inscricao_estadual, email, telefone, endereco, regimeT_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
            [fornecedor.codigo, fornecedor.razao_social, fornecedor.cnpj, fornecedor.inscricao_estadual, fornecedor.email, fornecedor.telefone, fornecedor.endereco, fornecedor.regimeT_id]);
        return result;
    },

    async getAll() {
        const [rows] = await pool.query("SELECT * FROM fornecedor WHERE deleted_at IS NULL");
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM fornecedor WHERE id = ? AND deleted_at IS NULL", [id]);
        return rows[0];
    },

    async getByCodigo(codigo) {
        const [rows] = await pool.query("SELECT * FROM fornecedor WHERE codigo = ? AND deleted_at IS NULL", [codigo]);
        return rows[0];
    },

    async getByRazaoSocial(razao_social) {
        const [rows] = await pool.query("SELECT * FROM fornecedor WHERE razao_social LIKE ? AND deleted_at IS NULL", [`%${razao_social}%`]);
        return rows[0];
    },

    async getByCNPJ(cnpj) {
        const [rows] = await pool.query("SELECT * FROM fornecedor WHERE cnpj = ? AND deleted_at IS NULL", [cnpj]);
        return rows[0];
    },

    async update(id, fornecedor) {
        const [result] = await pool.execute("UPDATE fornecedor SET codigo = ?, razao_social = ?, cnpj = ?, inscricao_estadual = ?, email = ?, telefone = ?, endereco = ?, regimeT_id = ?, updated_at = NOW() WHERE id = ?", 
            [fornecedor.codigo, fornecedor.razao_social, fornecedor.cnpj, fornecedor.inscricao_estadual, fornecedor.email, fornecedor.telefone, fornecedor.endereco, fornecedor.regimeT_id, id]);
        return result;
    },

    async delete(id) {
        const [result] = await pool.execute("UPDATE fornecedor SET deleted_at = NOW() WHERE id = ?", [id]);
        return result;
    }
};

export default FornecedorRepository;