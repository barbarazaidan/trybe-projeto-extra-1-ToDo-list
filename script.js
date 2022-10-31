const criarTarefa = document.getElementById('criar-tarefa');
const novaTarefa = document.getElementById('texto-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const botaoApaga = document.getElementById('apaga-tudo');
const botaoRemoverFinalizados = document.getElementById('remover-finalizados');
const botaoSalvarTarefas = document.getElementById('salvar-tarefas');
const botaoCima = document.getElementById('mover-cima');
const botaoBaixo = document.getElementById('mover-baixo');
const botaoRemoveSelecionado = document.getElementById('remover-selecionado');

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
// ----------------------------------------------------------------------------------------------------------------------------------------------
// para verificar se houve algum clique nos itens da lista, precisei colocar um escutador em cada item. Antes disso, criei um loop que vai percorrer os todos os itens.
// Essa solução foi MUITO COMPLEXA e gerou problema depois que ativo o localStorage, pois ela está vinculada ao botão criar tarefa. Aí refatorei para o próximo código.

// const selecionandoTarefas = () => {
//   const itemDaLista = document.getElementsByTagName('li');
//   for (let index = 0; index < itemDaLista.length; index += 1) {
//     itemDaLista[index].addEventListener('click', (event) => {
//       const selecao = event.target;
//       selecao.style.backgroundColor = 'gray';
//       selecaoUnica(event);
//     });
//   }
// };
// ----------------------------------------------------------------------------------------------------------------------------------------------

const selecionandoTarefas = (event) => {
  const selecionado = event.target;
  selecionado.style.backgroundColor = 'gray'; // quando coloco o event.target.style.backgrounColor = 'gray' de forma direta o lint dá erro: Assignment to property of function parameter 'event'
  selecaoUnica(event);
};
// ----------------------------------------------------------------------------------------------------------------------------------------------

// !!!!!! NOS DOIS CÓDIGOS COMENTADOS ABAIXO, O TOGGLE ESTÁ DANDO ERRO (QUANDO TENHO ITENS PARES NA LISTA, ELE SÓ PEGA NOS PARES; QUANDO HÁ APENAS ÍMPARES, SÓ FUNCIONA NOS ÍMPARES)!!!!!!!!

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
// ----------------------------------------------------------------------------------------------------------------------------------------------

const riscandoTarefas = (event) => {
  event.target.classList.toggle('completed');
};

const ajustandoLista = () => {
  inserindoTarefas();
  // selecionandoTarefas();
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

// ----------------------------------------------------------------------------------------------------------------------------------------------

const salvandoTarefas = () => {
  localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas.innerHTML));
};// precisei colocar o .innerHTML para o captar a informação das li que estavam dentro da listaTarefas

// aqui é onde eu, de fato, atribuo os li na lista novamente, do contrário eles ficam salvos no localStorage, mas eu não atribuo a informação à nada quando atualizo a página
const tarefasSalvas = JSON.parse(localStorage.getItem('listaTarefas'));
if (tarefasSalvas !== null) {
  listaTarefas.innerHTML = tarefasSalvas;
}

// -------------------------------------------------------------------------------------------------

const subindo = (item) => {
  const atual = item;
  const anterior = item.previousSibling;
  const texto = anterior.innerHTML;
  const classe = anterior.className;
  // const classe2 =  atual.className;
  // console.log(atual);
  // console.log(anterior);
  // console.log(classe)
  // console.log(classe2)
  anterior.innerHTML = atual.innerHTML;
  anterior.style.backgroundColor = 'gray';
  anterior.className = atual.className;
  // console.log(texto)
  atual.innerHTML = texto;
  atual.style.backgroundColor = 'white';
  atual.className = classe;
};

// As funções subindoTarefas, subindo, descendoTarefas e descendo acabam deixando o código verboso e não muito elegante. Com certeza, tem várias maneiras de refatorar esse código, que preciso verificar no futuro. Por enquanto, ainda não consigo pensar em outras alternativas de fazer mais processos.

const subindoTarefas = () => {
  const itemDaLista = document.querySelectorAll('li');
  // console.log(itemDaLista);
  for (let index = 0; index < itemDaLista.length; index += 1) {
    if (itemDaLista[index].style.backgroundColor === 'gray' && index === 0) {
      // console.log('não pode subir')
      break;
    } else if (itemDaLista[index].style.backgroundColor === 'gray') {
      subindo(itemDaLista[index]);
    }
  }
};

// -----------------------------------------------------------------------------------------------------

const descendo = (item) => {
  const atual = item;
  const proximo = item.nextSibling;
  // console.log(proximo.innerText);
  const texto = proximo.innerHTML;
  const classe = proximo.className;
  proximo.innerHTML = atual.innerHTML;
  proximo.style.backgroundColor = 'gray';
  proximo.className = atual.className;
  atual.innerHTML = texto;
  atual.style.backgroundColor = 'white';
  atual.className = classe;
};

const descendoTarefas = () => {
  const itemDaLista = document.querySelectorAll('li');
  // console.log(itemDaLista);
  for (let index = itemDaLista.length - 1; index >= 0; index -= 1) { // tive de fazer regressivo, pois de forma crescente, o item selecionado descia para a última posição da lista. Nos testes com console.log, vi que era como se ele quisesse mudar todos os itens que estavam abaixo dele de uma vez só. O que ocorre é que o loop se ativa automaticamente, pois na primeira iteração, no item [0], por exemplo, eu levo suas características para o item [1], aí quando o for entra na segunda iteração, ele ver que o item [1], agora também atende as condições apresentadas e segue nesses processo.
    if (itemDaLista[index].style.backgroundColor === 'gray' && index === itemDaLista.length - 1) {
      // console.log('não pode descer')
      break;
    } else if (itemDaLista[index].style.backgroundColor === 'gray') {
      descendo(itemDaLista[index]);
    }
  }
};

// -------------------------------------------------------------------------------------------------

const removendoSelecionados = () => {
  const itemDaLista = document.getElementsByTagName('li');
  // console.log(itemDaLista)
  for (let index = itemDaLista.length - 1; index >= 0; index -= 1) {
    if (itemDaLista[index].style.backgroundColor === 'gray') {
      itemDaLista[index].remove();
    }
  }
};

criarTarefa.addEventListener('click', ajustandoLista);
listaTarefas.addEventListener('dblclick', riscandoTarefas);
listaTarefas.addEventListener('click', selecionandoTarefas);
botaoApaga.addEventListener('click', apagandoTarefas);
botaoRemoverFinalizados.addEventListener('click', apagandoFinalizados);
botaoSalvarTarefas.addEventListener('click', salvandoTarefas);
botaoCima.addEventListener('click', subindoTarefas);
botaoBaixo.addEventListener('click', descendoTarefas);
botaoRemoveSelecionado.addEventListener('click', removendoSelecionados);
