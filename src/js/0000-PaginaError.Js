// Adiciona um evento de clique ao botão
document.querySelector('.custom-button').addEventListener('click', function(event) {
    // Se o link já é '/', não precisa prevenir o padrão
    // Se você quiser fazer uma ação antes de navegar, faria:
    // event.preventDefault();
    // console.log("Botão de retorno clicado!");
    // window.location.href = 'index.html';
});

// Outros scripts da página de erro, se houver.