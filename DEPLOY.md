# 🚀 Deploy na Vercel - Calculadora Anthropic Eleeva IT

## 📋 Pré-requisitos

1. **Conta na Vercel**: [vercel.com](https://vercel.com)
2. **Git instalado**: Para versionamento
3. **Vercel CLI** (opcional): `npm i -g vercel`

## 🔧 Preparação para Deploy

### 1. Estrutura do Projeto
```
calculadora-anthropic-eleeva/
├── index.html              # Página principal
├── styles.css              # Estilos
├── script.js               # JavaScript
├── vercel.json             # Configuração Vercel
├── package.json            # Metadados do projeto
├── .gitignore              # Arquivos ignorados
├── README.md               # Documentação
├── DEPLOY.md               # Este arquivo
└── public/                 # Recursos estáticos
    ├── EleevaIT-AltaDefinicao.png
    └── fundo_apresentacao_eleeva.png
```

### 2. Arquivos de Configuração

#### `vercel.json`
- ✅ Configurado para site estático
- ✅ Rotas otimizadas
- ✅ Headers de cache configurados

#### `package.json`
- ✅ Metadados do projeto
- ✅ Scripts de desenvolvimento
- ✅ Informações de repositório

## 🌐 Métodos de Deploy

### Método 1: Deploy via GitHub (Recomendado)

1. **Criar repositório no GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Calculadora Anthropic Eleeva IT"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/calculadora-anthropic-eleeva.git
   git push -u origin main
   ```

2. **Conectar na Vercel**:
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe do GitHub
   - Selecione o repositório
   - Deploy automático!

### Método 2: Deploy via Vercel CLI

1. **Instalar Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login na Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy do projeto**:
   ```bash
   vercel
   ```

4. **Deploy para produção**:
   ```bash
   vercel --prod
   ```

### Método 3: Deploy via Drag & Drop

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Arraste a pasta do projeto
3. Configure o nome do projeto
4. Deploy automático!

## ⚙️ Configurações da Vercel

### Configurações Recomendadas:
- **Framework Preset**: Other
- **Build Command**: (deixar vazio)
- **Output Directory**: (deixar vazio)
- **Install Command**: (deixar vazio)

### Variáveis de Ambiente:
Não são necessárias para este projeto estático.

## 🔍 Verificações Pós-Deploy

### ✅ Checklist de Verificação:

1. **Funcionalidade**:
   - [ ] Calculadora carrega corretamente
   - [ ] Todos os modelos Claude funcionam
   - [ ] Cálculos estão precisos
   - [ ] Conversão USD/BRL funciona

2. **Visual**:
   - [ ] Logo da Eleeva IT aparece
   - [ ] Imagem de fundo carrega
   - [ ] Design responsivo funciona
   - [ ] Animações funcionam

3. **Performance**:
   - [ ] Carregamento rápido (< 3s)
   - [ ] Imagens otimizadas
   - [ ] CSS/JS minificados automaticamente

4. **SEO**:
   - [ ] Meta tags presentes
   - [ ] Open Graph configurado
   - [ ] Favicon funcionando

## 🌍 URLs de Exemplo

- **Produção**: `https://calculadora-anthropic-eleeva.vercel.app`
- **Preview**: `https://calculadora-anthropic-eleeva-git-main.vercel.app`
- **Development**: `https://calculadora-anthropic-eleeva-dev.vercel.app`

## 🔄 Atualizações Automáticas

### GitHub Integration:
- **Push para `main`** → Deploy automático em produção
- **Pull Request** → Deploy de preview automático
- **Branch `dev`** → Deploy de desenvolvimento

### Comandos Úteis:
```bash
# Deploy de preview
vercel

# Deploy de produção
vercel --prod

# Ver logs
vercel logs

# Ver domínios
vercel domains

# Remover projeto
vercel remove
```

## 🛠️ Troubleshooting

### Problemas Comuns:

1. **Imagens não carregam**:
   - Verificar caminhos relativos
   - Confirmar arquivos na pasta `public/`

2. **CSS não aplica**:
   - Verificar caminho do `styles.css`
   - Limpar cache do navegador

3. **JavaScript não funciona**:
   - Verificar console do navegador
   - Confirmar caminho do `script.js`

4. **Deploy falha**:
   - Verificar `vercel.json`
   - Confirmar estrutura de arquivos

## 📊 Monitoramento

### Analytics da Vercel:
- Acesse o dashboard da Vercel
- Veja métricas de performance
- Monitore erros e logs

### Métricas Importantes:
- **Core Web Vitals**
- **Tempo de carregamento**
- **Taxa de erro**
- **Tráfego por região**

## 🔒 Segurança

### Headers de Segurança (já configurados):
- Cache-Control otimizado
- CORS configurado
- HTTPS automático

## 📞 Suporte

### Em caso de problemas:
1. Verificar [documentação da Vercel](https://vercel.com/docs)
2. Consultar [status da Vercel](https://vercel-status.com)
3. Abrir ticket no suporte da Vercel

---

**Deploy preparado por Eleeva IT** 🚀
