// ========================================
// ARQUIVO DE CONFIGURAÇÃO - ELEEVA IT
// ========================================
// 
// Este arquivo contém todas as variáveis importantes do sistema.
// Altere apenas os valores aqui para modificar o comportamento da aplicação.
// NÃO modifique os nomes das variáveis.

// ========================================
// CONFIGURAÇÕES DE MARGEM
// ========================================

// Margem padrão aplicada nos cálculos (multiplicador)
// Exemplo: 3 = margem de 3x (cliente paga 3x o valor real)
const DEFAULT_MARGIN = 6;

// Margem fixa para a página do cliente
// Esta é a margem usada quando o cliente faz recarga de créditos
const CLIENT_PAGE_MARGIN = 6;

// Opções de margem disponíveis no dropdown da interface principal
// Formato: { valor: "texto_exibido" }
const MARGIN_OPTIONS = {
    1: "x1 (sem margem)",
    1.5: "x1.5 (50% margem)",
    2: "x2 (100% margem)", 
    2.5: "x2.5 (150% margem)",
    3: "x3 (200% margem)",
    3.5: "x3.5 (250% margem)",
    4: "x4 (300% margem)",
    5: "x5 (400% margem)",
    6: "x6 (500% margem)",
    7: "x7 (600% margem)",
    8: "x8 (700% margem)",
    9: "x9 (800% margem)",
    10: "x10 (900% margem)"
};

// ========================================
// CONFIGURAÇÕES DE MOEDA
// ========================================

// Taxa de conversão USD para BRL
const USD_TO_BRL_RATE = 7.00;

// Símbolo da moeda local
const LOCAL_CURRENCY_SYMBOL = "R$";

// Código da moeda local (para formatação)
const LOCAL_CURRENCY_CODE = "BRL";

// ========================================
// PREÇOS DA API ANTHROPIC
// ========================================
// Preços oficiais da API em USD por 1 milhão de tokens
// ATENÇÃO: Estes são os preços REAIS da API (sem margem)

const API_PRICING = {
    'claude-opus-4.1': { 
        input: 15.00, 
        output: 75.00,
        displayName: "Claude Opus 4.1 (Mais Avançado)"
    },
    'claude-opus-4': { 
        input: 15.00, 
        output: 75.00,
        displayName: "Claude Opus 4"
    },
    'claude-sonnet-4': { 
        input: 3.00, 
        output: 15.00,
        displayName: "Claude Sonnet 4 (Recomendado)"
    },
    'claude-sonnet-3.7': { 
        input: 3.00, 
        output: 15.00,
        displayName: "Claude Sonnet 3.7"
    },
    'claude-3-5-sonnet-20241022': { 
        input: 3.00, 
        output: 15.00,
        displayName: "Claude 3.5 Sonnet (Legacy)"
    },
    'claude-3-5-haiku-20241022': { 
        input: 0.25, 
        output: 1.25,
        displayName: "Claude 3.5 Haiku (Mais Econômico)"
    }
};

// Modelo padrão selecionado na interface
const DEFAULT_MODEL = 'claude-sonnet-4';

// Modelo usado na página do cliente (todos os tipos de interação)
const CLIENT_PAGE_MODEL = 'claude-sonnet-4';

// ========================================
// CONFIGURAÇÕES DA PÁGINA DO CLIENTE
// ========================================

// Tipos de interação disponíveis na página do cliente
// Todos usam o modelo definido em CLIENT_PAGE_MODEL
const CLIENT_INTERACTION_TYPES = {
    chat: {
        name: 'Chat Simples',
        icon: 'fas fa-comment-dots',
        inputTokens: 500,
        outputTokens: 300,
        description: 'Conversas rápidas e perguntas diretas',
        example: 'Ex: "Como fazer um bolo?" ou "Explique sobre IA"'
    },
    analysis: {
        name: 'Análise de Dados',
        icon: 'fas fa-chart-line',
        inputTokens: 2000,
        outputTokens: 1000,
        description: 'Análise de textos, documentos ou dados',
        example: 'Ex: Analisar relatório ou resumir documento'
    },
    creation: {
        name: 'Criação de Conteúdo',
        icon: 'fas fa-magic',
        inputTokens: 1000,
        outputTokens: 2000,
        description: 'Criar textos, artigos ou materiais',
        example: 'Ex: Escrever artigo ou criar apresentação'
    },
    support: {
        name: 'Suporte Técnico',
        icon: 'fas fa-headset',
        inputTokens: 3000,
        outputTokens: 2000,
        description: 'Resolução de problemas complexos',
        example: 'Ex: Debugar código ou resolver erro técnico'
    }
};

// Valor padrão de créditos na página do cliente
const DEFAULT_CREDIT_AMOUNT = 300;

// ========================================
// CONFIGURAÇÕES DE INTERFACE
// ========================================

// Informações da empresa
const COMPANY_INFO = {
    name: "Eleeva IT",
    logo: "public/EleevaIT-AltaDefinicao.png",
    website: "https://eleeva.com.br"
};

// Textos da interface principal
const INTERFACE_TEXTS = {
    mainTitle: "Calculadora de Utilização",
    mainSubtitle: "API Anthropic - Estimativa de Custos",
    clientPageTitle: "Calculadora de Créditos",
    clientPageSubtitle: "Descubra quantas interações você pode fazer"
};

// ========================================
// CONFIGURAÇÕES DE CENÁRIOS (DASHBOARD)
// ========================================

// Cenários pré-definidos para o dashboard comercial
const DASHBOARD_SCENARIOS = {
    basic: {
        name: 'Básico',
        description: 'Ideal para pequenas empresas',
        inputTokens: 10000,
        outputTokens: 5000,
        requests: 100,
        model: 'claude-sonnet-4'
    },
    professional: {
        name: 'Profissional',
        description: 'Para empresas em crescimento',
        inputTokens: 50000,
        outputTokens: 25000,
        requests: 500,
        model: 'claude-sonnet-4'
    },
    enterprise: {
        name: 'Enterprise',
        description: 'Para grandes corporações',
        inputTokens: 200000,
        outputTokens: 100000,
        requests: 2000,
        model: 'claude-sonnet-4'
    }
};

// ========================================
// EXPORTAÇÃO DAS CONFIGURAÇÕES
// ========================================
// NÃO MODIFIQUE ESTA SEÇÃO

// Verificar se estamos no ambiente do navegador
if (typeof window !== 'undefined') {
    // Disponibilizar as configurações globalmente
    window.CONFIG = {
        DEFAULT_MARGIN,
        CLIENT_PAGE_MARGIN,
        MARGIN_OPTIONS,
        USD_TO_BRL_RATE,
        LOCAL_CURRENCY_SYMBOL,
        LOCAL_CURRENCY_CODE,
        API_PRICING,
        DEFAULT_MODEL,
        CLIENT_PAGE_MODEL,
        CLIENT_INTERACTION_TYPES,
        DEFAULT_CREDIT_AMOUNT,
        COMPANY_INFO,
        INTERFACE_TEXTS,
        DASHBOARD_SCENARIOS
    };
}

// Para ambientes Node.js (se necessário no futuro)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DEFAULT_MARGIN,
        CLIENT_PAGE_MARGIN,
        MARGIN_OPTIONS,
        USD_TO_BRL_RATE,
        LOCAL_CURRENCY_SYMBOL,
        LOCAL_CURRENCY_CODE,
        API_PRICING,
        DEFAULT_MODEL,
        CLIENT_PAGE_MODEL,
        CLIENT_INTERACTION_TYPES,
        DEFAULT_CREDIT_AMOUNT,
        COMPANY_INFO,
        INTERFACE_TEXTS,
        DASHBOARD_SCENARIOS
    };
}
