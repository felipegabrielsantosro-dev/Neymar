const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cpf_cnpj: document.getElementById('cpf_cnpj').value,
        telefone: document.getElementById('telefone').value
    };

    try {
        const result = await window.electronAPI.saveFornecedor(data);
        Swal.fire({
            title: "Fornecedor cadastrado com sucesso!",
            icon: "success",
            draggable: true
        });
        console.log('Fornecedor cadastrado com sucesso:', result);
    } catch (error) {
        Swal.fire({
            title: "Erro ao cadastrar fornecedor:",
            text:  error,
            icon: "error"
        });
        console.error('Erro ao cadastrar fornecedor:', error);
    }
});