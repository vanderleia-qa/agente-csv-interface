async function askAgent() {
    const csvFile = document.getElementById('csvFile').files[0];
    const question = document.getElementById('questionInput').value;
    const responseDiv = document.getElementById('response');

    if (!csvFile) {
        responseDiv.innerText = "Por favor, selecione um arquivo CSV.";
        return;
    }
    if (!question.trim()) {
        responseDiv.innerText = "Por favor, digite sua pergunta.";
        return;
    }

    responseDiv.innerText = "Processando sua pergunta...";

    const formData = new FormData();
    formData.append('csvFile', csvFile);
    formData.append('question', question);

    // **ATENÇÃO:** Substitua ESTA URL pela URL do seu Webhook do n8n
    const n8nWebhookUrl = 'http://localhost:5678/webhook-test/pergunta';

    try {
        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro do servidor: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        responseDiv.innerText = data.answer || "Nenhuma resposta encontrada.";
    } catch (error) {
        console.error("Erro ao enviar a pergunta:", error);
        responseDiv.innerText = `Erro: ${error.message}. Verifique o console para mais detalhes.`;
    }
}
