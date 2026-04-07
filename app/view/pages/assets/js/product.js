import { get } from "jquery";

//import SellingPriceCalculator from './components/SellingPriceCalculator.js';
const Action = document.getElementById('action');
const Id = document.getElementById('id');
const totaltax = document.getElementById('total_imposto');
const profitMargin = document.getElementById('margem_lucro');
const operatingCost = document.getElementById('custo_operacional');
const purchasePrice = document.getElementById('preco_compra');
const sellingPrice = document.getElementById('preco_venda');
const form = document.getElementById('form');
Inputmask("currency", {
    radixPoint: ',',
    inputtype: "text",
    prefix: 'R$ ',
    autoGroup: true,
    groupSeparator: '.',
    rightAlign: false,
    onBeforeMask: function (value) {
        return String(value).replace('.', ',');
    }
}).mask("#preco_venda, #preco_compra");
imputMask("currency", {
    radixPoint: ',',
    inputtype: "text",
    prefix: 'R$ ',
    autoGroup: true,
    groupSeparator: '.',
    rightAlign: false,
    onBeforeMask: function (value) {
        return String(value).replace('.', ',');
    }
}).mask("#total_imposto, #margem_lucro, #custo_operacional");

totaltax.addEventListener('keypress',);
const tax = String(totaltax.value).replace( 'R$ ', '').replace('.', '').replace(',', '.');
const result = SellingPriceCalculator.create()
addTotalTax(tax)
getData();
document.getElementById('total_imposto_value').innerHTML = ${result.valor_total_imposto};
document.getElementById('margem_lucro_value').innerHTML = ${result.valor_margem_lucro};
document.getElementById('preco_venda_value').innerHTML = ${result.valor_venda_sugerido}             





//  CARREGA DADOS DE EDIÇÃO (se existirem)
(async () => {
    const editData = await api.temp.get('product:edit');
    if (editData) {
        // Modo edição
        Action.value = editData.action || 'e';
        Id.value = editData.id || '';
        // Preenche todos os campos pelo atributo name
        for (const [key, value] of Object.entries(editData)) {
            const field = form.querySelector(`[name="${key}"]`);
            if (!field) continue;

            if (field.type === 'checkbox') {
                field.checked = value === true || value === 'true';
            } else {
                field.value = value || '';
            }
        }
    } else {
        // Modo cadastro novo
        Action.value = 'c';
        Id.value = '';
    }
})();