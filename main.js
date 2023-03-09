let livros = [];

function perguntaNome() {
    let nome = window.prompt("Qual o seu nome?");
    let elementoNome = document.querySelector("#elemento_nome");
    elementoNome.innerHTML = nome;
}

function adicionarLivro(event) {
    // Previnindo comportamento padrão da página
    event.preventDefault();

    // Puxando informações de entrada do formulário
    let tituloLivro = document.querySelector("#nome_livro").value;
    let autorLivro = document.querySelector("#autores_livro").value;
    let capaLivro = document.querySelector("#imagem_livro").value;
    let paginasLidas = document.querySelector("#paginas_lidas").value;
    let totalPaginas = document.querySelector("#total_paginas").value;

    let lido = livroFoiLido(paginasLidas, totalPaginas);

    let livroCompleto = {
        titulo : tituloLivro, 
        autor: autorLivro,
        capa: capaLivro,
        paginasLidas: paginasLidas,
        totalPaginas: totalPaginas,
        lido: lido
    }

    livros.push(livroCompleto);
    console.log(livros);
    
    // Cálculos de páginas
    let paginasFaltantes = calculoPaginasFaltantes(totalPaginas,paginasLidas);
    let percentualPaginas = calculoPercentualLeitura(paginasLidas, totalPaginas);
    
    imprimirNaTela(paginasLidas, paginasFaltantes, percentualPaginas);
    imprimirLivroNaTela(livroCompleto);
}


function calculoPaginasFaltantes(totalPaginas, paginasLidas){
    let paginasFaltantes = totalPaginas - paginasLidas;
    return paginasFaltantes;
}

function calculoPercentualLeitura(paginasLidas, totalPaginas){
    let percentualPaginas = paginasLidas * 100 / totalPaginas;
    return percentualPaginas;
}

function imprimirNaTela(paginasLidas, paginasFaltantes, percentualPaginas) {
    // Parágrafo de páginas lidas
    let elementoPaginasLidas = document.querySelector("#elemento_paginas_lidas");
    elementoPaginasLidas.innerHTML = paginasLidas;
    // Parágrafo de páginas faltantes
    let elementoPaginasFaltantes = document.querySelector("#elemento_paginas_faltantes");
    elementoPaginasFaltantes.innerHTML = paginasFaltantes;
    // Parágrafo de porcentagem de páginas para meta
    let elementoPorcentagemPaginas = document.querySelector("#elemento_porcentagem_paginas");
    elementoPorcentagemPaginas.innerHTML = percentualPaginas.toFixed(2) + "%";
}

function imprimirLivroNaTela(livroCompleto) {

    let elementoArticle = document.createElement("article");
    elementoArticle.className = "livro";

    if (livroCompleto.lido == true) {
        let elementoListaLido = document.querySelector("#lista_livros_lidos");
        elementoListaLido.appendChild(elementoArticle);
    } else {
        let elementoListaLendo = document.querySelector("#lista_livros_nao_lidos");
        elementoListaLendo.appendChild(elementoArticle);
    }

    let elementoImagem = document.createElement("img");
    elementoImagem.src = livroCompleto.capa;
    elementoArticle.appendChild(elementoImagem);

    let elementoTituloLivro = document.createElement("h1");
    elementoTituloLivro.innerText = livroCompleto.titulo;
    elementoArticle.appendChild(elementoTituloLivro);

    let elementoAutorLivro = document.createElement("p");
    elementoAutorLivro.innerText = livroCompleto.autor;
    elementoArticle.appendChild(elementoAutorLivro);

    let elementoProgressoLeitura = document.createElement("input");
    elementoProgressoLeitura.type = "range";
    elementoArticle.appendChild(elementoProgressoLeitura);

    let elementoBotaoDelete = document.createElement("button");
    elementoBotaoDelete.innerText = "X Deletar o livro";
    elementoArticle.appendChild(elementoBotaoDelete);
    elementoBotaoDelete.className = "botao-simples-texto";
}

function livroFoiLido(paginasLidas, totalPaginas) {
    if (paginasLidas == totalPaginas) {
        console.log("Livro foi lido!");
        return true;
    }
    else {
        console.log("livro não foi lido!");
        return false;
    }
}