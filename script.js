// Configurações e constantes
const USD_TO_BRL = 6.00;

// Preços por modelo (em USD por 1M tokens) - com margem x3
const pricing = {
    'claude-opus-4.1': { input: 45.00, output: 225.00 },
    'claude-opus-4': { input: 45.00, output: 225.00 },
    'claude-sonnet-4': { input: 9.00, output: 45.00 },
    'claude-sonnet-3.7': { input: 9.00, output: 45.00 },
    'claude-3-5-sonnet-20241022': { input: 9.00, output: 45.00 },
    'claude-3-5-haiku-20241022': { input: 0.75, output: 3.75 }
};

// Elementos DOM
const modelSelect = document.getElementById('model-select');
const inputTokensInput = document.getElementById('input-tokens');
const outputTokensInput = document.getElementById('output-tokens');
const requestsInput = document.getElementById('requests');
const resultsSection = document.getElementById('results');
const scaleSection = document.getElementById('scale-projections');
const sampleTextArea = document.getElementById('sample-text');
const pricingInfo = document.getElementById('pricing-info');

// Elementos de resultado
const inputCostPerRequest = document.getElementById('input-cost-per-request');
const outputCostPerRequest = document.getElementById('output-cost-per-request');
const totalCostPerRequest = document.getElementById('total-cost-per-request');
const totalCostPerRequestBrl = document.getElementById('total-cost-per-request-brl');
const totalRequestsTitle = document.getElementById('total-requests-title');
const totalInputCost = document.getElementById('total-input-cost');
const totalOutputCost = document.getElementById('total-output-cost');
const totalCostUsd = document.getElementById('total-cost-usd');
const totalCostBrl = document.getElementById('total-cost-brl');
const totalTokensElement = document.getElementById('total-tokens');
const tokenResult = document.getElementById('token-result');
const scaleGrid = document.getElementById('scale-grid');

// Funções de formatação
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 6
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
}

function formatCurrencyBRL(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(value * USD_TO_BRL);
}

// Função para atualizar informações de preço
function updatePricingInfo() {
    const selectedModel = modelSelect.value;
    const modelPricing = pricing[selectedModel];
    pricingInfo.textContent = `Preços com margem: Input ${formatCurrency(modelPricing.input)}/1M tokens | Output ${formatCurrency(modelPricing.output)}/1M tokens`;
}

// Função principal de cálculo
function calculateCosts() {
    const inputTokenCount = parseInt(inputTokensInput.value) || 0;
    const outputTokenCount = parseInt(outputTokensInput.value) || 0;
    const requestCount = parseInt(requestsInput.value) || 1;
    
    // Validação básica
    if (inputTokenCount === 0 && outputTokenCount === 0) {
        hideResults();
        return;
    }
    
    const selectedModel = modelSelect.value;
    const modelPricing = pricing[selectedModel];
    
    // Custo por request
    const inputCostPerReq = (inputTokenCount / 1000000) * modelPricing.input;
    const outputCostPerReq = (outputTokenCount / 1000000) * modelPricing.output;
    const totalCostPerReq = inputCostPerReq + outputCostPerReq;
    
    // Custo total
    const totalInputCostValue = inputCostPerReq * requestCount;
    const totalOutputCostValue = outputCostPerReq * requestCount;
    const totalCostValue = totalCostPerReq * requestCount;
    const totalTokensValue = (inputTokenCount + outputTokenCount) * requestCount;
    
    // Atualizar interface
    updateResultsDisplay({
        inputCostPerRequest: inputCostPerReq,
        outputCostPerRequest: outputCostPerReq,
        totalCostPerRequest: totalCostPerReq,
        totalInputCost: totalInputCostValue,
        totalOutputCost: totalOutputCostValue,
        totalCost: totalCostValue,
        totalTokens: totalTokensValue,
        requestCount: requestCount
    });
    
    showResults();
    updateScaleProjections({
        totalCostPerRequest: totalCostPerReq,
        totalTokens: (inputTokenCount + outputTokenCount),
        requestCount: requestCount
    });
}

// Função para atualizar a exibição dos resultados
function updateResultsDisplay(results) {
    inputCostPerRequest.textContent = formatCurrency(results.inputCostPerRequest);
    outputCostPerRequest.textContent = formatCurrency(results.outputCostPerRequest);
    totalCostPerRequest.textContent = formatCurrency(results.totalCostPerRequest);
    totalCostPerRequestBrl.textContent = formatCurrencyBRL(results.totalCostPerRequest);
    
    totalRequestsTitle.textContent = `Total (${formatNumber(results.requestCount)} requests)`;
    totalInputCost.textContent = formatCurrency(results.totalInputCost);
    totalOutputCost.textContent = formatCurrency(results.totalOutputCost);
    totalCostUsd.textContent = formatCurrency(results.totalCost);
    totalCostBrl.textContent = formatCurrencyBRL(results.totalCost);
    totalTokensElement.textContent = `${formatNumber(results.totalTokens)} tokens`;
}

// Função para mostrar resultados
function showResults() {
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Função para esconder resultados
function hideResults() {
    resultsSection.style.display = 'none';
    scaleSection.style.display = 'none';
}

// Função para atualizar projeções de escala
function updateScaleProjections(baseData) {
    const scales = [10, 100, 1000, 10000];
    scaleGrid.innerHTML = '';
    
    scales.forEach(scale => {
        const totalRequests = scale * baseData.requestCount;
        const totalCost = baseData.totalCostPerRequest * scale;
        const totalTokens = baseData.totalTokens * scale;
        
        const scaleCard = document.createElement('div');
        scaleCard.className = 'scale-card';
        scaleCard.innerHTML = `
            <div class="requests">${formatNumber(totalRequests)} requests</div>
            <div class="usd-cost">${formatCurrency(totalCost)}</div>
            <div class="brl-cost">${formatCurrencyBRL(totalCost)}</div>
            <div class="tokens">${formatNumber(totalTokens)} tokens</div>
        `;
        
        scaleGrid.appendChild(scaleCard);
    });
    
    scaleSection.style.display = 'block';
}

// Função para calcular tokens de texto
function calculateTokensFromText(text) {
    if (!text.trim()) {
        tokenResult.innerHTML = 'Cole um texto ao lado para ver a estimativa de tokens';
        tokenResult.className = 'token-result-content';
        return;
    }
    
    const characters = text.length;
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    const estimatedTokens = Math.ceil(characters / 2.5);
    
    tokenResult.innerHTML = `
        <div class="result-stats">
            <div><strong>Caracteres:</strong> ${formatNumber(characters)}</div>
            <div><strong>Palavras:</strong> ${formatNumber(words)}</div>
            <div class="token-count"><strong>Tokens estimados:</strong> ~${formatNumber(estimatedTokens)}</div>
        </div>
    `;
    tokenResult.className = 'token-result-content has-result';
}

// Função de debounce para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para validar entrada numérica
function validateNumericInput(input) {
    const value = input.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (value !== numericValue) {
        input.value = numericValue;
    }
}

// Função para adicionar animação de loading
function addLoadingState(element) {
    element.classList.add('loading');
}

function removeLoadingState(element) {
    element.classList.remove('loading');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar informações de preço
    updatePricingInfo();
    
    // Debounced calculation function
    const debouncedCalculate = debounce(calculateCosts, 300);
    const debouncedTokenCalculate = debounce(calculateTokensFromText, 300);
    
    // Definir modelo padrão
    modelSelect.value = 'claude-sonnet-4';
    
    // Event listeners para inputs
    modelSelect.addEventListener('change', function() {
        updatePricingInfo();
        calculateCosts();
    });
    
    inputTokensInput.addEventListener('input', function() {
        validateNumericInput(this);
        debouncedCalculate();
    });
    
    outputTokensInput.addEventListener('input', function() {
        validateNumericInput(this);
        debouncedCalculate();
    });
    
    requestsInput.addEventListener('input', function() {
        validateNumericInput(this);
        // Garantir que o valor mínimo seja 1
        if (parseInt(this.value) < 1 && this.value !== '') {
            this.value = '1';
        }
        debouncedCalculate();
    });
    
    // Event listener para calculadora de tokens
    sampleTextArea.addEventListener('input', function() {
        debouncedTokenCalculate(this.value);
    });
    
    // Adicionar tooltips e melhorias de UX
    addTooltips();
    
    // Adicionar atalhos de teclado
    addKeyboardShortcuts();
});

// Função para adicionar tooltips
function addTooltips() {
    const tooltips = {
        'input-tokens': 'Número de tokens enviados na requisição (pergunta + contexto)',
        'output-tokens': 'Número de tokens gerados na resposta',
        'requests': 'Quantidade total de requisições que serão feitas',
        'model-select': 'Escolha o modelo Claude que será utilizado'
    };
    
    Object.keys(tooltips).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.title = tooltips[id];
        }
    });
}

// Função para adicionar atalhos de teclado
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter para calcular
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            calculateCosts();
        }
        
        // Escape para limpar campos
        if (e.key === 'Escape') {
            clearAllInputs();
        }
    });
}

// Função para limpar todos os inputs
function clearAllInputs() {
    inputTokensInput.value = '';
    outputTokensInput.value = '';
    requestsInput.value = '1';
    sampleTextArea.value = '';
    hideResults();
    tokenResult.innerHTML = 'Cole um texto ao lado para ver a estimativa de tokens';
    tokenResult.className = 'token-result-content';
}

// Função para exportar resultados (funcionalidade extra)
function exportResults() {
    const inputTokens = parseInt(inputTokensInput.value) || 0;
    const outputTokens = parseInt(outputTokensInput.value) || 0;
    const requests = parseInt(requestsInput.value) || 1;
    const model = modelSelect.value;
    
    if (inputTokens === 0 && outputTokens === 0) {
        alert('Preencha os campos de tokens para exportar os resultados.');
        return;
    }
    
    const results = {
        modelo: model,
        inputTokens: inputTokens,
        outputTokens: outputTokens,
        requests: requests,
        custoTotalUSD: totalCostUsd.textContent,
        custoTotalBRL: totalCostBrl.textContent,
        totalTokens: totalTokensElement.textContent,
        dataCalculo: new Date().toLocaleString('pt-BR')
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `calculo-tokens-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Função para detectar e sugerir valores baseados em padrões comuns
function suggestCommonValues() {
    const suggestions = {
        'chat-simples': { input: 100, output: 200 },
        'analise-documento': { input: 2000, output: 800 },
        'geracao-codigo': { input: 500, output: 1500 },
        'traducao': { input: 300, output: 350 },
        'resumo': { input: 1000, output: 300 }
    };
    
    return suggestions;
}

// Adicionar botões de sugestão rápida (funcionalidade extra)
function addQuickSuggestions() {
    const suggestions = suggestCommonValues();
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'quick-suggestions';
    suggestionsContainer.innerHTML = `
        <h4>Sugestões Rápidas:</h4>
        <div class="suggestion-buttons">
            ${Object.keys(suggestions).map(key => 
                `<button class="suggestion-btn" data-suggestion="${key}">
                    ${key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>`
            ).join('')}
        </div>
    `;
    
    // Inserir após os inputs
    const inputsGrid = document.querySelector('.inputs-grid');
    inputsGrid.parentNode.insertBefore(suggestionsContainer, inputsGrid.nextSibling);
    
    // Adicionar event listeners
    suggestionsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-btn')) {
            const suggestionKey = e.target.dataset.suggestion;
            const suggestion = suggestions[suggestionKey];
            
            inputTokensInput.value = suggestion.input;
            outputTokensInput.value = suggestion.output;
            calculateCosts();
        }
    });
}

// Função para salvar configurações no localStorage
function saveSettings() {
    const settings = {
        model: modelSelect.value,
        lastInputTokens: inputTokensInput.value,
        lastOutputTokens: outputTokensInput.value,
        lastRequests: requestsInput.value
    };
    
    localStorage.setItem('anthropic-calculator-settings', JSON.stringify(settings));
}

// Função para carregar configurações do localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('anthropic-calculator-settings');
    if (savedSettings) {
        try {
            const settings = JSON.parse(savedSettings);
            if (settings.model) modelSelect.value = settings.model;
            updatePricingInfo();
        } catch (e) {
            console.log('Erro ao carregar configurações salvas');
        }
    }
}

// Salvar configurações quando houver mudanças
window.addEventListener('beforeunload', saveSettings);

// Carregar configurações ao inicializar
document.addEventListener('DOMContentLoaded', loadSettings);

// Adicionar funcionalidade de compartilhamento (funcionalidade extra)
function shareCalculation() {
    const inputTokens = parseInt(inputTokensInput.value) || 0;
    const outputTokens = parseInt(outputTokensInput.value) || 0;
    const requests = parseInt(requestsInput.value) || 1;
    const model = modelSelect.value;
    
    if (inputTokens === 0 && outputTokens === 0) {
        alert('Preencha os campos de tokens para compartilhar o cálculo.');
        return;
    }
    
    const shareText = `Calculadora Anthropic API:
Modelo: ${model}
Input: ${formatNumber(inputTokens)} tokens
Output: ${formatNumber(outputTokens)} tokens
Requests: ${formatNumber(requests)}
Custo Total: ${totalCostBrl.textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Cálculo de Custos - API Anthropic',
            text: shareText
        });
    } else {
        // Fallback para copiar para clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Cálculo copiado para a área de transferência!');
        });
    }
}

// Adicionar validação em tempo real
function addRealTimeValidation() {
    const inputs = [inputTokensInput, outputTokensInput, requestsInput];
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && parseInt(this.value) < 0) {
                this.style.borderColor = '#ef4444';
                this.title = 'Valor deve ser maior que zero';
            } else {
                this.style.borderColor = '#e5e7eb';
                this.title = '';
            }
        });
    });
}

// Budget Calculator Elements
const budgetAmountInput = document.getElementById('budget-amount');
const budgetModelSelect = document.getElementById('budget-model');
const tokenRatioSelect = document.getElementById('token-ratio');
const budgetResults = document.getElementById('budget-results');
const budgetPlaceholder = document.getElementById('budget-placeholder');
const budgetDisplay = document.getElementById('budget-display');
const budgetInputTokens = document.getElementById('budget-input-tokens');
const budgetOutputTokens = document.getElementById('budget-output-tokens');
const budgetTotalTokens = document.getElementById('budget-total-tokens');
const shortConversations = document.getElementById('short-conversations');
const mediumAnalyses = document.getElementById('medium-analyses');
const longDocuments = document.getElementById('long-documents');

// Budget Calculator Functions
function calculateBudget() {
    const budgetBRL = parseFloat(budgetAmountInput.value);
    const selectedModel = budgetModelSelect.value;
    const ratio = tokenRatioSelect.value;
    
    if (!budgetBRL || budgetBRL <= 0) {
        budgetResults.style.display = 'none';
        budgetPlaceholder.style.display = 'flex';
        return;
    }
    
    // Convert BRL to USD
    const budgetUSD = budgetBRL / USD_TO_BRL;
    
    // Get pricing for selected model
    const modelPricing = pricing[selectedModel];
    
    // Parse ratio (e.g., "2:1" -> [2, 1])
    const [inputRatio, outputRatio] = ratio.split(':').map(Number);
    const totalRatio = inputRatio + outputRatio;
    
    // Calculate weighted average cost per token
    const inputWeight = inputRatio / totalRatio;
    const outputWeight = outputRatio / totalRatio;
    const avgCostPer1MTokens = (modelPricing.input * inputWeight) + (modelPricing.output * outputWeight);
    
    // Calculate total tokens possible
    const totalTokensPossible = Math.floor((budgetUSD / avgCostPer1MTokens) * 1000000);
    
    // Calculate input and output tokens based on ratio
    const inputTokens = Math.floor(totalTokensPossible * inputWeight);
    const outputTokens = Math.floor(totalTokensPossible * outputWeight);
    
    // Update display
    budgetDisplay.textContent = formatNumber(budgetBRL);
    budgetInputTokens.textContent = formatNumber(inputTokens);
    budgetOutputTokens.textContent = formatNumber(outputTokens);
    budgetTotalTokens.textContent = formatNumber(totalTokensPossible);
    
    // Calculate scenarios
    calculateScenarios(totalTokensPossible);
    
    // Show results
    budgetResults.style.display = 'block';
    budgetPlaceholder.style.display = 'none';
}

function calculateScenarios(totalTokens) {
    // Scenario assumptions (input + output tokens per interaction)
    const scenarios = {
        short: 200,      // Short conversations: ~200 tokens total
        medium: 800,     // Medium analyses: ~800 tokens total  
        long: 2500       // Long documents: ~2500 tokens total
    };
    
    const shortCount = Math.floor(totalTokens / scenarios.short);
    const mediumCount = Math.floor(totalTokens / scenarios.medium);
    const longCount = Math.floor(totalTokens / scenarios.long);
    
    shortConversations.textContent = `~${formatNumber(shortCount)} conversas`;
    mediumAnalyses.textContent = `~${formatNumber(mediumCount)} análises`;
    longDocuments.textContent = `~${formatNumber(longCount)} documentos`;
}

// Event Listeners for Budget Calculator
function addBudgetEventListeners() {
    budgetAmountInput.addEventListener('input', calculateBudget);
    budgetModelSelect.addEventListener('change', calculateBudget);
    tokenRatioSelect.addEventListener('change', calculateBudget);
}

// Inicializar validação em tempo real
document.addEventListener('DOMContentLoaded', function() {
    addRealTimeValidation();
    addBudgetEventListeners();
});
