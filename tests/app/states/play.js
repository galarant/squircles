let tests = {
  /**
   * Things to run before test suite starts:
   * Set the focus on the browser window.
   * Navigate to the app.
   */
  before: function(client) {
    let squircles = client.page.squircles();
    client
      .execute("alert('Setting Focus');")
      .acceptAlert();
    squircles.navigate();
  },

  /**
   * Things to run after test suite ends:
   * Close the browser.
   */
  after: function(client) {
    client
      .end();
  },

  /**
   * Tests that the play state is loaded
   */
  "Play State Loads": function(client) {
    client
      .waitForState("play", 5000)
      .assert.currentState("play");
  },

  /**
   * Tests that the play state initialized correctly
   */
  "Play State Initialized": function(client) {
    client
      .assert.maxPointers(1)
      .assert.worldBounds(true)
      .assert.subState("playing");
  },

  "Game Over": function(client) {
    client
      .gameOver(1000)
      .assert.subState("game_over")
      .gameInputDown()
      .pause(1000)
      .assert.subState("playing");
  },

  "Game Restart": function(client) {
    client
      .gameInputDown()
      .assert.subState("playing");
  }
};

module.exports = tests;
