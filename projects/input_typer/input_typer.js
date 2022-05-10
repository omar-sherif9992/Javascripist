var input = "";
$("input").keydown(function(e) {
    console.log(e.code);
    let letter = (e.code).toLowerCase();
    if (letter == 'backspace') {
        input = input.substring(0, input.length - 1)
    } else {
        if (letter == 'space' || letter == '') {
            input += " ";
        } else {
            input += (letter[3]);
        }
    }
    $('h1').text(input);
});

$("h1").css("background-color", 'blue');