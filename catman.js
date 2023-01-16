//MAINGAME

const canvas = document.getElementById("board"); 
canvas.width = 1025;
canvas.height = 800;
const ctx = canvas.getContext("2d");

const img = new Image();
const mouseImage = new Image();
const dogImage = new Image();
const loadedImages = 0;
const score = 0;
const time = 300, milli_time = 0;
img.src = './assets/images/cat1.png';
mouseImage.src = './assets/images/mouse.png';
dogImage.src = './assets/images/dog.png';
img.addEventListener('load', () => {loadedImages++});
mouseImage.addEventListener('load', () => {loadedImages++});
dogImage.addEventListener('load', () => {loadedImages++});

document.onkeypress=handleKeyPress;

const cat_x = 0, cat_y = 0;
const dog_x = 500, dog_y = 350, dog_speed = 25, dog_route_number = 1;
const speed = 10;
const obstacles = [[50, 150, 400, 50], [400, 100, 50, 400], [800, 50, 50, 400], [700, 100, 100, 50], [700, 200, 100, 50],
                    [650, 350, 250, 50], [50, 750, 50, 50], [350, 550, 50, 250], [550, 450, 50, 350]]
var dog_routes = [[500, 350], [600, 350], [600, 750], [950, 750], [950, 0], [450, 0], [450, 750], [500, 750]];

const mice = [[500, 750], [750, 300], [900, 200]];
const dead_mice = [false, false, false];

startGame()

function startGame() {
    setInterval(updateDogPosition, 100);
}

function updateDogPosition() {
    if (loadedImages == 3) {
        if (dog_x == dog_routes[dog_route_number % dog_routes.length][0]
            && dog_y == dog_routes[dog_route_number % dog_routes.length][1])
            dog_route_number = (dog_route_number + 1) % dog_routes.length;
        
        if (dog_routes[dog_route_number][0] > dog_x) dog_x += dog_speed;
        if (dog_routes[dog_route_number][0] < dog_x) dog_x -= dog_speed;
        if (dog_routes[dog_route_number][1] > dog_y) dog_y += dog_speed;
        if (dog_routes[dog_route_number][1] < dog_y) dog_y -= dog_speed;

        milli_time++;
        if (!(milli_time % 10))
            time --;
        printTime();
        checkDog();
        draw();
    }
}

function formatNumber(number) {
    return ("0" + number).slice(-2);
}

function printTime() {
    if (time <= 0) {
        location.href="./fail.html";
    }
    const m = parseInt(time / 60);
    const s = time % 60;
    document.getElementById("time").innerHTML = formatNumber(m)+":"+formatNumber(s);
}

function isIntersectRect(x, y, w, h, x1, y1, w1, h1) {
    if (!(x + w <= x1 || x >= x1 + w1 || y + h <= y1 || y >= y1 + h1)) return true
    return false
}

function draw() {
    ctx.rect(0, 0, 1025, 800);
    ctx.fillStyle = "gray";
    ctx.fill();

    for (let i = 0; i < obstacles.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(obstacles[i][0], obstacles[i][1], obstacles[i][2], obstacles[i][3])
        ctx.fill()
    }

    for (let i = 0; i < mice.length; i++)
        if (!dead_mice[i])
            ctx.drawImage(mouseImage, mice[i][0], mice[i][1], 50, 50);

    ctx.drawImage(dogImage, dog_x, dog_y, 50, 50);

    ctx.drawImage(img, cat_x, cat_y, 50, 50);
}

function handleKeyPress(e) {
    const _cat_x = cat_x, _cat_y = cat_y;

    switch(e.keyCode) {
        case 97:
            _cat_x -= speed;
            break;
        case 119:
            _cat_y -= speed;
            break;
        case 100:
            _cat_x += speed;
            break;
        case 115:
            _cat_y += speed;
            break;
    }
    e.preventDefault();

    let isObstacle = false;
    if (_cat_x < 0 || _cat_x >= 975 || _cat_y < 0 || _cat_y > 750)
        isObstacle = true;
    for (let i = 0; i < obstacles.length; i++) {
        if (isIntersectRect(_cat_x, _cat_y, 50, 50, obstacles[i][0], obstacles[i][1], obstacles[i][2], obstacles[i][3]))
            isObstacle = true;
    }
    if (!isObstacle) {
        cat_x = _cat_x;
        cat_y = _cat_y;
    }

    catchMice();

    draw();
}

function catchMice() {
    for (let i = 0; i < 3; i++)
        if (!dead_mice[i] && isIntersectRect(cat_x, cat_y, 50, 50, mice[i][0], mice[i][1], 50, 50)) {
            dead_mice[i] = true;
            score++;
            document.getElementById("score").innerHTML = score;

            if (score == 3)
                location.href="./success.html";
        }
}

function checkDog() {
    if (isIntersectRect(cat_x, cat_y, 50, 50, dog_x, dog_y, 50, 50)) {
        location.href="./fail.html";
    }
}


//LOADING

setTimeout(() => {
    location.href="./game.html";
}, 5000)

const cat = localStorage.getItem("cat")
document.getElementById("cat").src="./assets/images/cat"+cat+".png"

//CATUSER

let current = 1;
localStorage.setItem("cat", "1");

function selectCat(index) {
    document.getElementById("cat-"+current).classList.toggle("active")
    document.getElementById("cat-"+index).classList.toggle("active")
    current = index;

    localStorage.setItem("cat", index.toString());
}

//STORY

const cat = localStorage.getItem("cat")
document.getElementById("cat-image").src="./assets/images/cat"+cat+".png"
document.getElementById("cat-name").innerHTML = localStorage.getItem("name")

//USERNAME

const cat = localStorage.getItem("cat")
        document.getElementById("cat-image").src="./assets/images/cat"+cat+".png"
        document.getElementById("cat-num").innerHTML = "Cat " + cat;

        function changeCatName(e) {
            localStorage.setItem("name", e.target.value);
        }
