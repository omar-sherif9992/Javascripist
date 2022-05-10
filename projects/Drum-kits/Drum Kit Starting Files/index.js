const buttons = document.querySelectorAll('button');
console.log("hello");
document.addEventListener('keydown', function(e) {
    let code = (e.code[3]).toLowerCase();
    playSound(code);
    console.log(e)
    let ele = document.querySelector('.' + code);


    ele.classList.add('pressed');
    setTimeout(function() {
        console.log(this);
        ele.classList.remove('pressed');
    }, 100);


});
for (var i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function() {
        playSound(this.innerHTML);

        this.classList.add('pressed');
        let b = this;
        setTimeout(function() {
            console.log(this);
            b.classList.remove('pressed');
        }, 100);
    });


}

function playSound(key) {

    switch (key) {
        case "w":
            var audio = new Audio('sounds/tom-2.mp3');
            audio.play();
            break;
        case "a":
            var audio = new Audio('sounds/tom-3.mp3');
            audio.play();
            break;
        case "s":
            var audio = new Audio('sounds/tom-4.mp3');
            audio.play();
            break;
        case "d":
            var audio = new Audio('sounds/tom-1.mp3');
            audio.play();
            break;
        case "j":
            var audio = new Audio('sounds/snare.mp3');
            audio.play();
            break;
        case "k":
            var audio = new Audio('sounds/crash.mp3');
            audio.play();
            break;
        case "l":
            var audio = new Audio('sounds/kick-bass.mp3');
            audio.play();
            break;
        default:
            var audio = new Audio('sounds/kick-bass.mp3');
            audio.play();


    }
}