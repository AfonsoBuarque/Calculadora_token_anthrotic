// Aguardar carregamento das configurações
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se CONFIG está disponível
    if (typeof CONFIG === 'undefined') {
        console.error('CONFIG não está disponível. Verifique se config.js foi carregado.');
        return;
    }
    
    // Configurações (importadas do config.js)
    const USD_TO_BRL = CONFIG.USD_TO_BRL_RATE;
    const MARGIN = CONFIG.CLIENT_PAGE_MARGIN;
    const pricing = CONFIG.API_PRICING;

    // Tipos de interação (importados do config.js e adaptados)
    const interactionTypes = {};
    Object.keys(CONFIG.CLIENT_INTERACTION_TYPES).forEach(key => {
        const config = CONFIG.CLIENT_INTERACTION_TYPES[key];
        interactionTypes[key] = {
            ...config,
            model: CONFIG.CLIENT_PAGE_MODEL
        };
    });

    // Elementos DOM
    const creditAmountInput = document.getElementById('credit-amount');
    const interactionCards = document.querySelectorAll('.interaction-card');
    const resultsSection = document.getElementById('results');
    const selectedInteractionName = document.getElementById('selected-interaction-name');
    const interactionCount = document.getElementById('interaction-count');
    const costPerInteraction = document.getElementById('cost-per-interaction');
    const comparisonList = document.getElementById('comparison-list');

    // Variáveis globais
    let selectedInteractionType = 'chat';
    let creditsChart;

    // Funções utilitárias
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    function formatNumber(num) {
        return new Intl.NumberFormat('pt-BR').format(num);
    }

    // Calcular custo por interação
    function calculateInteractionCost(interactionType) {
        const interaction = interactionTypes[interactionType];
        const modelPricing = pricing[interaction.model];
        
        // Calcular custo base em USD
        const inputCost = (interaction.inputTokens / 1000000) * modelPricing.input;
        const outputCost = (interaction.outputTokens / 1000000) * modelPricing.output;
        const totalCostUSD = inputCost + outputCost;
        
        // Converter para BRL (sem margem, pois o cliente já pagou com margem)
        const costBRL = totalCostUSD * USD_TO_BRL;
        
        
        return costBRL;
    }

    // Calcular quantas interações são possíveis
    function calculateInteractions(creditAmount, interactionType) {
        const costPerInteraction = calculateInteractionCost(interactionType);
        
        // O cliente pagou com margem, então dividimos por MARGIN para obter o valor real disponível
        const realCreditAmount = creditAmount / MARGIN;
        
        const possibleInteractions = Math.floor(realCreditAmount / costPerInteraction);
        
        
        return {
            count: possibleInteractions,
            costPer: costPerInteraction * MARGIN, // Mostrar custo com margem para o cliente
            realCostPer: costPerInteraction
        };
    }

    // Atualizar resultados
    function updateResults() {
        const creditAmount = parseFloat(creditAmountInput.value);
    
        if (!creditAmount || creditAmount <= 0) {
            resultsSection.style.display = 'none';
            return;
        }
        
        const result = calculateInteractions(creditAmount, selectedInteractionType);
        const interaction = interactionTypes[selectedInteractionType];
        
        // Atualizar card principal
        selectedInteractionName.textContent = interaction.name;
        interactionCount.textContent = formatNumber(result.count);
        costPerInteraction.textContent = formatCurrency(result.costPer);
        
        // Atualizar comparativo
        updateComparison(creditAmount);
        
        // Atualizar gráfico
        updateChart(creditAmount);
        
        resultsSection.style.display = 'block';
    }

    // Atualizar comparativo
    function updateComparison(creditAmount) {
    comparisonList.innerHTML = '';
    
    Object.keys(interactionTypes).forEach(type => {
        const result = calculateInteractions(creditAmount, type);
        const interaction = interactionTypes[type];
        
        const comparisonItem = document.createElement('div');
        comparisonItem.className = `comparison-item ${type === selectedInteractionType ? 'highlight' : ''}`;
        comparisonItem.innerHTML = `
            <span class="comparison-name">${interaction.name}</span>
            <span class="comparison-count">${formatNumber(result.count)} interações</span>
        `;
        
        comparisonList.appendChild(comparisonItem);
    });
}

// Atualizar gráfico
function updateChart(creditAmount) {
    const ctx = document.getElementById('creditsChart').getContext('2d');
    
    if (creditsChart) {
        creditsChart.destroy();
    }
    
    const data = [];
    const labels = [];
    const colors = ['#3b82f6', '#059669', '#f59e0b', '#8b5cf6'];
    
    Object.keys(interactionTypes).forEach((type, index) => {
        const result = calculateInteractions(creditAmount, type);
        const interaction = interactionTypes[type];
        
        if (result.count > 0) {
            data.push(result.count);
            labels.push(interaction.name);
        }
    });
    
    creditsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, data.length),
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${formatNumber(value)} interações`;
                        }
                    }
                }
            }
        }
    });
}

// Selecionar tipo de interação
function selectInteractionType(type) {
    // Remover seleção anterior
    interactionCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Adicionar seleção atual
    const selectedCard = document.querySelector(`[data-type="${type}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    selectedInteractionType = type;
    updateResults();
}

// Event Listeners
creditAmountInput.addEventListener('input', updateResults);

interactionCards.forEach(card => {
    card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        selectInteractionType(type);
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar chat simples por padrão
    selectInteractionType('chat');
    
    // Definir valor padrão do config
    creditAmountInput.value = CONFIG.DEFAULT_CREDIT_AMOUNT;
    updateResults();
});

// Função para debug (pode ser removida em produção)
function debugInteractionCosts() {
    console.log('=== CUSTOS POR INTERAÇÃO ===');
    Object.keys(interactionTypes).forEach(type => {
        const interaction = interactionTypes[type];
        const cost = calculateInteractionCost(type);
        const costWithMargin = cost * MARGIN;
        
        console.log(`${interaction.name}:`);
        console.log(`  Modelo: ${interaction.model}`);
        console.log(`  Tokens: ${interaction.inputTokens} input + ${interaction.outputTokens} output`);
        console.log(`  Custo real: ${formatCurrency(cost)}`);
        console.log(`  Custo para cliente: ${formatCurrency(costWithMargin)}`);
        console.log('---');
    });
    }

    // Inicialização
    // Selecionar chat simples por padrão
    selectInteractionType('chat');
    
    // Definir valor padrão do config
    creditAmountInput.value = CONFIG.DEFAULT_CREDIT_AMOUNT;
    updateResults();

    // Event Listeners
    creditAmountInput.addEventListener('input', updateResults);

    interactionCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.getAttribute('data-type');
            selectInteractionType(type);
        });
    });
});
