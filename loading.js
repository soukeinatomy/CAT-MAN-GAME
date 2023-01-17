
//TIMEOUT TO PAGE GAME 5SEC
setTimeout(() => {
    location.href="./game.html";
}, 5000)

const cat = localStorage.getItem("cat")
document.getElementById("cat").src="./assets/images/cat"+cat+".png"