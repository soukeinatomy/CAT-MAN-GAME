
 const cat = localStorage.getItem("cat")
 document.getElementById("cat-image").src="./assets/images/cat"+cat+".png"
 document.getElementById("cat-num").innerHTML = "Cat " + cat;

 function changeCatName(e) {
     localStorage.setItem("name", e.target.value);
 }