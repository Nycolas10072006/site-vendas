// ===== MENU HAMBÚRGUER (MOBILE) =====
const botaoMenu = document.getElementById('botao-menu');
const menuNav = document.getElementById('menu-nav');

botaoMenu.addEventListener('click', function() {
  botaoMenu.classList.toggle('ativo');
  menuNav.classList.toggle('aberto');
});

// Fechar menu ao clicar em um link
menuNav.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    botaoMenu.classList.remove('ativo');
    menuNav.classList.remove('aberto');
  });
});


// ===== CABEÇALHO MUDA AO ROLAR =====
const cabecalho = document.getElementById('cabecalho');

window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    cabecalho.style.padding = '0.6rem 2.5rem';
    cabecalho.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
  } else {
    cabecalho.style.padding = '1rem 2.5rem';
    cabecalho.style.boxShadow = 'none';
  }
});


// ===== ANIMAÇÃO DOS CONTADORES =====
function animarContador(elemento, alvo, sufixo, duracao) {
  var inicio = 0;
  var incremento = alvo / (duracao / 16);
  var atual = 0;

  function atualizar() {
    atual += incremento;
    if (atual >= alvo) {
      elemento.textContent = alvo;
      return;
    }
    elemento.textContent = Math.floor(atual);
    requestAnimationFrame(atualizar);
  }
  atualizar();
}

// Iniciar contadores quando a seção hero ficar visível
var contadoresIniciados = false;

var observadorContadores = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada) {
    if (entrada.isIntersecting && !contadoresIniciados) {
      contadoresIniciados = true;
      animarContador(document.getElementById('contador1'), 60, '%', 2000);
      animarContador(document.getElementById('contador2'), 3, 'x', 1500);
      animarContador(document.getElementById('contador3'), 50, '+', 2000);
    }
  });
}, { threshold: 0.5 });

observadorContadores.observe(document.querySelector('.hero-estatisticas'));


// ===== ANIMAÇÃO DE ELEMENTOS AO ROLAR (SCROLL REVEAL) =====
var observadorScroll = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada, indice) {
    if (entrada.isIntersecting) {
      // Atraso escalonado para cada elemento
      var atraso = Array.from(entrada.target.parentElement.children).indexOf(entrada.target) * 150;
      setTimeout(function() {
        entrada.target.classList.add('visivel');
      }, atraso);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

// Observar cartões de serviço
document.querySelectorAll('.cartao-servico').forEach(function(cartao) {
  observadorScroll.observe(cartao);
});

// Observar casos de sucesso
document.querySelectorAll('.caso-sucesso').forEach(function(caso) {
  observadorScroll.observe(caso);
});

// Observar elementos com data-animar
document.querySelectorAll('[data-animar]').forEach(function(elemento) {
  observadorScroll.observe(elemento);
});


// ===== PARTÍCULAS FLUTUANTES NO HERO =====
var containerParticulas = document.getElementById('particulas');

function criarParticula() {
  var particula = document.createElement('div');
  particula.classList.add('particula');

  // Posição horizontal aleatória
  particula.style.left = Math.random() * 100 + '%';

  // Tamanho aleatório
  var tamanho = Math.random() * 4 + 2;
  particula.style.width = tamanho + 'px';
  particula.style.height = tamanho + 'px';

  // Duração aleatória
  var duracao = Math.random() * 6 + 4;
  particula.style.animationDuration = duracao + 's';

  // Opacidade aleatória
  particula.style.opacity = Math.random() * 0.5 + 0.1;

  containerParticulas.appendChild(particula);

  // Remover partícula após animação
  setTimeout(function() {
    particula.remove();
  }, duracao * 1000);
}

// Criar partículas periodicamente
setInterval(criarParticula, 300);

// Criar algumas partículas iniciais
for (var i = 0; i < 15; i++) {
  setTimeout(criarParticula, i * 200);
}


// ===== LINK ATIVO NA NAVEGAÇÃO =====
var secoesMenu = document.querySelectorAll('.secao');
var linksMenu = document.querySelectorAll('nav a');

window.addEventListener('scroll', function() {
  var posicaoAtual = window.scrollY + 150;

  secoesMenu.forEach(function(secao) {
    var topoSecao = secao.offsetTop;
    var alturaSecao = secao.offsetHeight;
    var idSecao = secao.getAttribute('id');

    if (posicaoAtual >= topoSecao && posicaoAtual < topoSecao + alturaSecao) {
      linksMenu.forEach(function(link) {
        link.style.color = '#94a3b8';
        if (link.getAttribute('href') === '#' + idSecao) {
          link.style.color = '#f8fafc';
        }
      });
    }
  });
});


// ===== FORMULÁRIO DE CONTATO =====
var formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function(evento) {
  evento.preventDefault();

  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var empresa = document.getElementById('empresa').value;
  var servico = document.getElementById('servico').value;
  var mensagem = document.getElementById('mensagem').value;

  // Montar mensagem para WhatsApp
  var textoWhatsApp = '🤖 *Nova mensagem do site ECB Intelligence*\n\n';
  textoWhatsApp += '👤 *Nome:* ' + nome + '\n';
  textoWhatsApp += '📧 *E-mail:* ' + email + '\n';
  if (empresa) textoWhatsApp += '🏢 *Empresa:* ' + empresa + '\n';
  if (servico) textoWhatsApp += '📋 *Serviço:* ' + servico + '\n';
  if (mensagem) textoWhatsApp += '💬 *Mensagem:* ' + mensagem + '\n';

  // Abrir WhatsApp com a mensagem
  var urlWhatsApp = 'https://wa.me/5511993778796?text=' + encodeURIComponent(textoWhatsApp);
  window.open(urlWhatsApp, '_blank');

  // Feedback visual
  var botao = formulario.querySelector('.botao-enviar');
  var textoOriginal = botao.textContent;
  botao.textContent = '✅ Redirecionando para WhatsApp...';
  botao.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';

  setTimeout(function() {
    botao.textContent = textoOriginal;
    botao.style.background = 'linear-gradient(135deg, #4299e1, #3182ce)';
    formulario.reset();
  }, 3000);
});


// ===== EFEITO PARALLAX SUAVE NO HERO =====
window.addEventListener('scroll', function() {
  var heroConteudo = document.querySelector('.hero-conteudo');
  if (heroConteudo) {
    var velocidade = window.scrollY * 0.3;
    heroConteudo.style.transform = 'translateY(' + velocidade + 'px)';
    heroConteudo.style.opacity = 1 - (window.scrollY / 800);
  }
});


// ===== EFEITO DE DIGITAÇÃO NO BADGE =====
var badge = document.querySelector('.hero-badge');
var textoBadge = badge.textContent;
badge.textContent = '';
var indiceBadge = 0;

setTimeout(function() {
  function digitar() {
    if (indiceBadge < textoBadge.length) {
      badge.textContent += textoBadge.charAt(indiceBadge);
      indiceBadge++;
      setTimeout(digitar, 50);
    }
  }
  digitar();
}, 800);
