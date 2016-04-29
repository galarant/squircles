let tests = {
  /**
   * things to do before your tests start.
   * In this case, I'm setting the focus on the browser window
   * method before
   * @param client
   */
  before: function(client) {
    client
      .execute("alert('Setting Focus');")
      .pause(200)
      .acceptAlert();
  },

  /**
   * Tests your game"s webpage can be served
   * When this fails, it usually means your webserver"s not up.
   * Or you forgot to `npm start`
   *
   * @test
   * @param client
   */
  "Phaser Game Boots Test": function (client) {
    let squircles = client.page.squircles();
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
      .pause(500)
      .showCustomDebug(2000)
      .touchSquircles()
      .waitForCBGActivated(5000)
      .pause(3000)
      .end();
  }
};

module.exports = tests;
