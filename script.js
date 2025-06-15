// Exemplo ajustado de script.js
async function askAgent() {
    const question = document.getElementById('questionInput').value;
    const responseDiv = document.getElementById('response');

    if (!question.trim()) {
        responseDiv.innerText = "Por favor, digite sua pergunta.";
        return;
    }

    responseDiv.innerText = "Processando sua pergunta...";

    const dataToSend = { question: question }; // Apenas a pergunta

    const n8nWebhookUrl = 'http://localhost:5678/webhook-test/pergunta'; // URL do Webhook do n8n

    try {
        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Agora enviamos JSON puro
            },
            body: JSON.stringify(dataToSend) // Converta o objeto para JSON string
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
