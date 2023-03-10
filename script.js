const campos = document.getElementsByClassName("campo");
const inicio = campos.length/2;
const cobra = [];
let dir = 'dir';
let comeu = false;

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

geraFruta(2);


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

        // console.log("atual:"+atual)

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

    if(campos[atual].classList.contains('campo-fruta')){
        comeu = true;
    }


    //Modifica os valores da posição da cabeça
    campos[cobra[0].p_atual].classList.remove("campo-cobra"); 
    cobra[0].p_atual = atual;
    campos[cobra[0].p_atual].classList.add("campo-cobra"); 
    cobra[0].p_prox = proximo;
}

//Movimenta o corpo da cobra
function moveCorpo(proximo, i){

        campos[cobra[i].p_atual].classList.remove("campo-cobra");
        campos[cobra[i].p_prox].classList.add("campo-cobra");
        cobra[i].p_atual = cobra[i].p_prox;
        cobra[i].p_prox = proximo;

}

//Movimenta a cobra inteira :v
function moveCobra(){

    moveCabeca();

    for(i = 1; i<cobra.length; i++){
        moveCorpo(cobra[i-1].p_atual, i);
    }
}


//Essa função gera as frutas em locais aleatórios do tabuleiro.
function geraFruta(index){

    //Gera aleatoriamente a proxima posição da maçã
    posicao = Math.floor(Math.random() * campos.length);

    //Garante que a posição da maça não seja igual a da anterior
    //Garante que a maça não apareça em cima da cobra
    while(posicao == index && !campos[posicao].classList.contains("campo-cobra")){
        posicao = Math.floor(Math.random() * campos.length);
    }

    campos[posicao].classList.add("campo-fruta");
   
    console.log(posicao);
}

//Remove o campo maça
function removeFruta(index){
    campos[posicao].classList.remove("campo-fruta");
}


//Gera todos os acontecimentos relacionados a comer a maça
//Criar uma nova
//apagar a antiga
//criar uma nova parte de corpo.
function criaInteracaoFruta(){
    removeFruta(cobra[0].p_atual);
    geraFruta(cobra[0].p_atual);

    let prox = cobra[cobra.length-1].p_atual;
    let atual = prox - 1;
    criaCorpo(atual, prox);
}



//Essa função chama todas as outras necessárias para o funcionamento do jogo.
function rodaJogo(){
    //movimenta a cobra:
    moveCobra();

    //Verifica se o campo é uma maça
    if(comeu){
        criaInteracaoFruta();
        comeu = false;
    } 

    
}

//Mantém a cobra andando
function iniciaContagem(){
    timer = setInterval((rodaJogo), 200);
}

iniciaContagem();







