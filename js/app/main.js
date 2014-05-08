define(["Game", "AnimationFrame"], function(Game) {

    var time = Date.now(),
        game = new Game();

    function main() {
        window.requestAnimationFrame(main);

        var now = Date.now();
        var delta = now - time;
        time = now;

        game.update(delta);
        game.draw();
    }

    main();
});
