function censor(){
    const arr = []
    return function f(str1, str2 = undefined) {
        if (str2 == undefined) {
            for (let temp of arr){
                str1 = str1.replaceAll(temp.first, temp.second)
            }
            return str1
        }
        else {
            arr.push({first: str1, second: str2})
        }
    };
}



const changeScene = censor();
changeScene('PHP','JS');
changeScene('backend', 'frontend')
console.log(changeScene(document.getElementById("1").value, document.getElementById("2").value));

let btn = document.getElementById("btn")
btn.onclick = () => {
    if (document.getElementById("2").value === ""){
        alert(changeScene(document.getElementById("1").value))
    }
    else {
        console.log(changeScene(document.getElementById("1").value, document.getElementById("2").value))
    }
}