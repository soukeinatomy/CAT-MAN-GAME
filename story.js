document.getElementById("cat-image").src="./assets/images/cat"+cat+".png"
document.getElementById("cat-name").innerHTML = localStorage.getItem("name")

        function changeCatName(e) {
            localStorage.setItem("name", e.target.value);
        }