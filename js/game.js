const scoreEL = document.querySelector('#scoreEL')
const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

// Setting canvas dimensions
canvas.width = innerWidth
canvas.height = innerHeight


//Creating Player
class Player{
    constructor(){
        // Setting initial attributes for the players
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.opacity = 1

        // Loading player image and initializing position
        const image = new Image()
        image.src = '../Images/player.png'
        image.onload = () =>{
            this.image = image // Assigning image and defining player dimentions and position
            this.width = image.width 
            this.height = image.width 
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
                    
        }
            
    }

    // Drawing the player on canvas
    draw(){
        // Drawing player image with rotation and opacity
        c.save()
        c.globalAlpha = this.opacity
        c.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        )
        c.rotate(this.rotation)

        c.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        )
        if (this.image)
        c.drawImage(
            this.image, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        ) 
        c.restore()
    }
        // Updating player position
        update(){
            if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}


//Creating Projectiles
class projectile {
    constructor({position, velocity}){
        this.position = position // Defining attributes for the projectile
        this.velocity = velocity
        this.radius = 4
    }

    draw(){
        c.beginPath()
        //creating arc for circle bullets
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }
    update() {      
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


// Creating Invader Projectiles
class InvaderProjectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.width = 3
        this.height = 10
    }
    draw(){
        // Drawing invader projectile as a rectangle
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {      
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

//Creating Invaders
class Invader{
    constructor({position}){
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = '../Images/enemy1.png'
        image.onload = () =>{
            //Assigning image and defining invaders dimension and position
            this.image = image
            this.width = image.width 
            this.height = image.width 
            this.position = {
                x: position.x,
                y: position.y
            }     
        }
    }

        draw() {
            c.drawImage(
                this.image, 
                this.position.x, 
                this.position.y,
                this.width,
                this.height
            ) 
        }

        update({velocity}){
            if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
    }
        // Invaders shooting behavior
        shoot(invaderProjectiles) {
            // Adding invader projectiles to the game
            invaderProjectiles.push(new InvaderProjectile({
                position: {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height
                },
                velocity: {
                    x: 0,
                    y: 10
                }
            })
        )
    }
}

// Creating grid of invaders
class Grid{
    constructor(){
        // Defining attributes for the grid
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 7,
            y: 0
        }
        this.invaders = []

        // Generating random numbers of invaders in rows and columns
        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 50

        for (let x = 0; x < columns; x++){
        for (let y = 0; y < rows; y++){
            this.invaders.push(
                new Invader({
                    position: {
                        x: x * 50,
                        y: y * 50
                    }
                })
            )
        }
    }
        console.log(this.invaders)
    }
        // Updating grid positions and behavior
        update() {
            this.position.x +=  this.velocity.x
            this.position.y +=  this.velocity.y
            this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0){
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}
    // Initializing game entities
    const player = new Player()
    const projectiles = []
    const grids = []
    const invaderProjectiles = []
    
    
    const keys ={
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
        space: {
            pressed: false
        }
    }

let  frames = 0
let randomInterval = Math.floor(Math.random() * 500 + 500)
let game = {
    over: false,
    active: true
}
let score = 0

// Game logic and animation loop
function animate(){
    if (!game.active) return // If the game is not active, stop the animation loop
    requestAnimationFrame(animate)

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    
    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height){
            setTimeout(() =>{
                invaderProjectiles.splice(index, 1)
            }, 0)
        } else
        invaderProjectile.update()

        if (invaderProjectile.position.y + invaderProjectile.height 
            >= 
            player.position.y &&
            invaderProjectile.position.x + invaderProjectile.width
            >=
            player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width)
            {
                console.log('You Lose')
                

                setTimeout(() => {
                    invaderProjectiles.splice(index, 1)
                    player.opacity = 0
                    displayGameOverModal();
                    game.over = true
                    if (localStorage['currentUser']) {saveScore(score);}
                }, 0)

                setTimeout(() => {
                    game.active = false
                }, 2000)
            }
    })

    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0){
            setTimeout(() =>{
                projectiles.splice(index, 1)
            }, 0)    
        } 
        else {
            projectile.update()
        }
        
    })
    grids.forEach((grid, gridIndex) =>{
        grid.update()

    if (frames % 100 === 0 && grid.invaders.length > 0) {
        grid.invaders[Math.floor(Math.random() * grid.invaders.length)]
        .shoot(invaderProjectiles)
    }

        grid.invaders.forEach((invader, i)=>{
            invader.update({ velocity: grid.velocity })
        
        projectiles.forEach((projectile, j) => {
            if (
                projectile.position.y - projectile.radius <=
                invader.position.y + invader.height && 
                projectile.position.x + projectile.radius >=
                invader.position.x &&
                projectile.position.x - projectile.radius <=
                invader.position.x + invader.width &&
                projectile.position.y + projectile.radius >=
                invader.position.y
            ) {
            setTimeout(() => {
                const invaderFound = grid.invaders.find
                    ((invader2) => invader2 === invader)   

                const projectileFound = projectiles.find
                    ((projectile2) => projectile2 === projectile)

                // Handling collisions btw projectiles and invaders, updating score and grid layout
                if (invaderFound && projectileFound) {
                    score += 10;
                    scoreEL.innerHTML = score;
                    // Removing collided invaders and projectile from their respective arrays
                    grid.invaders.splice(i, 1);
                    projectiles.splice(j, 1);
                    
                // Adjusting grid layout based on remaining invaders or removing the grid
                if (grid.invaders.length > 0){
                    const firstInvader = grid.invaders[0]
                    const lastInvader = grid.invaders[grid.invaders.length - 1]
                    grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width
                    grid.position.x = firstInvader.position.x
                } 
                else {
                    // Removing grid if no more invaders are present
                     grid.splice(gridIndex, 1)
                }
                }
            }, 0)

            }

         })

        })
    })

    // Handling players movement based on key presses
    if (keys.a.pressed && player.position.x >= 0){
        player.velocity.x = -10
        player.rotation = -0.15
    } 
    else if 
        (keys.d.pressed && player.position.x +player.width <= canvas.width){
        player.velocity.x = 10
        player.rotation = 0.15
    }
    else{
        player.velocity.x = 0 // Stoping player movement if no keys are pressed
        player.rotation = 0
    }
    console.log(frames)
    if (frames % randomInterval === 0){
        // Creating a new grid and updating the random interval for grid creation
        grids.push(new Grid())
        randomInterval = Math.floor(Math.random() * 500 + 500)
        frames = 0
    }
    frames++
}
// Strating the game animation loop
animate()

// EventListener for player controls movement and shooting
addEventListener('keydown', ({key}) => {
    if (game.over) return
    switch (key){
        case 'a':
            // console.log('left')
            keys.a.pressed = true
            break
        case 'd':
            // console.log('right')
            keys.d.pressed = true
            break
            case ' ':
                // console.log('space')
                projectiles.push(new projectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                })
            )
                break
    }
})
addEventListener('keyup', ({key}) => {
    // console.log(key)
    switch (key){
        case 'a':
            keys.a.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break

        case ' ':
            break
    }
})




//Exit Button
const exitButton = document.getElementById('exitButton');
    if (exitButton){
        exitButton.addEventListener('click', function() {
    if(confirm('Are you sure you want to exit?')) {
        window.location.href = "profile.html";
    }
    
    })
}

function displayGameOverModal(){
    const gameOverModal = document.getElementById('gameOverModal');
    const gameOverScore = document.getElementById('gameOverScore');
    gameOverModal.style.display = 'block';
    gameOverScore.innerText = score;
}

    document.getElementById('restartButton').addEventListener('click', function(){
        window.location.reload();
    }) 
     

    document.getElementById('exitButtonModal').addEventListener('click', function(){
        if(confirm('Are you sure you want to exit')){
            window.location.href = 'profile.html';
        }
    });

    

// Function to save player's score in local storage
function saveScore(score1){
    let x = JSON.parse(localStorage['currentUser']);
    if (x.score < score1){x.score = score1;} //saving player's score in local storage if it's higher than the stored score
    let email = x.email;
    localStorage[email] = JSON.stringify(x);
    localStorage['currentUser'] = JSON.stringify(x);
}











