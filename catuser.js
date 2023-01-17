// Local storage allows the JavaScript sites to store and access the data without any expiration date.

let current = 1;
localStorage.setItem("cat", "1");

//Select function return index of element, reference element id
function selectCat(index) {
document.getElementById("cat-"+current).classList.toggle("active")
document.getElementById("cat-"+index).classList.toggle("active")
current = index;

localStorage.setItem("cat", index.toString());
}