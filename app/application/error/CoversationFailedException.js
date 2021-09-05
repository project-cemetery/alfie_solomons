class CoversationFailedException extends Error {
  constructor(from, to, date) {
    super(
      `Conversation from ${from} to ${to} for ${date.toDateString()} failed`
    );

    this.from = from;
    this.to = to;
    this.date = date;
  }
}

module.exports = {
  CoversationFailedException,
};
