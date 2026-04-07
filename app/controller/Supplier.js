import connection from '../database/Connection.js';

export default class Supplier {
    // Tabela no banco
    static table = 'supplier';

    // Mapeamento: índice da coluna no DataTable → nome no banco
    static #columns = ['id', 'nome_fantasia', 'razao_social', 'cnpj', null];

    // Colunas pesquisáveis pelo termo de busca
    static #searchable = ['nome_fantasia', 'razao_social', 'cnpj'];

    // Insere um novo fornecedor
    static async insert(data) {
        if (!data.nome_fantasia || data.nome_fantasia.trim() === '') {
            return { status: false, msg: 'O campo Nome Fantasia é obrigatório', id: null, data: [] };
        }

        try {
            const clean = Supplier.#sanitize(data);

            const [result] = await connection(Supplier.table)
                .insert(clean)
                .returning('*');

            return { status: true, msg: 'Salvo com sucesso!', id: result.id, data: [result] };
        } catch (err) {
            return { status: false, msg: 'Erro: ' + err.message, id: null, data: [] };
        }
    }

    // Pesquisa fornecedores
    static async find(data = {}) {
        const { term = '', limit = 10, offset = 0, orderType = 'asc', column = 0, draw = 1 } = data;

        // Total sem filtro
        const [{ count: total }] = await connection(Supplier.table).count('id as count');

        // Monta WHERE da busca
        const search = term?.trim();
        function applySearch(query) {
            if (search) {
                query.where(function () {
                    for (const col of Supplier.#searchable) {
                        this.orWhereRaw(`CAST("${col}" AS TEXT) ILIKE ?`, [`%${search}%`]);
                    }
                });
            }
            return query;
        }

        // Total filtrado
        const filteredQ = connection(Supplier.table).count('id as count');
        applySearch(filteredQ);
        const [{ count: filtered }] = await filteredQ;

        // Dados paginados
        const orderColumn = Supplier.#columns[column] || 'id';
        const orderDir = orderType === 'desc' ? 'desc' : 'asc';
        const dataQ = connection(Supplier.table).select('*');
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

    // Exclui fornecedor
    static async delete(id) {
        if (!id) return { status: false, msg: 'ID é obrigatório' };

        try {
            await connection(Supplier.table).where({ id }).del();
            return { status: true, msg: 'Excluído com sucesso!' };
        } catch (err) {
            return { status: false, msg: 'Erro: ' + err.message };
        }
    }

    // Atualiza fornecedor
    static async update(id, data) {
        if (!id) return { status: false, msg: 'ID é obrigatório', data: [] };

        if (!data.nome_fantasia || data.nome_fantasia.trim() === '') {
            return { status: false, msg: 'O campo Nome Fantasia é obrigatório', data: [] };
        }

        try {
            const clean = Supplier.#sanitize(data);
            delete clean.id; // Remove ID para não atualizar PK

            const [result] = await connection(Supplier.table)
                .where({ id })
                .update(clean)
                .returning('*');

            if (!result) {
                return { status: false, msg: 'Fornecedor não encontrado', data: [] };
            }

            return { status: true, msg: 'Atualizado com sucesso!', id: result.id, data: [result] };
        } catch (err) {
            return { status: false, msg: 'Erro: ' + err.message, data: [] };
        }
    }

    // Retorna um fornecedor pelo ID
    static async findById(id) {
        if (!id) return null;

        const row = await connection(Supplier.table)
            .where({ id })
            .first();

        return row || null;
    }

    // Sanitiza dados: remove campos vazios ou não permitidos
    static #sanitize(data) {
        const ignore = ['id', 'action'];
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