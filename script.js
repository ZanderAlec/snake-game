const campos = document.getElementsByClassName("campo");
const inicio = campos.length/2;
const cobra = [];
let timer; 
let dir = 'cima';

const corpo = {
    p_atual: 0,
    p_prox: 0
};

function Corpo(atual, prox){
    this.p_prox = prox;
    this.p_atual = atual;
} 

function criaCorpo(atual , prox){
    let p1 = new Corpo(atual, prox);
    cobra.push(p1);
    console.log(p1.p_atual);
    campos[p1.p_atual].classList.add("campo-cobra"); 
}

criaCorpo(inicio, inicio+1);
criaCorpo(inicio-1, inicio);


document.addEventListener('keyup', (event)=>{
    let nome = event.key;

    if(nome == 'ArrowDown' && dir != 'cima'){
        dir = 'baixo';
    }else if(nome == 'ArrowUp' && dir != 'baixo'){
        dir = 'cima';
    }else if(nome == 'ArrowLeft' && dir != 'dir'){
        dir = 'esq';
    }else if(nome == 'ArrowRight' && dir != 'esq'){
        dir = 'dir';
    }
});

//Essa função mexe a cabeça da cobra.
//A cabeça é a unica parte que vai realmente interagir com o cenário.
function moveCabeca(){

    let atual, proximo, limite;

    if(dir == 'esq'){
        //calcula o limite da linha na esquerda
        limite = Math.floor((cobra[0].p_atual/20))*20;

        atual = cobra[0].p_atual - 1;

        //Se atingiu o fim da linha retorna pro final da linha.
        if(atual < limite){
            atual = limite + (19);
        }

        proximo = atual -1;
        

    }else if(dir == 'dir'){
        //calcula o limite do tabuleiro na direita
        limite = Math.floor((cobra[0].p_atual/20)+1)*20;

        atual = cobra[0].p_atual + 1;
        
        //Se atingiu o fim da linha retorna pro inicio da linha.
        if(atual == limite){
            atual = limite - 20;
        }

        proximo = atual + 1;

    }else if(dir == 'cima'){

        atual = cobra[0].p_atual - 20;

        console.log("atual:"+atual)

        //verifica o limite de cima
        if(atual < 0){
            atual = campos.length + atual;
        }

        proximo = atual - 20;

    }else if(dir == 'baixo'){
        atual = cobra[0].p_atual + 20;

        //verifica o limite de baixo
        if(atual > campos.length){
            atual = atual - campos.length; 
        }
        
        proximo = atual + 20;
    }

    //Modifica os valores da posição da cabeça
    campos[cobra[0].p_atual].classList.remove("campo-cobra"); 
    cobra[0].p_atual = atual;
    campos[cobra[0].p_atual].classList.add("campo-cobra"); 
    cobra[0].p_prox = proximo;
}

//Movimenta o corpo da cobra
function moveCorpo(proximo){
    campos[cobra[1].p_atual].classList.remove("campo-cobra");
    campos[cobra[1].p_prox].classList.add("campo-cobra");
    cobra[1].p_atual = cobra[1].p_prox;
    cobra[1].p_prox = proximo;
}

//Movimenta a cobra inteira :v
function moveCobra(){

    moveCabeca();

    for(i = 1; i<cobra.length; i++){
        moveCorpo(cobra[i-1].p_atual);
    }
    
}

//Mantém a cobra andando
function iniciaContagem(){
    timer = setInterval((moveCobra), 500);
}

iniciaContagem();







