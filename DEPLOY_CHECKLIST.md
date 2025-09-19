# 🚀 Checklist de Deploy - Vercel

## ✅ Arquivos Necessários para Deploy

### 📄 **Arquivos HTML:**
- [x] `index.html` - Página principal
- [x] `cliente.html` - Página do cliente

### 🎨 **Arquivos CSS:**
- [x] `styles.css` - Estilos principais
- [x] `cliente-styles.css` - Estilos específicos do cliente

### ⚙️ **Arquivos JavaScript:**
- [x] `config.js` - Configurações centralizadas
- [x] `script.js` - JavaScript da página principal
- [x] `cliente-script.js` - JavaScript da página do cliente

### 🖼️ **Recursos:**
- [x] `public/EleevaIT-AltaDefinicao.png` - Logo da empresa
- [x] `public/fundo_apresentacao_eleeva.png` - Fundo (se usado)

### ⚙️ **Configuração:**
- [x] `vercel.json` - Configuração do Vercel
- [x] `.vercelignore` - Arquivos a ignorar no deploy

## 🔧 Configuração do Vercel

### **vercel.json atualizado:**
```json
{
  "version": 2,
  "builds": [
    { "src": "*.html", "use": "@vercel/static" },
    { "src": "*.css", "use": "@vercel/static" },
    { "src": "*.js", "use": "@vercel/static" },
    { "src": "public/**/*", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/cliente.html", "dest": "/cliente.html" },
    { "src": "/", "dest": "/index.html" },
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
```

## 🧪 Testes Pós-Deploy

### **URLs para testar:**
1. **Página Principal**: `https://seu-dominio.vercel.app/`
2. **Página do Cliente**: `https://seu-dominio.vercel.app/cliente.html`

### **Funcionalidades para verificar:**

#### **Página Principal (index.html):**
- [ ] Carregamento da página
- [ ] Seleção de modelo Claude
- [ ] Input de tokens funcionando
- [ ] Cálculos sendo exibidos
- [ ] Dashboard comercial funcionando
- [ ] Gráficos carregando (Chart.js)
- [ ] Link "Página do Cliente" funcionando

#### **Página do Cliente (cliente.html):**
- [ ] Carregamento da página
- [ ] Input de créditos funcionando
- [ ] Seleção de tipos de interação
- [ ] Cálculos sendo exibidos
- [ ] Gráfico de distribuição funcionando
- [ ] Link "Voltar para Interface Técnica" funcionando

### **Recursos externos:**
- [ ] Font Awesome carregando
- [ ] Chart.js carregando
- [ ] Imagens da pasta `public/` carregando

## 🐛 Troubleshooting

### **Se cliente.html retornar 404:**
1. Verificar se `vercel.json` está na raiz do projeto
2. Verificar se `cliente.html` está na raiz (não em subpasta)
3. Fazer novo deploy após atualizar `vercel.json`

### **Se JavaScript não funcionar:**
1. Verificar console do navegador para erros
2. Verificar se `config.js` está carregando primeiro
3. Verificar se todos os arquivos .js estão sendo deployados

### **Se imagens não carregarem:**
1. Verificar se pasta `public/` está na raiz
2. Verificar caminhos relativos nas imagens
3. Verificar se arquivos existem na pasta `public/`

## 📝 Comandos de Deploy

### **Deploy via CLI:**
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer deploy
vercel --prod
```

### **Deploy via Git:**
1. Commit todas as alterações
2. Push para o repositório
3. Vercel fará deploy automático

## ✅ Checklist Final

Antes de cada deploy, verificar:
- [ ] Todos os arquivos commitados
- [ ] `vercel.json` atualizado
- [ ] Configurações no `config.js` corretas
- [ ] Testes locais passando
- [ ] Links entre páginas funcionando
- [ ] Imagens e recursos carregando

---

**💡 Dica:** Sempre teste localmente antes de fazer deploy para produção!
