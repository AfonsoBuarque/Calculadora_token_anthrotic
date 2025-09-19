# 📋 Guia de Configuração - Calculadora de Tokens

## 🎯 Visão Geral

O arquivo `config.js` centraliza **todas as configurações importantes** do sistema. Você pode alterar margens, preços, textos e comportamentos sem mexer no código principal.

## ⚙️ Como Alterar Configurações

### 1. 📊 **Alterando Margens**

```javascript
// Margem padrão (interface principal)
const DEFAULT_MARGIN = 3;  // Altere para 4, 5, etc.

// Margem da página do cliente
const CLIENT_PAGE_MARGIN = 3;  // Altere para o valor desejado
```

**Exemplo prático:**
- `DEFAULT_MARGIN = 5` → Cliente paga 5x o valor real
- `CLIENT_PAGE_MARGIN = 4` → Na página do cliente, R$ 400 = R$ 100 real

### 2. 💱 **Alterando Taxa de Câmbio**

```javascript
const USD_TO_BRL_RATE = 7.00;  // Altere para taxa atual
```

### 3. 💰 **Alterando Preços da API**

```javascript
const API_PRICING = {
    'claude-sonnet-4': { 
        input: 3.00,   // Altere o preço de input
        output: 15.00  // Altere o preço de output
    }
    // ... outros modelos
};
```

### 4. 🎨 **Alterando Textos da Interface**

```javascript
const INTERFACE_TEXTS = {
    mainTitle: "Sua Calculadora Personalizada",
    mainSubtitle: "Seu Subtítulo Aqui"
};
```

### 5. 🔧 **Alterando Tipos de Interação (Página Cliente)**

```javascript
const CLIENT_INTERACTION_TYPES = {
    chat: {
        name: 'Chat Personalizado',
        inputTokens: 1000,  // Altere quantidade de tokens
        outputTokens: 500,  // Altere quantidade de tokens
        description: 'Sua descrição aqui'
    }
};
```

## 🚀 Exemplos de Uso Comum

### Cenário 1: Aumentar Margem para 5x
```javascript
const DEFAULT_MARGIN = 5;
const CLIENT_PAGE_MARGIN = 5;
```

### Cenário 2: Atualizar Taxa do Dólar
```javascript
const USD_TO_BRL_RATE = 6.50;  // Nova taxa
```

### Cenário 3: Alterar Valor Padrão de Créditos
```javascript
const DEFAULT_CREDIT_AMOUNT = 500;  // Era 300, agora 500
```

### Cenário 4: Personalizar Empresa
```javascript
const COMPANY_INFO = {
    name: "Sua Empresa",
    logo: "caminho/para/seu/logo.png"
};
```

## ⚠️ Importante

### ✅ **O que PODE alterar:**
- Todos os valores numéricos (margens, preços, tokens)
- Textos e descrições
- Configurações de empresa
- Tipos de interação

### ❌ **O que NÃO deve alterar:**
- Nomes das variáveis (ex: `DEFAULT_MARGIN`)
- Estrutura dos objetos
- Seção de exportação no final do arquivo

## 🔄 Como Aplicar Mudanças

1. **Abra** o arquivo `config.js`
2. **Altere** apenas os valores desejados
3. **Salve** o arquivo
4. **Recarregue** as páginas no navegador

**Não é necessário** alterar nenhum outro arquivo!

## 📊 Exemplo Completo: Margem 4x

```javascript
// Antes (margem 3x)
const DEFAULT_MARGIN = 3;
const CLIENT_PAGE_MARGIN = 3;
// Cliente paga R$ 300 → Você recebe R$ 100

// Depois (margem 4x)  
const DEFAULT_MARGIN = 4;
const CLIENT_PAGE_MARGIN = 4;
// Cliente paga R$ 400 → Você recebe R$ 100
```

## 🛠️ Troubleshooting

### Problema: Página não carrega
- **Verifique** se não há erros de sintaxe no `config.js`
- **Certifique-se** de que todas as vírgulas estão corretas

### Problema: Valores não atualizaram
- **Recarregue** a página com Ctrl+F5 (força reload)
- **Verifique** se salvou o arquivo `config.js`

## 📞 Suporte

Se precisar de ajuda para configurar algo específico, consulte este guia ou entre em contato com o desenvolvedor.

---

**💡 Dica:** Sempre faça backup do `config.js` antes de grandes alterações!
