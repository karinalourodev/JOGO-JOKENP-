let pontosJogador1 = 0;
let pontosJogador2 = 0;

const placarJogador1 = document.querySelectorAll("span")[0];
const placarJogador2 = document.querySelectorAll("span")[1];

const botoes = document.querySelectorAll("button");

// Área de resultado
const resultado = document.createElement("div");
resultado.classList.add("resultado");
document.querySelector(".container").appendChild(resultado);

// Mensagem inicial
resultado.textContent = "Jogador 1 escolha primeiro!";
resultado.classList.add("empate");

let escolhaJogador1 = null;
let escolhaJogador2 = null;
let vezDoJogador1 = true;

// Placar visual
const placarDiv = document.createElement("div");
placarDiv.classList.add("placar");
placarDiv.innerHTML = `
  <div class="usuario">
    <h3>Jogador 1</h3>
    <div class="estrelas" id="estrelasJogador1"></div>
    <div class="barra-container"><div class="barra" id="barraJogador1"></div></div>
  </div>
  <div class="computador">
    <h3>Jogador 2</h3>
    <div class="estrelas" id="estrelasJogador2"></div>
    <div class="barra-container"><div class="barra" id="barraJogador2"></div></div>
  </div>
`;
document.querySelector(".container").appendChild(placarDiv);

// Botão reset
const resetBtn = document.createElement("button");
resetBtn.textContent = "Resetar Jogo";
resetBtn.classList.add("reset-btn");
document.querySelector(".container").appendChild(resetBtn);
resetBtn.addEventListener("click", resetarJogo);

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    if (vezDoJogador1) {
      escolhaJogador1 = botao.id;
      resultado.textContent = "Jogador 2, agora é sua vez!";
      vezDoJogador1 = false;
    } else {
      escolhaJogador2 = botao.id;
      verificarResultado(escolhaJogador1, escolhaJogador2);
      vezDoJogador1 = true;
    }
  });
});

function atualizarPlacar() {
  document.getElementById("estrelasJogador1").textContent = "⭐".repeat(
    pontosJogador1,
  );
  document.getElementById("estrelasJogador2").textContent = "⭐".repeat(
    pontosJogador2,
  );

  document.getElementById("barraJogador1").style.width =
    `${(pontosJogador1 / 10) * 100}%`;
  document.getElementById("barraJogador2").style.width =
    `${(pontosJogador2 / 10) * 100}%`;
}

function verificarResultado(j1, j2) {
  resultado.className = "resultado"; // reset classes

  if (j1 === j2) {
    resultado.innerHTML = `<span class="icone">⚖️</span> Empate! Ambos escolheram ${j1}`;
    resultado.classList.add("empate", "animar");
  } else if (
    (j1 === "pedra" && j2 === "tesoura") ||
    (j1 === "papel" && j2 === "pedra") ||
    (j1 === "tesoura" && j2 === "papel")
  ) {
    pontosJogador1++;
    placarJogador1.textContent = pontosJogador1;
    resultado.innerHTML = `<span class="icone">✅</span> Jogador 1 venceu! ${j1} vence ${j2}`;
    resultado.classList.add("vitoria", "animar");
  } else {
    pontosJogador2++;
    placarJogador2.textContent = pontosJogador2;
    resultado.innerHTML = `<span class="icone">✅</span> Jogador 2 venceu! ${j2} vence ${j1}`;
    resultado.classList.add("vitoria", "animar");
  }

  atualizarPlacar();

  // Fim de jogo
  if (pontosJogador1 >= 10 || pontosJogador2 >= 10) {
    if (pontosJogador1 > pontosJogador2) {
      resultado.innerHTML = `<span class="icone">🏆</span> Fim de jogo! Jogador 1 venceu!`;
      resultado.classList.add("vitoria");
    } else {
      resultado.innerHTML = `<span class="icone">🏆</span> Fim de jogo! Jogador 2 venceu!`;
      resultado.classList.add("vitoria");
    }
    desativarBotoes();
  } else {
    // Mensagem para próxima rodada
    setTimeout(() => {
      resultado.textContent = "Jogador 1 escolha primeiro!";
      resultado.classList.add("empate");
    }, 1000);
  }

  setTimeout(() => {
    resultado.classList.remove("animar");
  }, 600);
}

function resetarJogo() {
  pontosJogador1 = 0;
  pontosJogador2 = 0;
  placarJogador1.textContent = pontosJogador1;
  placarJogador2.textContent = pontosJogador2;
  resultado.textContent = "Jogo reiniciado! Jogador 1 escolha primeiro!";
  resultado.className = "resultado empate animar";
  atualizarPlacar();
  ativarBotoes();
}

function desativarBotoes() {
  botoes.forEach((botao) => (botao.disabled = true));
}

function ativarBotoes() {
  botoes.forEach((botao) => (botao.disabled = false));
}
