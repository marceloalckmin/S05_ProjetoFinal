const livros = [
  {
    titulo: 'Engenharia de Software Moderna',
    autor: 'Marco Tulio Valente',
    icone: '📘', classeCapa: 'capa-azul',
    retirada: '12/05/2025', devolucao: '07/06/2025',
    renovacoes: '1 de 2', multa: 'R$ 0,50 / dia',
    situacao: 'perigo', textoBadge: '⚠ Vence hoje',
    novaData: '21/06/2025', renovacoesRestantes: 1
  },
  {
    titulo: 'Código Limpo',
    autor: 'Robert C. Martin',
    icone: '📗', classeCapa: 'capa-verde',
    retirada: '20/05/2025', devolucao: '10/06/2025',
    renovacoes: '0 de 2', multa: 'R$ 0,50 / dia',
    situacao: 'atencao', textoBadge: '⏰ 3 dias restantes',
    novaData: '24/06/2025', renovacoesRestantes: 2
  },
  {
    titulo: 'Diário de um Banana',
    autor: 'Jeff Kinney',
    icone: '📙', classeCapa: 'capa-ambar',
    retirada: '25/05/2025', devolucao: '18/06/2025',
    renovacoes: '0 de 2', multa: 'R$ 0,50 / dia',
    situacao: 'ok', textoBadge: '✓ 12 dias restantes',
    novaData: '02/07/2025', renovacoesRestantes: 2
  }
];

let livroAtual = 0;

function irPara(id) {
  document.querySelectorAll('.tela').forEach(tela => tela.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativa');
  fecharModal();
}

function irParaDetalhe(indice) {
  livroAtual = indice;
  const livro = livros[indice];
  const classeEtiqueta = livro.situacao === 'perigo' ? 'etiqueta-perigo'
                       : livro.situacao === 'atencao' ? 'etiqueta-atencao'
                       : 'etiqueta-ok';

  document.getElementById('conteudo-detalhe').innerHTML = `
    <div class="cabecalho-detalhe">
      <div class="capa-detalhe ${livro.classeCapa}">${livro.icone}</div>
      <div>
        <div class="titulo-detalhe">${livro.titulo}</div>
        <div class="autor-detalhe">${livro.autor}</div>
        <span class="etiqueta ${classeEtiqueta}" style="margin-top:6px">${livro.textoBadge}</span>
      </div>
    </div>
    <div class="linha-detalhe">
      <span class="rotulo">Data de retirada</span>
      <span class="valor">${livro.retirada}</span>
    </div>
    <div class="linha-detalhe">
      <span class="rotulo">Data de devolução</span>
      <span class="valor ${livro.situacao === 'perigo' ? 'perigo' : ''}">${livro.devolucao}</span>
    </div>
    <div class="linha-detalhe">
      <span class="rotulo">Renovações feitas</span>
      <span class="valor">${livro.renovacoes}</span>
    </div>
    <div class="linha-detalhe">
      <span class="rotulo">Multa por atraso</span>
      <span class="valor">${livro.multa}</span>
    </div>
  `;

  document.getElementById('alerta-detalhe').style.display =
    livro.situacao === 'perigo' ? 'block' : 'none';

  irPara('tela-detalhe');
}

function abrirModal(indice) {
  livroAtual = indice;
  _mostrarModal();
}

function abrirModalDoDetalhe() {
  _mostrarModal();
}

function _mostrarModal() {
  const livro = livros[livroAtual];
  document.getElementById('modal-titulo-livro').textContent = livro.titulo;
  document.getElementById('modal-nova-data').textContent = livro.novaData;
  document.getElementById('modal-info-renovacao').textContent =
    `✓ Você ainda possui ${livro.renovacoesRestantes} renovação disponível`;
  document.getElementById('sobreposicao').classList.add('visivel');
}

function fecharModal() {
  document.getElementById('sobreposicao')?.classList.remove('visivel');
}

function confirmarRenovacao() {
  const livro = livros[livroAtual];
  document.getElementById('mensagem-sucesso').innerHTML =
    `Seu empréstimo foi renovado com sucesso!<br>Nova data de devolução: <strong>${livro.novaData}</strong>`;
  irPara('tela-sucesso');
}

function trocarAba(botao, aba) {
  document.querySelectorAll('.botao-aba').forEach(b => b.classList.remove('ativa'));
  botao.classList.add('ativa');
  document.getElementById('tab-ativos').style.display = aba === 'ativos' ? 'block' : 'none';
  document.getElementById('tab-historico').style.display = aba === 'historico' ? 'block' : 'none';
}