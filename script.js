addEventListener('DOMContentLoaded', () => {
    adicionarTarefa()
    adicionarData()
})

function adicionarData() {
    const data = new Date()

    let diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    let nomeDiaSemana = diasSemana[data.getDay()];

    let mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    let mesAbreviado = mesesAbreviados[data.getMonth()];

    let dia = data.getDate()
    const ano = data.getFullYear()

    const dataInteira = nomeDiaSemana + ", " + dia + " de " + mesAbreviado + " de " + ano
    const elementoData = document.createElement('div')
    elementoData.textContent = dataInteira

    elementoData.classList.add('data')
    const titulo = document.querySelector('.titulo')

    titulo.insertAdjacentElement('afterend', elementoData)
}

function adicionarTarefa() {
    const campoConteudoDigitado = document.querySelector('.tarefa-adicionar-campo')
    const btnAdicionar = document.querySelector('.tarefa-adicionar-btn')


    btnAdicionar.addEventListener('click', () => {
        if (campoConteudoDigitado.value == "") {
            alert('Adicione uma tarefa no campo')
        }
        else {
            criarTarefa()
            limparCampo(campoConteudoDigitado)
        }
    })


    function criarTarefa() {
        const tarefasBox = document.querySelector('.tarefas-lista')
        const tarefa = document.createElement('li')
        const conteudoDigitado = document.querySelector('.tarefa-adicionar-campo').value

        if (tarefasBox.classList.contains('tarefas-lista-escondida')) {
            tarefasBox.classList.remove('tarefas-lista-escondida')
        }

        const tarefaConteudo = `
            <input class="tarefa-concluir" type="checkbox" onchange="concluir(this)">
            <p class="tarefa-conteudo-digitado">${conteudoDigitado}</p>
            <div class="tarefa-btns">
                <img class="tarefa-btn-editar" src="imgs/editar.svg" onclick="editar(this)">
                <img class="tarefa-btn-excluir" src="imgs/excluir.svg" onclick="excluir(this)">
            </div>
        `

        tarefa.classList.add('tarefa')

        tarefasBox.append(tarefa)
        tarefa.innerHTML = tarefaConteudo
    }
}

function limparCampo(campoConteudoDigitado) {
    campoConteudoDigitado.value = ""
}

function concluir(checkBox) {
    const tarefa = checkBox.nextElementSibling

    if (checkBox.checked) {
        tarefa.classList.add('tarefa-concluida')
    }
    else {
        tarefa.classList.remove('tarefa-concluida')
    }
}

function editar(btnEditar) {
    const modal = document.querySelector('.modal-editar')
    const modalInput = document.querySelector('.modal-editar-input')
    const modalBtnSalvar = document.querySelector('.modal-editar-btn-salvar')
    const modalBtnFechar = document.querySelector('.modal-btn-fechar')
    const conteudoDigitado = btnEditar.parentElement.previousElementSibling

    abrirModal()

    modalInput.value = conteudoDigitado.textContent

    modalBtnSalvar.onclick = salvar
    modalBtnFechar.onclick = fecharModal

    function salvar() {
        if (modalInput.value == "") {
            alert('Adicione uma tarefa no campo')
        }
        else {
            conteudoDigitado.textContent = modalInput.value

            fecharModal()
        }
    }

    function abrirModal() {
        modal.showModal()
    }

    function fecharModal() {
        modal.close()
    }
}

function excluir(btnLixeira) {
    const tarefa = btnLixeira.closest('.tarefa')
    const tarefasBox = tarefa.parentElement

    tarefa.remove(tarefa)

    if (tarefasBox.hasChildNodes() == false) {
        tarefasBox.classList.add('tarefas-lista-escondida')
    }
}