import { Datatables } from "../components/Datatables.js";

// Atualiza a tabela quando a API sinaliza reload
api.user.onReload(() => {
    $('#table-users').DataTable().ajax.reload(null, false);
});

// Inicializa a tabela
Datatables.SetTable('#table-users', [
    { data: 'id' },
    { data: 'nome' },
    { data: 'email' },
    { data: 'enterprise_id' },
    { 
        data: 'ativo',
        render: function (value) {
            return value ? 'Sim' : 'Não';
        }
    },
    {
        data: null,
        orderable: false,
        searchable: false,
        render: function (row) {
            return `
                <button onclick="editUser(${row.id})" class="btn btn-xs btn-warning btn-sm">
                    <i class="fa-solid fa-pen-to-square"></i> Editar
                </button>
                <button onclick="deleteUser(${row.id})" class="btn btn-xs btn-danger btn-sm">
                    <i class="fa-solid fa-trash"></i> Excluir
                </button>
            `;
        }
    }
]).getData(filter => api.user.find(filter));

// Função para excluir usuário
async function deleteUser(id) {
    const result = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Esta ação não pode ser desfeita.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
        const response = await api.user.delete(id);

        if (response.status) {
            toast('success', 'Excluído', response.msg);
            $('#table-users').DataTable().ajax.reload();
        } else {
            toast('error', 'Erro', response.msg);
        }
    }
}

// Função para editar usuário
async function editUser(id) {
    try {
        // 1. Busca os dados completos do usuário
        const user = await api.user.findById(id);
        if (!user) {
            toast('error', 'Erro', 'Usuário não encontrado.');
            return;
        }

        // 2. Salva no temp store com a ação 'e' (editar)
        await api.temp.set('user:edit', {
            action: 'e',
            ...user,
        });

        // 3. Abre a modal com o caminho correto
        api.window.openModal('pages/user.html', { // <- adicionamos .html
            width: 600,
            height: 500,
            title: 'Editar Usuário',
        });

    } catch (err) {
        toast('error', 'Falha', 'Erro: ' + err.message);
    }
}

// Expor funções para o escopo global (necessário para onclick)
window.deleteUser = deleteUser;
window.editUser = editUser;