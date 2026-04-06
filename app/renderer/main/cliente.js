const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    };

    try {
        const result = await window.electronAPI.saveCliente(data);
        Swal.fire({
            title: "Cadastro realizado com sucesso!",
            icon: "success",
            draggable: true
        });
        console.log('cadastro realizado com sucesso:', result);
    } catch (error) {
        Swal.fire({
            title: "Erro ao cadastrar cliente:",
            text:  error,
            icon: "error"
        });
        console.error('Erro ao cadastrar cliente', error);
    }
});