const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";


// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 17 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0;

//control the snake

let d;



var el = document.getElementById('touch')
var hc = Hammer(el)
hc.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
})
hc.on('swipe',function(event){
    // console.log(event)
    let x = event.deltaX;
    let y = event.deltaY;
    
    if(x<0 && y<0){
        if(Math.abs(y)>Math.abs(x) && d!= "DOWN"){
            d = "UP"
        }
        else if(Math.abs(x)>Math.abs(y) && d!= "RIGHT"){
            d = "LEFT"
        }
    }
    else if(x>0 && y<0){
        if(Math.abs(y)>Math.abs(x) && d!= "DOWN"){
            d = "UP"
        }
        else if(Math.abs(x)>Math.abs(y) && d!= "LEFT"){
            d = "RIGHT"
        }
    }
    else if(x<0 && y>0){
        if(Math.abs(y)>Math.abs(x) && d!= "UP"){
            d = "DOWN"
        }
        else if(Math.abs(x)>Math.abs(y) && d!= "RIGHT"){
            d = "LEFT"
        }
    }
    else if(x>0 && y>0){
        if(Math.abs(y)>Math.abs(x) && d!= "UP"){
            d = "DOWN"
        }
        else if(Math.abs(x)>Math.abs(y) && d!= "LEFT"){
            d = "RIGHT"
        }
    }


})





document.addEventListener("keydown",direction);

document.getElementById("btn-up").addEventListener("click", function(){
    if(d!= "DOWN"){
        d = "UP"
    }
});
document.getElementById("btn-left").addEventListener("click", function(){
    if(d!="RIGHT"){
        d = "LEFT"
    }
});
document.getElementById("btn-right").addEventListener("click", function(){
    if(d!="LEFT"){
        d = "RIGHT"
    }
});
document.getElementById("btn-down").addEventListener("click", function(){
    if(d!="UP"){
        d = "DOWN"
    }
});




function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP"
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT"
    }else if(key == 40 && d != "UP"){
        d = "DOWN"
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    
    if(newHead.x < box){
        newHead.x = 17*box;
        // console.log('Left out')
    }
    if(newHead.x > 17*box){
        newHead.x = box;
        // console.log('Right out')
    }
    if(newHead.y < 3*box){
        newHead.y = 17*box;
        // console.log('Up out')
    }
    if(newHead.y > 17*box){
        newHead.y = 3*box;
        // console.log('Down out')
    }

    // if the snake eats the food
    if(newHead.x == food.x && newHead.y == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }

    // game over
    
    if(collision(newHead,snake)){
        clearInterval(game);
        // alert('Game Over!')
    }

    snake.unshift(newHead);
    // console.log(snakeX/32,snakeY/32);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);