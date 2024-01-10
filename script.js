addEventListener('DOMContentLoaded', () => {
    adicionarTarefa()
    adicionarData()
})



function adicionarData() {
    const titulo = document.querySelector('.titulo')
    const data = new Date()
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
    const nomeDiaSemana = diasSemana[data.getDay()]
    const dia = data.getDate()
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()

    const dataInteira = nomeDiaSemana + ", " + dia + " de " + mes + " de " + ano

    const elementoData = document.createElement('div')
    elementoData.textContent = dataInteira
    elementoData.classList.add('data')

    titulo.insertAdjacentElement('afterend', elementoData)
}

function adicionarTarefa() {
    const campoConteudoDigitado = document.querySelector('.tarefa-adicionar-campo')
    const btnAdicionar = document.querySelector('.tarefa-adicionar-btn')

    // Carrega as tarefas salvas ao carregar a página
    window.addEventListener('load', () => {
        const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'))

        if (tarefasSalvas) {
            tarefasSalvas.forEach(tarefa => {
                criarTarefa(tarefa)
            })
        }
    })

    // Carrega as tarefas concluídas
    window.addEventListener('load', () => {
        const checkboxes = document.querySelectorAll('.tarefa-concluir');
    
        checkboxes.forEach(checkBox => {
            const tarefa = checkBox.nextElementSibling;
            const estaConcluida = localStorage.getItem(tarefa.textContent);

            if (estaConcluida == 'concluida') {
                checkBox.checked = true;
                tarefa.classList.add('tarefa-concluida');
            }
        })
    })


    btnAdicionar.addEventListener('click', () => {
        if (campoConteudoDigitado.value == "") {
            alert('Adicione uma tarefa no campo')
        }
        else {
            criarTarefa(campoConteudoDigitado.value)
            limparCampo(campoConteudoDigitado)
            atualizarListaTarefasLocalStorage()
        }
    })


    function criarTarefa(conteudo) {
        const tarefasBox = document.querySelector('.tarefas-lista')
        const tarefa = document.createElement('li')

        if (tarefasBox.classList.contains('tarefas-lista-escondida')) {
            tarefasBox.classList.remove('tarefas-lista-escondida')
        }

        const tarefaConteudo = `
            <input class="tarefa-concluir" type="checkbox" onchange="concluir(this)">
            <p class="tarefa-conteudo-digitado">${conteudo}</p>
            <div class="tarefa-btns">
                <img class="tarefa-btn-editar" src="imgs/editar.svg" onclick="editar(this)">
                <img class="tarefa-btn-excluir" src="imgs/excluir.svg" onclick="excluir(this)">
            </div>
        `

        tarefa.classList.add('tarefa')

        tarefa.innerHTML = tarefaConteudo
        tarefasBox.append(tarefa)
    }
}

function limparCampo(campoConteudoDigitado) {
    campoConteudoDigitado.value = ""
}

function concluir(checkBox) {
    console.log('checkbox0', checkBox)

    const tarefa = checkBox.nextElementSibling

    if (checkBox.checked) {
        tarefa.classList.add('tarefa-concluida')

        localStorage.setItem(tarefa.textContent, 'concluida')
    } 
    else {
        tarefa.classList.remove('tarefa-concluida')

        localStorage.removeItem(tarefa.textContent)
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
            atualizarListaTarefasLocalStorage()
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

    atualizarListaTarefasLocalStorage()
}

function atualizarListaTarefasLocalStorage() {
    const tarefas = Array.from(document.querySelectorAll('.tarefa'))
    const tarefasParaSalvar = tarefas.map(tarefa => {
        return tarefa.querySelector('.tarefa-conteudo-digitado').innerText
    })

    localStorage.setItem('tarefas', JSON.stringify(tarefasParaSalvar))
}