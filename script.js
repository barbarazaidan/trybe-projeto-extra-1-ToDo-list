const criarTarefa = document.getElementById('criar-tarefa');
const novaTarefa = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

const inserindoTarefas = () => {
  const itemDaLista = document.createElement('li');
  listaTarefas.appendChild(itemDaLista);
  itemDaLista.innerText = novaTarefa.value;
  novaTarefa.value = '';
};

// utilizei o recurso event para conseguir isolar o item selecionado no momento e, assim, analisar os demais itens da lista, manipulando o background para estar em apenas um item a cada click
function selecaoUnica(evento) {
  const itemDaLista = document.getElementsByTagName('li');
  for (let index = 0; index < itemDaLista.length; index += 1) {
    if (itemDaLista[index] !== evento.target) {
      itemDaLista[index].style.backgroundColor = 'white'
    }
  }
};

// function mudandoBackground() {
//   const itemDaLista = document.getElementsByTagName('li');
//   for (let index = 0; index < itemDaLista.length; index += 1) {
//     if (itemDaLista[index].className === 'marcado') {
//       itemDaLista[index].style.backgroundColor = 'gray';
//     }
//   }
// };

// para verificar se houve algum clique nos itens da lista, precisei colocar um escutador em cada item. Antes disso, criei um loop que vai percorrer os todos os itens
const selecionandoTarefas = () => {
  const itemDaLista = document.getElementsByTagName('li');
  for (let index = 0; index < itemDaLista.length; index += 1) {
    itemDaLista[index].addEventListener('click', (event) => {
      // event.target.classList.add('marcado')
      event.target.style.backgroundColor = 'gray'
      selecaoUnica(event)
    }); 
  }
};

const ajustandoLista = () => {
  inserindoTarefas();
  selecionandoTarefas();
};

criarTarefa.addEventListener('click', ajustandoLista);
