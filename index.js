
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

class Invader{
    constructor(){
        this.velocity = {
            x: 0,
            y: 0,
        }
        const image = new Image();
        image.src = "./img/invader.png"
        image.onload = () => {
            const scale = 1;
            this.image = image;
            this.image.width = image.width * scale;
            this.image.height = image.height * scale;
            this.width = this.image.width;
            this.height = this.image.height;
            this.position = {
                x: canvas.width/2 - this.width/2,
                y: canvas.height/2
            }
        }
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        if(this.image){
            this.position.x  += this.velocity.x;
            this.position.y += this.velocity.y
            this.draw()
        }
    }
}
class Projectile{
    constructor(position, velocity){
        this.position = position;
        this.velocity = velocity;
        this.radius = 5
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
        c.fillStyle = "red"
        c.fill()
    }

    update(){
        this.position.x  += this.velocity.x;
        this.position.y  += this.velocity.y;
        this.draw()
    }
}

let player = new Player();
let projectiles =  [];
let invader = new Invader()
let keys = {
    arrowRight :{
        pressed: false
    },
    arrowLeft :{
        pressed:false
    },
}
const animate = () =>{
    requestAnimationFrame(animate)
    player.update();
    invader.update();
    projectiles.forEach((projectile, index) => {
        if(projectile.position.y + projectile.radius < 0){
            projectiles.splice(index, 1)
        }
        projectile.update()
    })
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
        case " ":
            projectiles.push(new Projectile({x: player.position.x + player.width/2, y:player.position.y}, {x:0, y: -5}))
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
        case " ":
            break;
        default:
        break;
    }
})
animate()


