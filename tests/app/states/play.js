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
  "Play State Loads Test": function(client) {
    client
      .waitForState("play", 5000)
      .assert.currentState("play");
  },

  /**
   * Tests that maxPointers === 1
   */
  "maxPointers Test": function(client) {
    client
      .assert.maxPointers(1);
  },

  "worldBounds Test": function(client) {
    client
      .assert.worldBounds(true);
  }
};

module.exports = tests;
