// Importa Datatables
import { Datatables } from "../components/Datatables.js";

// Atualiza tabela quando houver reload
api.supplier.onReload(() => {
    $('#table-supplier').DataTable().ajax.reload(null, false);
});

// Inicializa a tabela
Datatables.SetTable('#table-supplier', [
    { data: 'id' },
    { data: 'nome_fantasia' }, // Nome Fantasia
    { data: 'razao_social' },  // Razão Social
    { data: 'cnpj' },
    {
        data: 'ativo',
        render: function (data) {
            return data
                ? `<span>Ativo <i class="fa-regular fa-square-check"></i></span>`
                : `<span>Inativo <i class="fa-regular fa-square-full"></i></span>`;
        }
    },
    {
        data: 'criado_em',
        render: function (data) {
            return new Date(data).toLocaleString('pt-BR');
        }
    },
    {
        data: 'atualizado_em',
        render: function (data) {
            return new Date(data).toLocaleString('pt-BR');
        }
    },
    {
        data: null,
        orderable: false,
        searchable: false,
        render: function (row) {
            return `
                <button onclick="editSupplier(${row.id})" class="btn btn-xs btn-warning btn-sm">
                    <i class="fa-solid fa-pen-to-square"></i> Editar
                </button>
                <button onclick="deleteSupplier(${row.id})" class="btn btn-xs btn-danger btn-sm">
                    <i class="fa-solid fa-trash"></i> Excluir
                </button>
            `;
        }
    }
]).getData(filter => api.supplier.find(filter));

// Função para excluir fornecedor
async function deleteSupplier(id) {
    const result = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Esta ação não pode ser desfeita.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
        const response = await api.supplier.delete(id);
        if (response.status) {
            toast('success', 'Excluído', response.msg);
            $('#table-suppliers').DataTable().ajax.reload();
        } else {
            toast('error', 'Erro', response.msg);
        }
    }
}

// Função para editar fornecedor
async function editSupplier(id) {
    try {
        const supplier = await api.supplier.findById(id);
        if (!supplier) {
            toast('error', 'Erro', 'Fornecedor não encontrado.');
            return;
        }
        await api.temp.set('supplier:edit', {
            action: 'e',
            ...supplier,
        });
        api.window.openModal('pages/supplier', {
            width: 900,
            height: 600,
            title: 'Editar Fornecedor',
        });
    } catch (err) {
        toast('error', 'Falha', 'Erro: ' + err.message);
    }
}

// Torna as funções globais
window.deleteSupplier = deleteSupplier;
window.editSupplier = editSupplier;