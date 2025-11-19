document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos do DOM
    const form = document.getElementById('formInscricaoSaude');
    const feedbackDiv = document.getElementById('mensagemFeedback');

    // Listener para o evento de envio do formulário
    form.addEventListener('submit', function(event) {
        
       
        event.preventDefault();
        event.stopPropagation(); 

     
        feedbackDiv.innerHTML = '';
        
    
        if (form.checkValidity()) {
            
            // =========================================================================
            // LÓGICA DE SIMULAÇÃO DE ENVIO (sem banco de dados)
            // =========================================================================
            
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            setTimeout(() => {
                
                feedbackDiv.innerHTML = `
                    <div class="alert alert-success mt-3" role="alert">
                        🥳 **Sucesso!** Sua inscrição foi confirmada. Verifique seu e-mail em breve!
                    </div>
                `;
                //form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Quero Receber Dicas!';
                Array.from(form.elements).forEach(element => {
                    element.classList.remove('is-valid');
                    element.classList.remove('is-invalid');
                });


            }, 1500); // 1.5 segundos de simulação

        } else {
            // Se o formulário for inválido, exibe uma mensagem genérica de erro (o Bootstrap já cuida dos campos individuais)
            feedbackDiv.innerHTML = `
                <div class="alert alert-danger mt-3" role="alert">
                    **Erro:** Por favor, corrija os campos destacados em vermelho.
                </div>
            `;
        }

        // 4. Aplica as classes de validação do Bootstrap (is-valid ou is-invalid) a todos os campos
        // Isso faz com que as mensagens de erro/sucesso apareçam abaixo de cada campo
        form.classList.add('was-validated');

        Array.from(form.elements).forEach(element => {
            if (element.id !== 'consentimento' && element.id !== 'mensagemFeedback' && element.type !== 'submit') {
                 if (element.checkValidity()) {
                    element.classList.add('is-valid');
                    element.classList.remove('is-invalid');
                } else {
                    element.classList.add('is-invalid');
                    element.classList.remove('is-valid');
                }
            }
        });
        
    });
});