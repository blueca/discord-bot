module.exports = {
  name: 'prune',
  description: 'prunes specified number of comments',
  execute(msg, args) {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return msg.reply('not a valid number');
    } else if (amount <= 1 || amount > 100) {
      return msg.reply('number needs to be between 1 and 100');
    }

    msg.channel
      .bulkDelete(amount, true)
      .then((msgs) => console.log(`deleted ${msgs.size} messages`))
      .catch(console.log);
  },
};
