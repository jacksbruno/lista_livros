let livros = []
const endpoint = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
const elementoLivros = document.getElementById('livros')
const elementoValortotal = document.querySelector('#valor_total_livros_disponiveis')
buscaLivros()

async function buscaLivros(){
  const resp = await fetch(endpoint)
  livros = await resp.json()
  exibirLivros(livros)
  console.log('livros',livros)
}

function exibirLivros(livros){
  elementoLivros.innerHTML = ''
  elementoValortotal.innerHTML = ''
  livros.forEach(livro => {
    elementoLivros.innerHTML += `
      <div class="livro">
        <img class="livro__imagens ${livro.quantidade > 0 ? '' : 'indisponivel'}" src="${livro.imagem}" alt="${livro.alt}" />
        <h2 class="livro__titulo">${livro.titulo}</h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>
    `
  })
}


const botaoFiltro = document.querySelector('.nav')
botaoFiltro.addEventListener('click', e => {
  livrosFiltrados(e.target.attributes.value.value)
})

function livrosFiltrados(categoria){
  if(categoria=='ordenar') {
    livros.sort((a, b) => a.preco - b.preco)
    setTimeout(() => {
      exibirLivros(livros)
    },50)
  }
  if(categoria=='disponiveis') {
    const livrosDisponiveis = livros.filter(e => e.quantidade > 0)
    exibirLivros(livrosDisponiveis)
    const valorTotal = livrosDisponiveis.reduce((acc, atual) => acc + atual.preco, 0)
    console.log('valor',valorTotal)
    elementoValortotal.innerHTML = `
      <div class="livros__disponiveis">
        <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotal.toFixed(2)}</span></p>
      </div>
    `
  }
  else{
    let livrosFiltrados = []
    livrosFiltrados = livros.filter(e => e.categoria == categoria)
    exibirLivros(livrosFiltrados)
  }
}
