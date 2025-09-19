// Configurações (importadas do config.js)
const USD_TO_BRL = CONFIG.USD_TO_BRL_RATE;
const pricing = CONFIG.API_PRICING;

// Elementos DOM
const modelSelect = document.getElementById('model-select');
const marginSelect = document.getElementById('margin-select');
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
const totalCostPerRequestBrlBase = document.getElementById('total-cost-per-request-brl-base');
const totalRequestsTitle = document.getElementById('total-requests-title');
const totalInputCost = document.getElementById('total-input-cost');
const totalOutputCost = document.getElementById('total-output-cost');
const totalCostUsd = document.getElementById('total-cost-usd');
const totalCostBrl = document.getElementById('total-cost-brl');
const totalCostBrlBase = document.getElementById('total-cost-brl-base');
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
    pricingInfo.textContent = `Preços oficiais: Input ${formatCurrency(modelPricing.input)}/1M tokens | Output ${formatCurrency(modelPricing.output)}/1M tokens`;
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
    const margin = parseFloat(marginSelect.value) || 1;
    
    inputCostPerRequest.textContent = formatCurrency(results.inputCostPerRequest);
    outputCostPerRequest.textContent = formatCurrency(results.outputCostPerRequest);
    totalCostPerRequest.textContent = formatCurrency(results.totalCostPerRequest);
    
    // Custo base (sem margem)
    totalCostPerRequestBrlBase.textContent = formatCurrencyBRL(results.totalCostPerRequest);
    totalCostBrlBase.textContent = formatCurrencyBRL(results.totalCost);
    
    // Custo com margem
    totalCostPerRequestBrl.textContent = formatCurrencyBRL(results.totalCostPerRequest * margin);
    totalCostBrl.textContent = formatCurrencyBRL(results.totalCost * margin);
    
    totalRequestsTitle.textContent = `Total (${formatNumber(results.requestCount)} requests)`;
    totalInputCost.textContent = formatCurrency(results.totalInputCost);
    totalOutputCost.textContent = formatCurrency(results.totalOutputCost);
    totalCostUsd.textContent = formatCurrency(results.totalCost);
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
    const margin = parseFloat(marginSelect.value) || 1;
    scaleGrid.innerHTML = '';
    
    scales.forEach(scale => {
        const totalRequests = scale * baseData.requestCount;
        const totalCost = baseData.totalCostPerRequest * scale;
        const totalCostWithMargin = totalCost * margin;
        const totalTokens = baseData.totalTokens * scale;
        
        const scaleCard = document.createElement('div');
        scaleCard.className = 'scale-card';
        scaleCard.innerHTML = `
            <div class="requests">${formatNumber(totalRequests)} requests</div>
            <div class="usd-cost">${formatCurrency(totalCost)}</div>
            <div class="brl-cost">${formatCurrencyBRL(totalCostWithMargin)}</div>
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
    
    marginSelect.addEventListener('change', function() {
        calculateCosts();
        calculateBudget();
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
    const margin = parseFloat(marginSelect.value) || 1;
    
    if (!budgetBRL || budgetBRL <= 0) {
        budgetResults.style.display = 'none';
        budgetPlaceholder.style.display = 'flex';
        return;
    }
    
    // Convert BRL to USD, considering margin (budget is the final price with margin)
    // So we need to calculate the base cost: budgetBRL / margin
    const baseBudgetBRL = budgetBRL / margin;
    const budgetUSD = baseBudgetBRL / USD_TO_BRL;
    
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

// Commercial Dashboard Elements
const presentationModeToggle = document.getElementById('presentation-mode');
const commercialDashboard = document.getElementById('commercial-dashboard');
const scenariosGrid = document.getElementById('scenarios-grid');
const summaryCards = document.getElementById('summary-cards');

// Charts variables
let volumeChart, modelsChart, monthlyChart, tokenDistributionChart;

// Commercial Dashboard Functions
function togglePresentationMode() {
    const isPresentation = presentationModeToggle.checked;
    const body = document.body;
    
    if (isPresentation) {
        body.classList.add('presentation-mode');
        commercialDashboard.style.display = 'block';
        generateCommercialDashboard();
    } else {
        body.classList.remove('presentation-mode');
        commercialDashboard.style.display = 'none';
    }
}

function generateCommercialDashboard() {
    generateScenarios();
    generateCharts();
    generateExecutiveSummary();
}

function generateScenarios() {
    const scenarios = [
        {
            name: 'Básico',
            description: 'Ideal para pequenas empresas',
            inputTokens: 10000,
            outputTokens: 5000,
            requests: 100,
            model: 'claude-3-5-haiku-20241022'
        },
        {
            name: 'Profissional',
            description: 'Para empresas em crescimento',
            inputTokens: 50000,
            outputTokens: 25000,
            requests: 500,
            model: 'claude-sonnet-4'
        },
        {
            name: 'Enterprise',
            description: 'Para grandes corporações',
            inputTokens: 200000,
            outputTokens: 100000,
            requests: 2000,
            model: 'claude-opus-4'
        }
    ];

    scenariosGrid.innerHTML = '';
    
    scenarios.forEach(scenario => {
        const modelPricing = pricing[scenario.model];
        const margin = parseFloat(marginSelect.value) || 1;
        
        const inputCost = (scenario.inputTokens / 1000000) * modelPricing.input;
        const outputCost = (scenario.outputTokens / 1000000) * modelPricing.output;
        const costPerRequest = (inputCost + outputCost) * margin;
        const totalCostUSD = (inputCost + outputCost) * scenario.requests;
        const totalCostBRL = totalCostUSD * USD_TO_BRL * margin;
        const totalTokens = (scenario.inputTokens + scenario.outputTokens) * scenario.requests;
        
        const scenarioCard = document.createElement('div');
        scenarioCard.className = 'scenario-card';
        scenarioCard.innerHTML = `
            <div class="scenario-title">${scenario.name}</div>
            <div class="scenario-details">
                <div class="scenario-detail">
                    <span class="scenario-label">Descrição:</span>
                    <span class="scenario-value">${scenario.description}</span>
                </div>
                <div class="scenario-detail">
                    <span class="scenario-label">Tokens Mensais:</span>
                    <span class="scenario-value">${formatNumber(totalTokens)}</span>
                </div>
                <div class="scenario-detail">
                    <span class="scenario-label">Requests:</span>
                    <span class="scenario-value">${formatNumber(scenario.requests)}</span>
                </div>
                <div class="scenario-detail">
                    <span class="scenario-label">Modelo:</span>
                    <span class="scenario-value">${getModelDisplayName(scenario.model)}</span>
                </div>
                <div class="scenario-detail">
                    <span class="scenario-label">Valor por Requisição:</span>
                    <span class="scenario-value">${formatCurrencyBRL(costPerRequest)}</span>
                </div>
                <div class="scenario-detail">
                    <span class="scenario-label">Investimento Mensal:</span>
                    <span class="scenario-value">${formatCurrencyBRL(totalCostUSD * margin)}</span>
                </div>
            </div>
        `;
        
        scenariosGrid.appendChild(scenarioCard);
    });
}

function getModelDisplayName(modelKey) {
    const modelNames = {
        'claude-opus-4.1': 'Claude Opus 4.1',
        'claude-opus-4': 'Claude Opus 4',
        'claude-sonnet-4': 'Claude Sonnet 4',
        'claude-sonnet-3.7': 'Claude Sonnet 3.7',
        'claude-3-5-sonnet-20241022': 'Claude 3.5 Sonnet',
        'claude-3-5-haiku-20241022': 'Claude 3.5 Haiku'
    };
    return modelNames[modelKey] || modelKey;
}

function generateCharts() {
    generateVolumeChart();
    generateModelsChart();
    generateMonthlyChart();
    generateTokenDistributionChart();
}

function generateVolumeChart() {
    const ctx = document.getElementById('volumeChart').getContext('2d');
    
    if (volumeChart) {
        volumeChart.destroy();
    }
    
    const volumes = [10000, 50000, 100000, 500000, 1000000];
    const costs = volumes.map(vol => {
        const modelPricing = pricing['claude-sonnet-4'];
        const margin = parseFloat(marginSelect.value) || 1;
        const cost = ((vol * 0.6 / 1000000) * modelPricing.input + (vol * 0.4 / 1000000) * modelPricing.output) * USD_TO_BRL * margin;
        return cost;
    });
    
    volumeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: volumes.map(v => formatNumber(v) + ' tokens'),
            datasets: [{
                label: 'Custo (R$)',
                data: costs,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

function generateModelsChart() {
    const ctx = document.getElementById('modelsChart').getContext('2d');
    
    if (modelsChart) {
        modelsChart.destroy();
    }
    
    const models = ['claude-3-5-haiku-20241022', 'claude-sonnet-4', 'claude-opus-4'];
    const margin = parseFloat(marginSelect.value) || 1;
    const costs = models.map(model => {
        const modelPricing = pricing[model];
        const cost = ((50000 * 0.6 / 1000000) * modelPricing.input + (50000 * 0.4 / 1000000) * modelPricing.output) * USD_TO_BRL * margin;
        return cost;
    });
    
    modelsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: models.map(m => getModelDisplayName(m)),
            datasets: [{
                label: 'Custo para 50k tokens (R$)',
                data: costs,
                backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

function generateMonthlyChart() {
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    
    if (monthlyChart) {
        monthlyChart.destroy();
    }
    
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const baseCost = 150; // Base cost in BRL
    const margin = parseFloat(marginSelect.value) || 1;
    const growth = [1, 1.2, 1.5, 1.8, 2.1, 2.5]; // Growth multiplier
    
    const costs = growth.map(g => baseCost * g * margin);
    
    monthlyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Projeção de Custos (R$)',
                data: costs,
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(0);
                        }
                    }
                }
            }
        }
    });
}

function generateTokenDistributionChart() {
    const ctx = document.getElementById('tokenDistributionChart').getContext('2d');
    
    if (tokenDistributionChart) {
        tokenDistributionChart.destroy();
    }
    
    const inputTokens = parseInt(inputTokensInput.value) || 30000;
    const outputTokens = parseInt(outputTokensInput.value) || 20000;
    
    tokenDistributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Tokens de Input', 'Tokens de Output'],
            datasets: [{
                data: [inputTokens, outputTokens],
                backgroundColor: ['#3b82f6', '#8b5cf6'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function generateExecutiveSummary() {
    const inputTokens = parseInt(inputTokensInput.value) || 30000;
    const outputTokens = parseInt(outputTokensInput.value) || 20000;
    const requests = parseInt(requestsInput.value) || 100;
    const selectedModel = modelSelect.value;
    const modelPricing = pricing[selectedModel];
    const margin = parseFloat(marginSelect.value) || 1;
    
    const inputCost = (inputTokens / 1000000) * modelPricing.input;
    const outputCost = (outputTokens / 1000000) * modelPricing.output;
    const totalCostUSD = (inputCost + outputCost) * requests;
    const totalCostBRL = totalCostUSD * USD_TO_BRL * margin;
    const totalTokens = (inputTokens + outputTokens) * requests;
    
    const cards = [
        {
            title: 'Investimento Mensal',
            value: formatCurrencyBRL(totalCostUSD * margin).replace('R$', 'R$'),
            description: 'Custo total estimado',
            highlight: true
        },
        {
            title: 'Tokens Processados',
            value: formatNumber(totalTokens),
            description: 'Total de tokens por mês'
        },
        {
            title: 'Requests Mensais',
            value: formatNumber(requests),
            description: 'Número de requisições'
        },
        {
            title: 'Modelo Recomendado',
            value: getModelDisplayName(selectedModel),
            description: 'Melhor custo-benefício'
        }
    ];
    
    summaryCards.innerHTML = '';
    
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = `summary-card ${card.highlight ? 'highlight' : ''}`;
        cardElement.innerHTML = `
            <h4>${card.title}</h4>
            <div class="value">${card.value}</div>
            <div class="description">${card.description}</div>
        `;
        
        summaryCards.appendChild(cardElement);
    });
}

// Event Listeners
function addCommercialEventListeners() {
    presentationModeToggle.addEventListener('change', togglePresentationMode);
}

// Inicializar validação em tempo real
document.addEventListener('DOMContentLoaded', function() {
    addRealTimeValidation();
    addBudgetEventListeners();
    addCommercialEventListeners();
});
