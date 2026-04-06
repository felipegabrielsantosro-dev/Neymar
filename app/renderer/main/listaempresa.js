<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializa o DataTable no modo Server Side (conecta direto com seu Repository)
    const table = $('#tabela').DataTable({
        responsive: true,
        processing: true,
        serverSide: true, // Deixa o banco filtrar e paginar
        ajax: async (data, callback) => {
            const filter = {
                term: data?.search?.value || '', // Termo da pesquisa
                limit: data?.length || 10,       // Registros por página
                offset: data?.start || 0,        // Ponto de início
                orderType: data?.order[0]?.dir, 
                column: data?.order[0]?.column  
            };

            try {
                // Chama a ponte do Electron
                const response = await window.electronAPI.searchCompany(filter);
                
                callback({
                    draw: data.draw,
                    // Se o seu repository não retornar totais, usamos o tamanho do array
                    recordsTotal: response?.recordsTotal ?? response?.data?.length ?? 0,
                    recordsFiltered: response?.recordsFiltered ?? response?.data?.length ?? 0,
                    data: response?.data ?? []
                });
            } catch (error) {
                console.error(`Erro na busca: ${error.message}`);
                callback({ draw: 0, recordsTotal: 0, recordsFiltered: 0, data: [] });
            }
        },
        columns: [
            { data: 'id', title: 'Código' },
            { data: 'name', title: 'Nome' },
            { data: 'cnpj', title: 'CNPJ' }
        ],
        // Traduções manuais (para evitar o erro de i18n da imagem anterior)
        language: {
            search: "Pesquisar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Exibindo _START_ até _END_ de _TOTAL_ registros",
            paginate: { previous: "Anterior", next: "Próximo" },
            emptyTable: "Nenhum empresa encontrado."
        }
    });

    // --- Seus botões originais permanecem aqui ---
    const voltarButton = document.getElementById('voltar-button');
    const cadastroButton = document.getElementById('cadastro-button');

    voltarButton.addEventListener('click', async () => {
        try { await window.electronAPI.goHome(); } catch (e) { console.error(e); }
    });

    cadastroButton.addEventListener('click', async () => {
        try { await window.electronAPI.openPage('empresa.html'); } catch (e) { console.error(e); }
    });
});
=======
const table = new DataTable('#tabela-empresa', {
    responsive: true,
    processing: true,
    serverSide: true,
    ajax: async (data, callback) => {
        const filter = {
            term: data?.search?.value,      //Termo da pesquisa
            limit: data?.length,            //Limite de resgistos a ser selecionado do banco
            offset: data?.start,            //A pesquinsa inicia no registro Ex: 5, 10
            orderType: data?.order[0]?.dir, //Tipo de ordenação 
            column: data?.order[0]?.column  //Coluna a ser filtrada
        }
        try {
            const response = await window.electronAPI.searchCompany(filter);
            callback({
                draw: response?.draw ?? data?.draw ?? 0,
                recordsTotal: response?.recordsTotal ?? 0,
                recordsFiltered: response?.recordsFiltered ?? 0,
                data: response?.data ?? []
            });
        } catch (error) {
            console.error(`Restrição: ${error.message}`);
            callback({
                draw: 0,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
            });
        }
    },
    columns: [
        { data: 'id', title: 'Código' },
        { data: 'name', title: 'Nome' },
        { data: 'cnpj', title: 'Cnpj' }
    ]
});
>>>>>>> ba99953b50f505b28f9d774d2f9d2010416be560
