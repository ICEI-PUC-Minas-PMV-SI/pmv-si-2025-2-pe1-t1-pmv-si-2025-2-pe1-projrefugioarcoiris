// Lista de direitos com textos revisados e ampliados
const direitos = [
  {
    titulo: "Direito à Dignidade",
    descricao: "A orientação sexual e identidade de gênero fazem parte da dignidade humana. Toda pessoa tem direito ao respeito, à autoestima e à busca pela própria felicidade."
  },
  {
    titulo: "Direito à Saúde",
    descricao: "Acesso igualitário aos serviços de saúde, incluindo suporte psicológico, terapia hormonal, procedimentos de redesignação e informações de qualidade — sem discriminação."
  },
  {
    titulo: "Nome Social",
    descricao: "Pessoas trans têm o direito de usar o nome que corresponde à sua identidade em chamadas, fichas, prontuários, cadastros e demais registros oficiais."
  },
  {
    titulo: "Direitos de Cidadania",
    descricao: "Acesso a políticas públicas que garantem igualdade, oportunidades de trabalho, renda e participação plena na sociedade."
  },
  {
    titulo: "União Estável e Casamento",
    descricao: "Casais homoafetivos têm os mesmos direitos de uniões heterossexuais, incluindo pensão, herança e adoção."
  },
  {
    titulo: "Adoção",
    descricao: "Casais LGBTQIA+ têm direito de formar família, adotando crianças e adolescentes com proteção legal e reconhecimento social."
  },
  {
    titulo: "LGBTQIA+fobia é crime?",
    descricao: "Sim! Desde 2019, o STF equiparou homofobia e transfobia ao crime de racismo. Discriminar alguém por orientação sexual ou identidade de gênero pode resultar em prisão."
  },

];

let ultimoIndice = -1;

function proximoIndiceAleatorio(lista) {
  let novoIndice;
  do {
    novoIndice = Math.floor(Math.random() * lista.length);
  } while (novoIndice === ultimoIndice);
  ultimoIndice = novoIndice;
  return novoIndice;
}

/**
 * Função Reutilizável para fechar qualquer modal.
 * @param {string} modalId - O ID do elemento modal a ser fechado.
 */
function fecharModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal && modal.style.display !== "none") { // Verifica se está visível
    // 1. Remove a classe 'open' para animar o fechamento
    modal.classList.remove('open');

    // 2. Esconde completamente após a animação (300ms, conforme o CSS)
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
}

// FUNÇÃO para abrir o modal de Direitos (Aleatório)
function mostrarTabela() {
  const direito = direitos[proximoIndiceAleatorio(direitos)];
  const conteudoHTML = `
        <h3 class="modal-title">${direito.titulo}</h3>
        <table class="direitos-table">
            <tbody>
                <tr>
                    <td>Descrição</td>
                    <td>${direito.descricao}</td>
                </tr>
            </tbody>
        </table>
    `;

  // 1. Injeta o conteúdo no container dentro do modal
  document.getElementById("conteudoDireito").innerHTML = conteudoHTML;

  // 2. Torna o modal visível
  const modal = document.getElementById("modalDireito");
  modal.style.display = "flex"; // Usa flex para centralizar

  // 3. Adiciona a classe 'open' para iniciar a animação (após um pequeno delay)
  setTimeout(() => {
    modal.classList.add('open');
  }, 10);
}


// Dados estáticos para a tabela de Canais de Denúncia
const canaisDenuncia = [
  {
    telefone: "Ligue 180",
    descricao: "Central de Atendimento à Mulher. Oferece escuta, acolhimento e informações.",
    // Adicione o URL de destino
    url: "https://www.gov.br/mulheres/pt-br/ligue180"
  },
  {
    telefone: "Disque 100",
    descricao: "Secretaria Nacional de Direitos Humanos. Para denúncias de violações de direitos humanos em geral.",
    // Adicione o URL de destino
    url: "https://www.gov.br/pt-br/servicos/denunciar-violacao-de-direitos-humanos"
  },
  {
    telefone: "Defensoria Pública",
    descricao: "Busque a unidade mais próxima para apoio jurídico gratuito.",
    // Adicione o URL de destino (Exemplo para o site da DPU)
    url: "https://www.defensoria.sp.gov.br/institucional/organograma"
  }
];

function mostrarModalCanais() {
  const tabelaConteudo = canaisDenuncia.map(canal => {

    // 1. Cria o elemento de link
    const linkTelefone = `<a href="${canal.url}" target="_blank" rel="noopener noreferrer">${canal.telefone}</a>`;

    // 2. Retorna a linha da tabela com o link na primeira célula
    return `
            <tr>
                <td>${linkTelefone}</td>
                <td>${canal.descricao}</td>
            </tr>
        `;
  }).join('');

  const tabelaHTML = `
        <h3 class="modal-title">Canais Oficiais de Denúncia</h3>
        <table class="canais-table">
            <thead>
                <tr>
                    <th>Telefone / Órgão</th>
                    <th>Detalhes</th>
                </tr>
            </thead>
            <tbody>
                ${tabelaConteudo}
            </tbody>
        </table>
    `;

  // 1. Injeta o conteúdo no container dentro do modal
  document.getElementById("conteudoCanais").innerHTML = tabelaHTML;

  // 2. Torna o modal visível
  const modal = document.getElementById("modalCanais");
  modal.style.display = "flex";

  // 3. Adiciona a classe 'open' para iniciar a animação
  setTimeout(() => {
    modal.classList.add('open');
  }, 10);
}

// Opcional: Fechar o modal clicando fora dele (CORRIGIDO)
window.onclick = function (event) {
  const modalDireito = document.getElementById("modalDireito");
  const modalCanais = document.getElementById("modalCanais");

  // Verifica se o clique foi no overlay do modal Direitos
  if (event.target === modalDireito) {
    fecharModal('modalDireito');
  }

  // Verifica se o clique foi no overlay do modal Canais
  if (event.target === modalCanais) {
    fecharModal('modalCanais');
  }
}
const lista = document.getElementById('listaDenuncia');
if (lista) {
  const itens = lista.querySelectorAll('li');
  const totalItens = itens.length;
  let indiceAtual = 0;
  const intervalo = 5000; // 5 segundos

  // 1. Função para resetar (esconder) todos os itens da lista
  function resetarLista() {
    itens.forEach(item => {
      item.classList.remove('ativo');
    });
    indiceAtual = 0;
  }

  // 2. Função principal que exibe o próximo item
  function exibirProximoItem() {
    // Verifica se o loop chegou ao fim
    if (indiceAtual >= totalItens) {
      // Se sim, reseta a lista e retorna para começar o próximo ciclo do loop
      resetarLista();
      // A primeira chamada no novo ciclo será feita no próximo intervalo
      return;
    }

    // Pega o item atual a ser exibido
    const itemAtual = itens[indiceAtual];

    // Exibe o item atual (ele fica e se empilha com o anterior)
    if (itemAtual) {
      itemAtual.classList.add('ativo');
    }

    // Move para o próximo índice
    indiceAtual++;
  }

  // Função que gerencia o loop e o reset
  function iniciarLoopEmpilhado() {
    // Reseta a lista (para garantir que esteja limpa ao iniciar)
    resetarLista();

    // Inicia o intervalo de exibição
    setInterval(() => {
      // A cada 5 segundos, chama a função para exibir o próximo item
      exibirProximoItem();
    }, intervalo);
  }

  // Inicia o processo
  iniciarLoopEmpilhado();
}
// **********************************************
// Lógica para a lista de Retificação de Nome/Gênero
// **********************************************

const listaRetificacao = document.getElementById('listaRetificacao');
if (listaRetificacao) {
  const itensRetificacao = listaRetificacao.querySelectorAll('li');
  const totalItensRetificacao = itensRetificacao.length;
  let indiceAtualRetificacao = 0;
  const intervaloRetificacao = 5000; // 5 segundos

  // 1. Função para resetar (esconder) todos os itens da lista de retificação
  function resetarListaRetificacao() {
    itensRetificacao.forEach(item => {
      item.classList.remove('ativo');
    });
    indiceAtualRetificacao = 0;
  }

  // 2. Função principal que exibe o próximo item
  function exibirProximoItemRetificacao() {
    // Verifica se o loop chegou ao fim
    if (indiceAtualRetificacao >= totalItensRetificacao) {
      // Reseta a lista (invisível) e retorna
      resetarListaRetificacao();
      return;
    }

    // Pega o item atual a ser exibido
    const itemAtual = itensRetificacao[indiceAtualRetificacao];

    // Exibe o item atual (ele fica e se empilha com o anterior)
    if (itemAtual) {
      itemAtual.classList.add('ativo');
    }

    // Move para o próximo índice
    indiceAtualRetificacao++;
  }

  // Função que gerencia o loop e o reset
  function iniciarLoopEmpilhadoRetificacao() {
    // Reseta a lista (para garantir que esteja limpa ao iniciar)
    resetarListaRetificacao();

    // Inicia o intervalo de exibição
    setInterval(() => {
      // A cada 5 segundos, chama a função para exibir o próximo item
      exibirProximoItemRetificacao();
    }, intervaloRetificacao);
  }

  // Inicia o processo para a lista de retificação
  iniciarLoopEmpilhadoRetificacao();
}

// Set the questions (Direitos LGBTQIA+ no Brasil)

const questions = [
    {
        // CORREÇÃO 1: Mudei a chave de 'questions' para 'question' para manter a consistência.
        question : "Qual decisão do STF (Supremo Tribunal Federal) reconheceu a união estável homoafetiva no Brasil?",
        answers : [
            {
                text : "a) Lei Maria da Penha.", correct : false
            },
            {
                text : "b) Decisão nas ADI 4277 e ADPF 132 (2011).", correct : true
            },
            {
                text : "c) Estatuto da Criança e do Adolescente (ECA).", correct : false
            },
            {
                text : "d) Código Civil de 2002.", correct : false
            },
        ]
    },
    {
        question : "O que significa o direito ao 'Nome Social' em ambientes públicos (escolas, hospitais) para a comunidade trans e travesti?",
        answers : [
            {
                text : "a) Direito de criar um nome artístico.", correct : false
            },
            {
                text : "b) Direito de ser chamada pelo nome com o qual se identifica, sem necessidade de retificação judicial.", correct : true
            },
            {
                text : "c) Direito exclusivo a espaços de uso privado.", correct : false
            },
            {
                text : "d) Direito de usar um apelido de infância.", correct : false
            },
        ]
    },
    {
        question : "A LGBTfobia (homofobia e transfobia) é equiparada a qual tipo penal no Brasil, tornando-a crime?",
        answers : [
            {
                text : "a) Crimes contra a honra (injúria, difamação).", correct : false
            },
            {
                text : "b) Crime de racismo (Lei nº 7.716/89).", correct : true
            },
            {
                text : "c) Crime de desacato.", correct : false
            },
            {
                text : "d) Crime de intolerância religiosa.", correct : false
            },
        ]
    },
    {
        question : "Qual o requisito principal para que uma pessoa trans maior de idade possa alterar nome e gênero em seu registro civil (certidão) no cartório?",
        answers : [
            {
                text : "a) Comprovar cirurgia de redesignação sexual.", correct : false
            },
            {
                text : "b) Autorização judicial obrigatória.", correct : false
            },
            {
                text : "c) Laudo médico ou psicológico atestando a identidade.", correct : false
            },
            {
                text : "d) A autodeclaração da pessoa, feita diretamente no cartório.", correct : true
            },
        ]
    },
    {
        question : "Qual política pública do SUS (Sistema Único de Saúde) garante atendimento integral à população LGBTQIA+ no Brasil?",
        answers : [
            {
                text : "a) Programa Saúde da Família (PSF) apenas.", correct : false
            },
            {
                text : "b) Política Nacional de Atenção Integral à Saúde da População LGBT (PNAISP).", correct : true
            },
            {
                text : "c) Apenas o Programa Nacional de IST/AIDS.", correct : false
            },
            {
                text : "d) Política de Saúde Mental.", correct : false
            },
        ]
    },
    {
        question : "No ambiente escolar, qual direito é garantido a estudantes trans e travestis?",
        answers : [
            {
                text : "a) Apenas o direito de usar o banheiro designado ao seu sexo biológico.", correct : false
            },
            {
                text : "b) Direito de ser chamada pelo Nome Social e de usar banheiros e vestiários conforme sua identidade de gênero.", correct : true
            },
            {
                text : "c) O direito só se aplica em universidades federais.", correct : false
            },
            {
                text : "d) Direito de escolher as matérias a serem estudadas.", correct : false
            },
        ]
    },
    {
        question : "A demissão de um(a) funcionário(a) por sua orientação sexual ou identidade de gênero é considerada legal no Brasil?",
        answers : [
            {
                text : "a) Sim, se houver justa causa.", correct : false
            },
            {
                text : "b) Sim, se for em uma empresa privada.", correct : false
            },
            {
                text : "c) Não, pois configura dispensa discriminatória e é ilegal.", correct : true
            },
            {
                text : "d) Depende do tempo de serviço do funcionário(a).", correct : false
            },
        ]
    },
    {
        question : "O que são as terapias de 'reorientação sexual' ou 'cura gay'?",
        answers : [
            {
                text : "a) Tratamentos psicológicos reconhecidos pelo Conselho Federal de Psicologia (CFP).", correct : false
            },
            {
                text : "b) Intervenções proibidas pelo CFP, consideradas violação de direitos humanos.", correct : true
            },
            {
                text : "c) Programas de apoio familiar aprovados pelo SUS.", correct : false
            },
            {
                text : "d) Terapias voluntárias para melhoria da saúde mental.", correct : false
            },
        ]
    },
    {
        question : "No Brasil, casais do mesmo sexo têm direito à adoção de crianças e adolescentes?",
        answers : [
            {
                text : "a) Não, o Código Civil proíbe adoções homoafetivas.", correct : false
            },
            {
                text : "b) Sim, este direito é plenamente reconhecido e garantido pela justiça.", correct : true
            },
            {
                text : "c) Apenas se um dos parceiros for o pai/mãe biológico da criança.", correct : false
            },
            {
                text : "d) Apenas em estados que possuem legislação específica.", correct : false
            },
        ]
    },
    {
        question : "Qual é o principal documento que assegura os direitos e deveres da população LGBTQIA+ no âmbito federal, consolidado por decisões judiciais?",
        answers : [
            {
                text : "a) A Lei de Diretrizes e Bases da Educação Nacional (LDB).", correct : false
            },
            {
                text : "b) A Constituição Federal de 1988, interpretada pelo STF para incluir a igualdade de direitos.", correct : true
            },
            {
                text : "c) O Código de Defesa do Consumidor.", correct : false
            },
            {
                text : "d) O Estatuto do Idoso.", correct : false
            },
        ]
    }
];

// Getting all the element
const questionElement = document.getElementById("question");
// CORREÇÃO 2: Renomeado para 'answerButtons' para corresponder ao ID do HTML (<div id="answer-buttons">)
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn");

// Create variable to store question index and score.
let currentQuestionIndex = 0 ;
let score = 0;

// Function for start Quiz
function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    showQuestion();
}

// Function for Show Question
function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    // CORREÇÃO 1 APLICADA: Usando 'currentQuestion.question' (singular)
    questionElement.innerHTML = questionNo+". "+currentQuestion.question; 

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        // CORREÇÃO 2 APLICADA: Usando 'answerButtons'
        answerButtons.appendChild(button); 
        if(answers.correct)
        {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState()
{
    nextButton.style.display = "none";
    // CORREÇÃO 2 APLICADA: Usando 'answerButtons'
    while(answerButtons.firstChild) 
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    // Seu código aqui já aplica as classes .correct e .incorrect
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }
    
    // Desabilita os botões e mostra a resposta correta
    // CORREÇÃO 2 APLICADA: Usando 'answerButtons'
    Array.from(answerButtons.children).forEach(button => { 
        if(button.dataset.correct === "true")
        {
            // Adiciona a classe 'correct' na resposta certa, mesmo que o usuário tenha errado
            button.classList.add("correct"); 
        }
        button.disabled = true ;
    });
    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    
    // Mensagens de feedback em Português
    let feedbackMessage;
    if(score > 7)
    {
        feedbackMessage = `Você acertou ${score} de ${questions.length} questões. Excelente! Demonstra um ótimo conhecimento sobre os direitos LGBTQIA+. 🌈`;
    }
    else if(score >= 5)
    {
        feedbackMessage = `Você acertou ${score} de ${questions.length} questões. Bom trabalho! Continue se informando sobre os direitos. ✨`;
    }
    else
    {
        feedbackMessage = `Você acertou ${score} de ${questions.length} questões. Continue tentando! A informação é fundamental para garantir os direitos. 📚`;
    }

    // Inserindo a mensagem de feedback
    questionElement.innerHTML = feedbackMessage;

    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else
    {
        startQuiz();
    }
});

startQuiz();