const criarTarefa = document.getElementById('criar-tarefa');
const novaTarefa = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const botaoApaga = document.getElementById('apaga-tudo');
const botaoRemoverFinalizados = document.getElementById('remover-finalizados');

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

const apagandoTarefas = () => {
  listaTarefas.innerHTML = '';
};
// ---------------------------------------------------------------------------
// O código abaixo resulta em um HTML collection, assim quando ele apaga o elemento no index 0, a lista é reordenada, ou seja, o elemento que estava no index 1, vai para o 0. Isso faz com que o loop não se desenvolva corretamente, afinal o index pelo qual ele já passou acaba de ter um novo elemento com a reordenação (é a questão de pilha e lista que preciso estudar melhor).

// const apagandoFinalizados = () => {
//   const itemCompleto = document.getElementsByClassName('completed');
//   console.log(itemCompleto)
//   for (let index = 0; index < itemCompleto.length; index += 1) {
//     itemCompleto[index].remove();
//   }
// };

// ----------------------------------------------------------------------------

// Caso eu queira que o código funciona usando HTML collection, preciso fazer o for de trás para frente, pois isso faz com que a reordenação não atrapalhe o processo do loop, afinal não entrará mais nenhum elemento nos últimos índices, pois a pilha vai descendo e não subindo.

// const apagandoFinalizados = () => {
//   const itemCompleto = document.getElementsByClassName('completed');
//   console.log(itemCompleto)
//   for (let index = itemCompleto.length -1 ; index >= 0; index -= 1) {
//     itemCompleto[index].remove();
//   }
// };

// ------------------------------------------------------------------------

// Usando o querySelectorAll, eu trabalho com uma nodeList, isso faz com que o loop do for funcione normalmente seja com contador crescente ou decrescente.

const apagandoFinalizados = () => {
  const itemCompleto = document.querySelectorAll('.completed');
  // console.log(itemCompleto)
  for (let index = 0; index < itemCompleto.length; index += 1) {
    itemCompleto[index].remove();
  }
};

criarTarefa.addEventListener('click', ajustandoLista);
listaTarefas.addEventListener('dblclick', riscandoTarefas);
botaoApaga.addEventListener('click', apagandoTarefas);
botaoRemoverFinalizados.addEventListener('click', apagandoFinalizados);
