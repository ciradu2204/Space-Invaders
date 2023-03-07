
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d")
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(){
        this.velocity = {
            x: 0,
            y: 0,
        }
        const image = new Image();
        image.src = "./img/spaceship.png"
        image.onload = () => {
            const scale = 0.15;
            this.image = image;
            this.image.width = image.width * scale;
            this.image.height = image.height * scale;
            this.width = this.image.width;
            this.height = this.image.height;
            this.position = {
                x: canvas.width/2 - this.width/2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw(){
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        if(this.image){
            this.position.x  += this.velocity.x;
            this.draw()
        }
    }
}

let player = new Player();
let keys = {
    arrowRight :{
        pressed: false
    },
    arrowLeft :{
        pressed:false
    }
}
const animate = () =>{
    requestAnimationFrame(animate)
    player.update();

    if(keys.arrowRight.pressed && (player.width + player.position.x <= canvas.width)){
        player.velocity.x = 5;
    }else if(keys.arrowLeft.pressed && player.position.x >= 0){
        player.velocity.x = -5;
    }else{
        player.velocity.x = 0;
    }

}
addEventListener(("keydown"), ({key}) => {
    switch(key){
        case "ArrowRight":
            keys.arrowRight.pressed = true;
            player.update()
            break;
        case "ArrowLeft":
            keys.arrowLeft.pressed = true;
            player.update()
            break;
        default:
        break;
    }
})

addEventListener(("keyup"), ({key}) => {
    switch(key){
        case "ArrowRight":
            keys.arrowRight.pressed = false;
            player.update()
            break;
        case "ArrowLeft":
            keys.arrowLeft.pressed = false;
            player.update()
            break;
        default:
        break;
    }
})
animate()


