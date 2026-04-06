const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
    };

    try {
        const result = await window.electronAPI.saveProduct(data);
        Swal.fire({
            title: "Produto salvo com sucesso!",
            icon: "success",
            draggable: true
        });
        console.log('Produto salvo com sucesso:', result);
    } catch (error) {
        Swal.fire({
            title: "Erro ao salvar produto:",
            text:  error,
            icon: "error"
        });
        console.error('Erro ao salvar produto:', error);
    }
});