define([], function() {

    var ScoreDisplay = function(x, y, player) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.player = player;

        this.types = {
            Text: true,
        };
    };

    return ScoreDisplay;

});
