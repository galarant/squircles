module.exports = {
  /**
   * things to do before your tests start.
   * In this case, I"m resizing the browser window, so I can see the test output
   * and the game running on the same tiny laptop screen.  *
   * method before
   * @param browser
   */
  /*
  before: function(browser){
    //browser.resizeWindow(800, 600);
  },
  */

  /**
   * Tests your game"s webpage can be served
   * When this fails, it usually means your webserver"s not up.
   * Or you forgot to `npm start`
   *
   * @test
   * @param client
   */
  "Phaser Game Boots Test" : function (client) {
    var squircles = client.page.squircles();
    squircles.navigate()
      .waitForElementVisible("body", 1000);
  },

  /**
   * Tests that Phaser, and your Phaser.Game instance can be loaded ok,
   * and that the expected state is reached by Phaser.StateManager
   *
   * @test
   * @param client
   */
  "Phaser Game Loads Test": function (client) {
    client
      .waitForPhaser(5000)
      .waitForGame(5000)
      .waitForState("play", 5000)
      .assert.currentState("play");
  },

  /**
   * Waits for the game"s actors to be available on the Phaser.Game.Instance
   * You may need to customize the waitForActors custom command depending on how you"re giving access
   * to your own game"s actors.
   *
   * @test
   * @param client
   */
  "E2E Actors are avaialable to test" : function (client) {
    client
      .waitForActors(5000)
      .waitForState("play", 5000)
      .assert.currentState("play");
  },


  /**
   * Custom Squircles Commands
   * @test
   * @param client
   */
  "Demo Player Control from Tests": function (client) {

    client
      .touchSquircles(2000)
      .waitForCBGActivated(5000);
      //.end();
  }
};
