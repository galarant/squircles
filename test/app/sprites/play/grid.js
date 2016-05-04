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
   * Tests that Phaser.game.grid exists
   */
  "Phaser.game.grid Exists Test": function(client) {
    client
      .waitForGridExists(5000)
      .end();
  }

};

module.exports = tests;
