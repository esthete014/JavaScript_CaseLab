
let btn = document.getElementById("myBtn")
let spoiler = document.getElementById("spoiler")

function changeDisplayStatus(){
    if (spoiler.style.display ==  "none") {
        spoiler.style.display = "block"
    }
    else {
        spoiler.style.display = "none"
    }
}

btn.onclick = () => {
    changeDisplayStatus()
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'Escape') {
        spoiler.style.display = "none"
    }
});
