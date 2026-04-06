import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { fornecedor } from '../schema.js';
import { ilike, or, sql, asc } from 'drizzle-orm';

export default class FornecedorRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(fornecedor).values({
                name: data.name,
                cpf_cnpj: data.cpf_cnpj,
                telefone: data.telefone
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
    static async search(data) {
        //Captura o termo de pesquisa sem o %%
        const rawSearch = String(data?.term ?? '').trim();
        //Captura o termo da pesquisa já aplicando o %%
        const terms = `%${data?.term}%`;
        try {
            //Abre a conexão com banco de dados
            const client = await Connection.connect();
            const db = drizzle(client);
            const whereClause =
                rawSearch !== ''
                    ? or(
                        sql`${fornecedor.id}::text ILIKE ${terms}`,
                        ilike(fornecedor.name, terms),
                        sql`${fornecedor.cpf_cnpj}::text ILIKE ${terms}`,
                        sql`${fornecedor.telefone}::text ILIKE ${terms}`
                    )
                    : undefined;

            const result = await db
                .select()
                .from(fornecedor)
                .where(whereClause)
                .orderBy(asc(fornecedor.name))
                .offset(data?.offset)
                .limit(data?.limit);

            return {
                data: result
            };
        } catch (error) {
            console.error('[fornecedorRepository] Erro na busca:', error.message);
            return {
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
            };
        }
    }

}