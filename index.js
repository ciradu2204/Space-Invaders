
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d")
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(){
        this.velocity = {
            x: 100,
            y: 100,
        }
        const image = new Image();
        image.src = "./img/spaceship.png"
        const scale = 0.15;
        image.onload = () => {
            this.image = image;
            this.image.width = image.width * scale;
            this.image.height = image.height * scale;
            this.width = this.image.width;
            this.height = this.image.height;
            this.position = {
                x: canvas.width/2 - this.width/2,
                y: canvas.height - this.height
            }
        }
    }

    draw(){
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        if(this.image) c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height );
    }
}

let player = new Player();
const animate = () =>{
    requestAnimationFrame(animate)
    player.draw();
}
animate()
