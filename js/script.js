const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

function Rect(x,y,width,height,color){
    return{x,y,width,height,color};
}

const player1 = Rect(0,(canvas.height -100) / 2, 20,100, 'white'); //El primer jugador es un bloque rectangular
const player2 = Rect(canvas.width -20 ,(canvas.height -100) / 2, 20,100, 'white'); //El primer jugador es un bloque rectangular
const ball = Rect(canvas.width / 2 - 10, canvas.height / 2 - 10, 20, 20, 'white'); //Se crea un pequeña pelota
ball.velocityX = 4;
ball.velocityY = 4;

//Función para crear un rectángulo de un color cualquiera
function drawRect(rect){
    context.fillStyle = rect.color;
    context.fillRect(rect.x,rect.y,rect.width,rect.height);
}

function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawRect(player1); //Se dibuja el jugador 1
    drawRect(player2); //Se dibuja el jugador 2
    drawRect(ball); //Se dibuja la pelota
}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //Rebote de la pelota en cada borde
    if(ball.y <= 0 || (ball.y + ball.height) >= canvas.height){
        //La velocidad se reduce
        ball.velocityY *= -1;
    }

    //Rebote de la pelota en cada jugador
    if(
        ((ball.x <= player1.x + player1.width) && (ball.y + ball.height > player1.y) && (player1.y + player1.height)) ||
        ((ball.x + ball.width >= player2.x) && (ball.y + ball.height > player2.y) && (ball.y <player2.y + player2.height))
    ){
        //La velocidad se reduce
        ball.velocityX *= -1;
    }

    //Reinicio de la pelota en una nueva posición si esta sale del los bordes o marco el juego
    if(ball.x < 0 || ball.x > canvas.width){
        ball.x = canvas.width / 2 -10;
        ball.y = canvas.height/2 - 10;
        ball.velocityX *= -1; //Se reduce la velocidad en el eje X
        //Se obtiene una posición aleatoria de velocidad en el eje "Y" y se incrementa o reduce la velocidad de acuerdo al random
        ball.velocityY *= Math.random() > 0.5 ? 1 : -1 ; 
    }
}

window.addEventListener('keydown', (event)=>{
    const key = event.key;
    if(key === 'ArrowUp' && player2.y > 0) player2.y -= 10; //Si el jugador2 presiona la flecha hacia arriba se reduce (mueve) en 10 pixeles hacia arriba
    if(key === 'ArrowDown' && player2.y + player2.height < canvas.height) player2.y +=10; // Si el jugador2 presiona la flecha hacia abajo (mueve) en 10 pixeles hacia abajo
    if(key === 'w' && player1.y > 0) player1.y -=10; //Si el jugador1 presiona la tecla 'w' entonces se reduce (mueve) en 10 pixeles hacia arriba
    if(key === 's' && player1.y + player1.height < canvas.height) player1.y +=10; //Si el jugador1 presiona la tecla 's' entonces se reduce (mueve) en 10 pixeles hacia abajo
});

//Indicar que el juego será cíclico
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

//Iniciar el juego
gameLoop();