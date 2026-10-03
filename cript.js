/**
 * Documento feito para o projeto Feira de Ciências da Terceira Série A do Colégio Paraíso.
 * Integrantes: Filipe Muniz, Arthur Zandoná, Khaiki Miranda, Pedro Henrique, Victória Gabrielle.
 */


/* 
    Functions & Constants
*/

// Constante que gerará a codificação por matrizes.
const matrizChave = [
    [1, 2],
    [1, 3]
];

// Constante que obterá o resultado inverso, decodificando a matriz.
const matrizInversa = [
    [3, -2],
    [-1, 1]
];

    // Transforma letra em número
    function letra_numero(letra) {
        if (letra === '') return 0;
        return letra.charCodeAt(0) - 64;
    }
    
    // Transforma número em letra
    function numero_letra(numero) {
        if (numero === 0) return ' '; // Trata o espaço vazio (adicionado para números ímpares)
        return String.fromCharCode(numero + 64);
    }

    // Prepara a matriz
    function matriz_mensagem(texto) {
        let numeros = texto.toUpperCase().split('').map(letra_numero);
        
        if (numeros.length % 2 !== 0) {
            numeros.push(0);
        }

        let matriz = [];
        for (let i = 0; i < numeros.length; i += 2) {
            matriz.push([numeros[i], numeros[i + 1]]);
        }
        
        return matriz;
    }

    // Matriz genérica 2x2
    function matriz2x2_coluna(matriz2x2, coluna) {
        let a = matriz2x2[0][0], b = matriz2x2[0][1];
        let c = matriz2x2[1][0], d = matriz2x2[1][1];
        let x = coluna[0], y = coluna[1];

        return [
            (a * x) + (b * y),
            (c * x) + (d * y)
        ];
    }

    // Utilizará a matrizChave para codificar a mensagem.
    function codificar(texto) {
        let matrizMensagem = matriz_mensagem(texto);
        let matrizCodificada = [];

        for (let coluna of matrizMensagem) {
            let colunaCifrada = matriz2x2_coluna(matrizChave, coluna);
            matrizCodificada.push(colunaCifrada);
        }
        
        return matrizCodificada.flat(); 
    }

    function decodificar(numerosCodificados) {
        let matrizRecuperada = [];
        let textoDecodificado = "";

        // Agrupa os números codificados de 2 em 2
        for (let i = 0; i < numerosCodificados.length; i += 2) {
            let colunaCifrada = [numerosCodificados[i], numerosCodificados[i + 1]];
            
            // Multiplica pela matriz inversa
            let colunaOriginal = matriz2x2_coluna(matrizInversa, colunaCifrada);
            
            // Converte de volta para letras
            textoDecodificado += numero_letra(colunaOriginal[0]);
            textoDecodificado += numero_letra(colunaOriginal[1]);
        }

        return textoDecodificado;
    }

// ==================================================================================================//

/* 
    DOM application
*/

const inputElement = document.querySelector('.input');
const criptOutput = document.querySelector('.cript p');
const uncriptOutput = document.querySelector('.uncript p');

inputElement.addEventListener('input', function(evento) {
    let textoDigitado = evento.target.value.trim().toUpperCase();
    textoDigitado = textoDigitado.replace(/[^A-Z]/g, ''); 

    if (textoDigitado === '') {
        criptOutput.textContent = 'Digite algo no input acima.';
        uncriptOutput.textContent = 'Digite algo no input acima.';
        criptOutput.style.color = "#2c3e50";
        uncriptOutput.style.color = "#2c3e50";
        return;
    }

    const matrizCriptografada = codificar(textoDigitado);
    
    criptOutput.textContent = matrizCriptografada.join(' ');
    criptOutput.style.color = "#e74c3c"; 

    const letrasCriptografadas = matrizCriptografada.map(numero => {
        
        let modulo = numero % 27;
        
        
        if (modulo < 0) {
            modulo += 27;
        }
        
        return numero_letra(modulo);}).join(''); 
    
    uncriptOutput.textContent = letrasCriptografadas;
    uncriptOutput.style.color = "#8747f4"; 
});


