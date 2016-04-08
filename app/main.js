import BootState from "./states/boot";
import LoadingState from "./states/loading";
import PlayState from "./states/play";
import GameOverState from "./states/gameover";

let game = new Phaser.Game("100%", "100%", Phaser.AUTO, "body");

// add game states
game.state.add("boot", BootState);
game.state.add("loading", LoadingState);
game.state.add("play", PlayState);
game.state.add("gameover", GameOverState);

// start on boot state
game.state.start("boot");
