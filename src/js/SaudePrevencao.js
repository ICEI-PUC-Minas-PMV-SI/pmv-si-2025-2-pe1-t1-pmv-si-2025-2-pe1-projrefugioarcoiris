document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos do DOM
    const form = document.getElementById('formInscricaoSaude');
    const feedbackDiv = document.getElementById('mensagemFeedback');

    // Listener para o evento de envio do formulário
    form.addEventListener('submit', function(event) {
        
        // 1. Previne o envio padrão do formulário (que recarregaria a página)
        event.preventDefault();
        event.stopPropagation(); // Impede a propagação do evento

        // 2. Remove qualquer feedback anterior
        feedbackDiv.innerHTML = '';
        
        // 3. Verifica a validade do formulário (usa as regras 'required', 'type=email', etc.)
        if (form.checkValidity()) {
            
            // =========================================================================
            // LÓGICA DE SIMULAÇÃO DE ENVIO (sem banco de dados)
            // Aqui é onde ocorreria uma requisição AJAX (fetch) para um servidor real.
            // =========================================================================
            
            // A. Simula um pequeno atraso (como se estivesse enviando)
            // Desativa o botão temporariamente
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            setTimeout(() => {
                
                // B. Feedback Visual de Sucesso
                feedbackDiv.innerHTML = `
                    <div class="alert alert-success mt-3" role="alert">
                        🥳 **Sucesso!** Sua inscrição foi confirmada. Verifique seu e-mail em breve!
                    </div>
                `;

                // C. Limpa os campos do formulário e reativa o botão
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Quero Receber Dicas!';

                // D. Remove as classes de validação 'is-valid' de todos os campos
                // Isso é importante para resetar a aparência do formulário após o sucesso
                Array.from(form.elements).forEach(element => {
                    element.classList.remove('is-valid');
                    element.classList.remove('is-invalid');
                });

                // Opcional: faz a página subir para o topo para ver a mensagem
                window.scrollTo({ top: 0, behavior: 'smooth' });

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

        // Adicionalmente, percorre os campos para aplicar manualmente (garantindo que funcione bem)
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