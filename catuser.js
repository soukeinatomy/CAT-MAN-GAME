let current = 1;
localStorage.setItem("cat", "1");

function selectCat(index) {
    document.getElementById("cat-"+current).classList.toggle("active")
    document.getElementById("cat-"+index).classList.toggle("active")
    current = index;

    localStorage.setItem("cat", index.toString());
}