import connection from '../database/Connection.js';

export default class Users {
    static table = 'users';

    // Adicionado RG
    static #columns = ['id', 'nome', 'email', 'rg'];

    static #searchable = ['nome', 'email', 'rg'];

    // INSERT
    static async insert(data) {
        if (!data.nome || data.nome.trim() === '') {
            return { status: false, msg: 'O campo nome é obrigatório', id: null, data: [] };
        }
        if (!data.email || data.email.trim() === '') {
            return { status: false, msg: 'O campo email é obrigatório', id: null, data: [] };
        }
        if (!data.senha || data.senha.trim() === '') {
            return { status: false, msg: 'O campo senha é obrigatório', id: null, data: [] };
        }
        if (!data.rg || data.rg.trim() === '') {
            return { status: false, msg: 'O campo RG é obrigatório', id: null, data: [] };
        }

        try {
            const clean = Users.#sanitize(data);

            const [result] = await connection(Users.table)
                .insert(clean)
                .returning('*');

            return { status: true, msg: 'Salvo com sucesso!', id: result.id, data: [result] };
        } catch (err) {
            return { status: false, msg: 'Erro: ' + err.message, id: null, data: [] };
        }
    }

    // FIND
    static async find(data = {}) {
        const { term = '', limit = 10, offset = 0, orderType = 'asc', column = 0, draw = 1 } = data;

        const [{ count: total }] = await connection(Users.table).count('id as count');

        const search = term?.trim();

        function applySearch(query) {
            if (search) {
                query.where(function () {
                    for (const col of Users.#searchable) {
                        this.orWhereRaw(`CAST("${col}" AS TEXT) ILIKE ?`, [`%${search}%`]);
                    }
                });
            }
            return query;
        }

        const filteredQ = connection(Users.table).count('id as count');
        applySearch(filteredQ);
        const [{ count: filtered }] = await filteredQ;

        const orderColumn = Users.#columns[column] || 'id';
        const orderDir = orderType === 'desc' ? 'desc' : 'asc';

        const dataQ = connection(Users.table).select('*');
        applySearch(dataQ);
        dataQ.orderBy(orderColumn, orderDir);
        dataQ.limit(parseInt(limit));
        dataQ.offset(parseInt(offset));

        const rows = await dataQ;

        return {
            draw: parseInt(draw),
            recordsTotal: parseInt(total),
            recordsFiltered: parseInt(filtered),
            data: rows,
        };
    }

    // DELETE
    static async delete(id) {
        if (!id) return { status: false, msg: 'ID é obrigatório' };

        try {
            await connection(Users.table).where({ id }).del();
            return { status: true, msg: 'Excluído com sucesso!' };
        } catch (err) {
            return { status: false, msg: 'Erro: ' + err.message };
        }
    }

    // UPDATE
    static async update(id, data) {
        if (!id) return { status: false, msg: 'ID é obrigatório', data: [] };

        if (!data.nome || data.nome.trim() === '') {
            return { status: false, msg: 'O campo nome é obrigatório', data: [] };
        }
        if (!data.email || data.email.trim() === '') {
            return { status: false, msg: 'O campo email é obrigatório', data: [] };
        }
        if (!data.senha || data.senha.trim() === '') {
            return { status: false, msg: 'O campo senha é obrigatório', data: [] };
        }
        if (!data.rg || data.rg.trim() === '') {
            return { status: false, msg: 'O campo RG é obrigatório', data: [] };
        }

        try {
            const clean = Users.#sanitize(data);
            delete clean.id;

            const [result] = await connection(Users.table)
                .where({ id })
                .update(clean)
                .returning('*');

            if (!result) {
                return { status: false, msg: 'Usuário não encontrado', data: [] };
            }

            return { status: true, msg: 'Atualizado com sucesso!', id: result.id, data: [result] };
        } catch (err) {
            return { status: false, msg: 'Erro: ' + err.message, data: [] };
        }
    }

    // FIND BY ID
    static async findById(id) {
        if (!id) return null;
        const row = await connection(Users.table).where({ id }).first();
        return row || null;
    }

    // SANITIZE
    static #sanitize(data) {
        const ignore = ['id', 'action', 'enterprise_id'];

        const clean = {};

        for (const [key, value] of Object.entries(data)) {
            if (ignore.includes(key)) continue;
            if (value === '' || value === null || value === undefined) continue;

            if (value === 'true') { clean[key] = true; continue; }
            if (value === 'false') { clean[key] = false; continue; }

            clean[key] = value;
        }

        return clean;
    }
}