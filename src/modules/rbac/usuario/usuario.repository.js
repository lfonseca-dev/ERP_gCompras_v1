import pool from "../../../core/database/data.js"

const UsuarioRepository = {
    async create(usuario) {
        const [result] = await pool.execute("INSERT INTO usuario (nome, email, senha, nivel_acesso_id, empresa_id) VALUES (?, ?, ?, ?, ?)", 
            [usuario.nome, usuario.email, usuario.senha, usuario.nivel_acesso_id, usuario.empresa_id]);
        return result;
    },
    
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM usuario WHERE deleted_at IS NULL");
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM usuario WHERE id = ? AND deleted_at IS NULL", [id]);
        return rows[0];
    },

    async getByEmail(email) {
        const [rows] = await pool.query("SELECT * FROM usuario WHERE email = ? AND deleted_at IS NULL", [email]);
        return rows[0];
    },

    async update(id, usuario) {
        const [result] = await pool.execute("UPDATE usuario SET nome = ?, email = ?, senha = ?, nivel_acesso_id = ?, empresa_id = ?, updated_at = NOW() WHERE id = ?", 
            [usuario.nome, usuario.email, usuario.senha, usuario.nivel_acesso_id, usuario.empresa_id, id]);
        return result;
    },

    async delete(id) {
        const [result] = await pool.execute("UPDATE usuario SET deleted_at = NOW() WHERE id = ?", [id]);
        return result;
    }
};

export default UsuarioRepository