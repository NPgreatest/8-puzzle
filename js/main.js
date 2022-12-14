function queue(funcs, delay) {
    var i;
    var o;

    setTimeout(function run() {
        o = funcs.shift();
        if (o !== undefined) {
            o.fnc(o.args[0], o.args[1]);
            setTimeout(run, delay);
        }
    }, delay);

}

var overlay = new Overlay({});
var $game_board = $('#game_board');
var game;
var btnScramble  = $('#btnScramble');

$('p.pic').on('click', function (e) {

    btnScramble.show();

    if (game) {
        game.destroy();
        game = null;
    }
    $('p.pic').removeClass('selected');
    $(this).addClass('selected');

    //if (overlay.isVisible()) {
    //    overlay.hide();
    //}

    var img = this.children[0];
    var pic_url = img.getAttribute("src");

    overlay.load_img(pic_url);
    overlay.show(true);

    setTimeout(function () {
        game = slidePuzzle.Game.newGame($game_board, pic_url, 'easy');
    }, 300)

});


$(btnScramble).on('click', function () {
 //1323h923r983hf803hf83h49f83h498
    overlay.load_img(pic_url);
    overlay.show(true);

    setTimeout(function () {
        game = slidePuzzle.Game.newGame($game_board, pic_url, 'easy');
    }, 300)

    var pic_url = overlay.get_image_url();
    overlay.hide(true);
    game.showBoard();
    $(this).hide();
});


$('#solve').on('click', function (e) {
    e.preventDefault();
    var blocks = game.getBoardArray();
    var board = new Board(blocks);
    var solution = Solver.create(board);
    // Should always be solvable by the way we have set it up.
    if (solution.isSolvable) {
        var q = [];
        var boards = solution.getSolution();

        for (var i = 0; i < boards.length; i++) {
            boards[i].printBoard();
            if (boards[i].move !== undefined) {
                q.push({ fnc: game.movePosition, args: [boards[i].move[0], boards[i].move[1]] })
            }
        }
        queue(q, 200);
    } else {
        console.log("No solution found");
    }
});
$('#out').on('click', function (e) {
    e.preventDefault();
    var blocks = game.getBoardArray();
    var board = new Board(blocks);
    var solution = Solver.create(board);
    // Should always be solvable by the way we have set it up.
    if (solution.isSolvable) {
        var q = [];
        var boards = solution.getSolution();

        for (var i = 0; i < boards.length; i++) {
            boards[i].printBoard();
            if (boards[i].move !== undefined) {
                q.push({ fnc: game.movePosition, args: [boards[i].move[0], boards[i].move[1]] })
            }
        }
        var copy=[];
        q.forEach(x =>copy.push(x))
        output(copy);
    } else {
        console.log("No solution found");
    }
});
