exports.assertion = function(expected) {
  /**
   * A value to perform the assertion on. If a function is
   * defined, its result will be used.
   */
  this.expected = expected;

  /**
   * The message which will be used in the test output and
   * inside the XML reports
   */
  this.message = "Asserting game.maxPointers === " + this.expected;

  /**
   * Performs a protocol command/action and its result is
   * passed to the value method via the callback argument.
   *
   * Anything inside this.api.execute will run directly on the browser.
   */
  this.command = function(callback) {

    return this.api.execute(function() {
      let game = window.Phaser.GAMES[0];
      return game.input.maxPointers;
    }, [this.expected], callback);
  };

  /**
   * The method which returns the value to be used on the
   * assertion. It is called with the result of the command"s
   * callback as argument.
   */
  this.value = function(commandResult) {
    return commandResult.value;
  };

  /**
   * The method which performs the actual assertion. It is
   * called with the result of the value method as the argument.
   */
  this.pass = function(valueResult) {
    return valueResult === this.expected;
  };

};
