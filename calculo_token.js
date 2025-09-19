import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, BarChart3, Info } from 'lucide-react';

const AnthropicUsageCalculator = () => {
  const [model, setModel] = useState('claude-sonnet-4');
  const [inputTokens, setInputTokens] = useState('');
  const [outputTokens, setOutputTokens] = useState('');
  const [requests, setRequests] = useState('1');
  const [results, setResults] = useState(null);

  // Cotação fixa
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatCurrencyBRL = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value * USD_TO_BRL);
  };

  const calculateCosts = () => {
    const inputTokenCount = parseInt(inputTokens) || 0;
    const outputTokenCount = parseInt(outputTokens) || 0;
    const requestCount = parseInt(requests) || 1;
    
    const modelPricing = pricing[model];
    
    // Custo por request
    const inputCostPerRequest = (inputTokenCount / 1000000) * modelPricing.input;
    const outputCostPerRequest = (outputTokenCount / 1000000) * modelPricing.output;
    const totalCostPerRequest = inputCostPerRequest + outputCostPerRequest;
    
    // Custo total
    const totalInputCost = inputCostPerRequest * requestCount;
    const totalOutputCost = outputCostPerRequest * requestCount;
    const totalCost = totalCostPerRequest * requestCount;
    
    setResults({
      inputCostPerRequest,
      outputCostPerRequest,
      totalCostPerRequest,
      totalInputCost,
      totalOutputCost,
      totalCost,
      totalTokens: (inputTokenCount + outputTokenCount) * requestCount
    });
  };

  useEffect(() => {
    if (inputTokens || outputTokens) {
      calculateCosts();
    }
  }, [model, inputTokens, outputTokens, requests]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <Calculator size={32} />
            <div>
              <h1 className="text-2xl font-bold">Calculadora de Utilização</h1>
              <p className="text-blue-100">API Anthropic - Estimativa de Custos</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Seleção do Modelo */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Modelo Claude
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="claude-opus-4.1">Claude Opus 4.1 (Mais Avançado)</option>
              <option value="claude-opus-4">Claude Opus 4</option>
              <option value="claude-sonnet-4">Claude Sonnet 4 (Recomendado)</option>
              <option value="claude-sonnet-3.7">Claude Sonnet 3.7</option>
              <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet (Legacy)</option>
              <option value="claude-3-5-haiku-20241022">Claude 3.5 Haiku (Mais Econômico)</option>
            </select>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Info size={16} />
              Preços com margem: Input {formatCurrency(pricing[model].input)}/1M tokens | Output {formatCurrency(pricing[model].output)}/1M tokens
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                Atualizado 2025
              </span>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tokens de Input
              </label>
              <input
                type="number"
                value={inputTokens}
                onChange={(e) => setInputTokens(e.target.value)}
                placeholder="Ex: 1000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tokens de Output
              </label>
              <input
                type="number"
                value={outputTokens}
                onChange={(e) => setOutputTokens(e.target.value)}
                placeholder="Ex: 500"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Número de Requests
              </label>
              <input
                type="number"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                placeholder="Ex: 100"
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Resultados */}
          {results && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="text-green-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Estimativa de Custos</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Custo por Request */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-700 border-b pb-1">Por Request</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Custo Input:</span>
                      <span className="font-medium">{formatCurrency(results.inputCostPerRequest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Custo Output:</span>
                      <span className="font-medium">{formatCurrency(results.outputCostPerRequest)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total por Request:</span>
                      <span className="font-bold text-blue-600">{formatCurrency(results.totalCostPerRequest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-green-700">Em Reais (R$):</span>
                      <span className="font-bold text-green-600">{formatCurrencyBRL(results.totalCostPerRequest)}</span>
                    </div>
                  </div>
                </div>

                {/* Custo Total */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-700 border-b pb-1">Total ({formatNumber(parseInt(requests))} requests)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Input:</span>
                      <span className="font-medium">{formatCurrency(results.totalInputCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Output:</span>
                      <span className="font-medium">{formatCurrency(results.totalOutputCost)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Custo Total (USD):</span>
                      <span className="font-bold text-blue-600">{formatCurrency(results.totalCost)}</span>
                    </div>
                    <div className="flex justify-between bg-green-100 p-2 rounded">
                      <span className="font-bold text-green-700">Custo Total (R$):</span>
                      <span className="font-bold text-green-600 text-lg">{formatCurrencyBRL(results.totalCost)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total de Tokens Processados:</span>
                    <span className="font-medium">{formatNumber(results.totalTokens)} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cotação Aplicada:</span>
                    <span className="font-medium">1 USD = R$ {USD_TO_BRL.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guia de Estimativa de Tokens */}
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="font-medium text-amber-800 mb-4 flex items-center gap-2">
              <Info size={18} />
              Guia para Estimativa de Tokens
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Tokens de Input (Perguntas)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pergunta curta (20 palavras):</span>
                    <span className="font-medium">~30-40 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pergunta média (50 palavras):</span>
                    <span className="font-medium">~75-100 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pergunta longa (100 palavras):</span>
                    <span className="font-medium">~150-200 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Com contexto/documentos:</span>
                    <span className="font-medium">+500-2000 tokens</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">Tokens de Output (Respostas)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Resposta simples/direta:</span>
                    <span className="font-medium">~50-150 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Explicação média:</span>
                    <span className="font-medium">~200-500 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resposta detalhada:</span>
                    <span className="font-medium">~500-1000 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Análise completa:</span>
                    <span className="font-medium">~1000-2000 tokens</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Dica:</strong> Para calcular tokens de texto em português, use a fórmula: 
                <code className="bg-gray-100 px-2 py-1 rounded ml-1">número de caracteres ÷ 2.5</code>
              </p>
            </div>
          </div>

          {/* Calculadora de Tokens */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-4">Calculadora de Tokens por Texto</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cole um texto de exemplo
                </label>
                <textarea
                  placeholder="Cole aqui um exemplo de pergunta ou resposta típica do seu cliente..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  onChange={(e) => {
                    const text = e.target.value;
                    const estimatedTokens = Math.ceil(text.length / 2.5);
                    const words = text.split(/\s+/).filter(word => word.length > 0).length;
                    
                    const resultDiv = e.target.parentElement.nextElementSibling.querySelector('.token-result');
                    if (resultDiv) {
                      resultDiv.innerHTML = `
                        <div class="space-y-1 text-sm">
                          <div><strong>Caracteres:</strong> ${text.length}</div>
                          <div><strong>Palavras:</strong> ${words}</div>
                          <div class="text-lg font-bold text-blue-600"><strong>Tokens estimados:</strong> ~${estimatedTokens}</div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resultado
                </label>
                <div className="w-full h-32 p-3 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center">
                  <div className="token-result text-gray-500 text-center">
                    Cole um texto ao lado para ver a estimativa de tokens
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Escalas de Uso */}
          {results && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign size={18} />
                Projeções de Escala
              </h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                {[10, 100, 1000, 10000].map(scale => (
                  <div key={scale} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="font-semibold text-gray-700">{formatNumber(scale * parseInt(requests))} requests</div>
                    <div className="text-sm font-bold text-blue-600">{formatCurrency(results.totalCost * scale)}</div>
                    <div className="text-lg font-bold text-green-600">{formatCurrencyBRL(results.totalCost * scale)}</div>
                    <div className="text-xs text-gray-500">{formatNumber(results.totalTokens * scale)} tokens</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnthropicUsageCalculator;