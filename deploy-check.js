#!/usr/bin/env node

/**
 * Script de verificação pré-deploy
 * Verifica se todos os arquivos necessários estão presentes
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando arquivos para deploy...\n');

const requiredFiles = [
    'index.html',
    'styles.css',
    'script.js',
    'vercel.json',
    'package.json',
    'public/EleevaIT-AltaDefinicao.png',
    'public/fundo_apresentacao_eleeva.png'
];

const optionalFiles = [
    'README.md',
    'DEPLOY.md',
    '.gitignore'
];

let allGood = true;

// Verificar arquivos obrigatórios
console.log('📋 Arquivos obrigatórios:');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - FALTANDO!`);
        allGood = false;
    }
});

console.log('\n📄 Arquivos opcionais:');
optionalFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`⚠️  ${file} - Recomendado`);
    }
});

// Verificar tamanho das imagens
console.log('\n🖼️  Verificando imagens:');
const imageFiles = [
    'public/EleevaIT-AltaDefinicao.png',
    'public/fundo_apresentacao_eleeva.png'
];

imageFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`📊 ${file}: ${sizeInMB} MB`);
        
        if (stats.size > 5 * 1024 * 1024) { // 5MB
            console.log(`⚠️  ${file} é muito grande (>${sizeInMB}MB). Considere otimizar.`);
        }
    }
});

// Verificar configuração do vercel.json
console.log('\n⚙️  Verificando configurações:');
if (fs.existsSync('vercel.json')) {
    try {
        const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
        console.log('✅ vercel.json é um JSON válido');
        
        if (vercelConfig.routes && vercelConfig.routes.length > 0) {
            console.log('✅ Rotas configuradas');
        } else {
            console.log('⚠️  Nenhuma rota configurada');
        }
    } catch (error) {
        console.log('❌ vercel.json tem erro de sintaxe:', error.message);
        allGood = false;
    }
}

// Verificar package.json
if (fs.existsSync('package.json')) {
    try {
        const packageConfig = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        console.log('✅ package.json é um JSON válido');
        
        if (packageConfig.name) {
            console.log(`✅ Nome do projeto: ${packageConfig.name}`);
        }
        
        if (packageConfig.version) {
            console.log(`✅ Versão: ${packageConfig.version}`);
        }
    } catch (error) {
        console.log('❌ package.json tem erro de sintaxe:', error.message);
        allGood = false;
    }
}

// Resultado final
console.log('\n' + '='.repeat(50));
if (allGood) {
    console.log('🎉 Tudo pronto para deploy!');
    console.log('\n📝 Próximos passos:');
    console.log('1. git add .');
    console.log('2. git commit -m "Ready for deploy"');
    console.log('3. git push origin main');
    console.log('4. Deploy na Vercel');
    process.exit(0);
} else {
    console.log('❌ Corrija os problemas antes do deploy');
    process.exit(1);
}
