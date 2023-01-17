

const cat = localStorage.getItem("cat")
document.getElementById("cat-image").src="./assets/images/cat"+cat+".png"
document.getElementById("cat-name").innerHTML = localStorage.getItem("name")