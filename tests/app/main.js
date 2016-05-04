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
   * Tests that the page can be served
   */
  "Phaser Game Boots Test": function(client) {
    client
      .waitForElementVisible("body", 1000);
  },

  /**
   * Tests that Phaser and Phaser.Game are loaded
   * and that the expected state is reached by Phaser.StateManager
   */
  "Phaser Game Loads Test": function(client) {
    client
      .waitForPhaser(5000)
      .waitForGame(5000);
  }
};

module.exports = tests;
