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
      itemDaLista[index].style.backgroundColor = 'white';
    }
  }
}

// para verificar se houve algum clique nos itens da lista, precisei colocar um escutador em cada item. Antes disso, criei um loop que vai percorrer os todos os itens
const selecionandoTarefas = () => {
  const itemDaLista = document.getElementsByTagName('li');
  for (let index = 0; index < itemDaLista.length; index += 1) {
    itemDaLista[index].addEventListener('click', (event) => {
      const selecao = event.target;
      selecao.style.backgroundColor = 'gray';
      selecaoUnica(event);
    });
  }
};

// NOS DOIS CÓDIGOS COMENTADOS ABAIXO, O TOGGLE ESTÁ DANDO ERRO (QUANDO TENHO ITENS PARES NA LISTA, ELE SÓ PEGA NOS PARES; QUANDO HÁ APENAS ÍMPARES, SÓ FUNCIONA NOS ÍMPARES) Não entendi

// const riscandoTarefas = () => {
//   const itemDaLista = document.getElementsByTagName('li');
//   for (let index = 0; index < itemDaLista.length; index += 1) {
//     itemDaLista[index].addEventListener('dblclick',(event) => {
//       event.target.classList.toggle('completed');
//     });
//   }
// };

// const riscandoTarefas = () => {
//   const itemDaLista = document.getElementsByTagName('li');
//   for (let index = 0; index < itemDaLista.length; index += 1) {
//     itemDaLista[index].addEventListener('dblclick',(event) => {
//       if (event.target.className === 'completed') {
//         event.target.classList.remove('completed')
//       } else {
//         event.target.className = 'completed';
//       }
//     });
//   }
// };

const riscandoTarefas = (event) => {
  event.target.classList.toggle('completed');
};

const ajustandoLista = () => {
  inserindoTarefas();
  selecionandoTarefas();
  // riscandoTarefas();
};

criarTarefa.addEventListener('click', ajustandoLista);
listaTarefas.addEventListener('dblclick', riscandoTarefas);
