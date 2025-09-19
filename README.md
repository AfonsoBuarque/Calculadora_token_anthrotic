# Calculadora de Custos - API Anthropic

Uma calculadora web moderna e responsiva para estimar custos de utilização da API da Anthropic (Claude). Desenvolvida em HTML, CSS e JavaScript vanilla para fácil integração em qualquer site.

## 🚀 Funcionalidades

### ✨ Principais
- **Cálculo de Custos**: Estimativa precisa baseada em tokens de input/output
- **Múltiplos Modelos**: Suporte a todos os modelos Claude disponíveis
- **Conversão de Moeda**: Valores em USD e BRL (cotação configurável)
- **Projeções de Escala**: Visualização de custos para diferentes volumes
- **Calculadora de Tokens**: Estimativa de tokens baseada em texto

### 🎨 Interface
- **Design Moderno**: Interface limpa e profissional com branding Eleeva IT
- **Background Personalizado**: Imagem de fundo da Eleeva IT com overlay elegante
- **Logo Integrado**: Logo da Eleeva IT no cabeçalho com efeitos hover
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Backdrop Filter**: Efeito de vidro fosco no card principal
- **Acessibilidade**: Tooltips e navegação por teclado

### 🔧 Funcionalidades Avançadas
- **Validação em Tempo Real**: Verificação automática de dados
- **Debounce**: Otimização de performance nos cálculos
- **Persistência**: Salva configurações no localStorage
- **Atalhos de Teclado**: Ctrl+Enter para calcular, Esc para limpar

## 📁 Estrutura dos Arquivos

```
/
├── index.html          # Estrutura principal da página
├── styles.css          # Estilos e design responsivo
├── script.js           # Lógica da calculadora
├── calculo_token.js    # Código React original (referência)
├── README.md           # Este arquivo
└── public/             # Recursos visuais
    ├── EleevaIT-AltaDefinicao.png      # Logo da Eleeva IT
    └── fundo_apresentacao_eleeva.png   # Imagem de fundo
```

## 🛠️ Como Usar

### Instalação Simples
1. Faça download de todos os arquivos
2. Coloque os arquivos no seu servidor web
3. Abra `index.html` no navegador

### 🚀 Deploy na Vercel
Para deploy em produção, consulte o arquivo [DEPLOY.md](DEPLOY.md) com instruções completas.

### Integração no Site
Para integrar no seu site existente:

```html
<!-- Adicione no <head> -->
<link rel="stylesheet" href="path/to/styles.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

<!-- Adicione o conteúdo da calculadora onde desejar -->
<div id="calculadora-anthropic">
    <!-- Conteúdo do index.html aqui -->
</div>

<!-- Adicione antes do </body> -->
<script src="path/to/script.js"></script>
```

## ⚙️ Configurações

### Preços dos Modelos
Os preços estão definidos no arquivo `script.js` com margem de 3x:

```javascript
const pricing = {
    'claude-opus-4.1': { input: 45.00, output: 225.00 },
    'claude-opus-4': { input: 45.00, output: 225.00 },
    'claude-sonnet-4': { input: 9.00, output: 45.00 },
    'claude-sonnet-3.7': { input: 9.00, output: 45.00 },
    'claude-3-5-sonnet-20241022': { input: 9.00, output: 45.00 },
    'claude-3-5-haiku-20241022': { input: 0.75, output: 3.75 }
};
```

### Cotação USD/BRL
Para alterar a cotação, modifique a constante:

```javascript
const USD_TO_BRL = 6.00; // Altere para a cotação desejada
```

## 📱 Responsividade

A calculadora é totalmente responsiva e se adapta a:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Grid adaptativo e elementos otimizados
- **Mobile**: Interface compacta e touch-friendly

## 🎯 Guia de Uso

### 1. Seleção do Modelo
Escolha o modelo Claude que será utilizado. Cada modelo tem preços diferentes para input e output.

### 2. Inserção de Tokens
- **Input Tokens**: Tokens da pergunta + contexto
- **Output Tokens**: Tokens da resposta esperada
- **Requests**: Quantidade de requisições

### 3. Estimativa de Tokens
Use a calculadora de tokens para estimar baseado em texto real:
- Cole um exemplo de pergunta/resposta
- Veja a estimativa automática
- Use a fórmula: `caracteres ÷ 2.5`

### 4. Resultados
Visualize:
- Custo por request individual
- Custo total para todas as requests
- Valores em USD e BRL
- Projeções para diferentes escalas

## 🔍 Exemplos de Uso

### Chat Simples
- Input: ~100 tokens
- Output: ~200 tokens
- Uso: Conversas básicas

### Análise de Documento
- Input: ~2000 tokens
- Output: ~800 tokens
- Uso: Análise e resumo de textos

### Geração de Código
- Input: ~500 tokens
- Output: ~1500 tokens
- Uso: Desenvolvimento assistido por IA

## 🚀 Melhorias Implementadas

### Performance
- **Debounce**: Evita cálculos excessivos durante digitação
- **Validação Otimizada**: Verificação eficiente de dados
- **Lazy Loading**: Carregamento sob demanda de elementos

### UX/UI
- **Animações**: Transições suaves e feedback visual
- **Tooltips**: Ajuda contextual em elementos
- **Estados de Loading**: Indicadores visuais de processamento
- **Atalhos**: Navegação rápida por teclado

### Funcionalidades Extras
- **Persistência**: Salva última configuração usada
- **Validação**: Impede valores inválidos
- **Formatação**: Números formatados para português brasileiro

## 🔧 Personalização

### Cores e Tema
Modifique as variáveis CSS no início do `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #059669;
    --warning-color: #f59e0b;
}
```

### Modelos Disponíveis
Adicione novos modelos no objeto `pricing` em `script.js`:

```javascript
pricing['novo-modelo'] = { input: 10.00, output: 50.00 };
```

## 📊 Métricas e Analytics

A calculadora pode ser facilmente integrada com ferramentas de analytics:

```javascript
// Exemplo de tracking
function trackCalculation(model, inputTokens, outputTokens) {
    // Integrar com Google Analytics, Mixpanel, etc.
    gtag('event', 'calculation', {
        'model': model,
        'input_tokens': inputTokens,
        'output_tokens': outputTokens
    });
}
```

## 🛡️ Segurança

- **Validação Client-Side**: Todos os inputs são validados
- **Sanitização**: Prevenção contra XSS
- **Sem Dependências Externas**: Apenas Font Awesome via CDN

## 📈 SEO e Performance

- **HTML Semântico**: Estrutura otimizada para SEO
- **Meta Tags**: Configuradas para compartilhamento
- **Performance**: CSS e JS otimizados
- **Acessibilidade**: ARIA labels e navegação por teclado

## 🤝 Contribuição

Para contribuir com melhorias:

1. Identifique a área de melhoria
2. Teste as modificações
3. Documente as mudanças
4. Mantenha a compatibilidade

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique o console do navegador para erros
- Teste em diferentes navegadores
- Valide a estrutura dos arquivos

## 🔄 Atualizações

### Versão Atual: 1.2 (2025)
- ✅ Calculadora completa
- ✅ Interface responsiva
- ✅ Todas as funcionalidades do React original
- ✅ Melhorias de UX/UI
- ✅ **NOVO**: Modelos Claude 4.x (Opus 4.1, Opus 4, Sonnet 4, Sonnet 3.7)
- ✅ **NOVO**: Badge "Atualizado 2025" com animação
- ✅ **NOVO**: Claude Sonnet 4 como modelo padrão recomendado
- ✅ **NOVO**: Background personalizado da Eleeva IT
- ✅ **NOVO**: Logo da Eleeva IT integrado no cabeçalho
- ✅ **NOVO**: Efeito backdrop filter (vidro fosco)

### Próximas Versões
- 📋 Histórico de cálculos
- 📊 Gráficos de custos
- 🔄 API de cotação em tempo real
- 📱 PWA (Progressive Web App)

---

**Desenvolvido com ❤️ para facilitar o uso da API Anthropic**
