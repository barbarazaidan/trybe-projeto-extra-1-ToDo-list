const criarTarefa = document.getElementById('criar-tarefa');
const novaTarefa = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

const inserindoTarefas = () => {
  const itemDaLista = document.createElement('li');
  listaTarefas.appendChild(itemDaLista);
  itemDaLista.innerText = novaTarefa.value;
  novaTarefa.value = '';
};

const criandoClasse = () => {
  const itemDaLista = document.getElementsByTagName('li');
  for (let index = 0; index < itemDaLista.length; index += 1) {
    if (itemDaLista[index].style.backgroundColor = 'gray') {
      itemDaLista[index].classList.add('marcado');
    }
  }
};

const verificandoClasse = () => {
  const itemDaLista = document.getElementsByTagName('li');
  for (let index = 0; index < itemDaLista.length; index += 1) {
    
  }
};

// para verificar se houve algum clique nos itens da lista, precisei colocar um escutador em cada item. Antes disso, criei um loop que vai percorrer os todos os itens
const selecionandoTarefas = () => {
  const itemDaLista = document.getElementsByTagName('li');
  for (let index = 0; index < itemDaLista.length; index += 1) {
    itemDaLista[index].addEventListener('click', () => {
      itemDaLista[index].style.backgroundColor = 'gray';
      criandoClasse();
      verificandoClasse();
    });
  }
};

const ajustandoLista = () => {
  inserindoTarefas();
  selecionandoTarefas();
};

criarTarefa.addEventListener('click', ajustandoLista);
