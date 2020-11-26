module.exports = {
  name: 'kick',
  description: 'kicks user (but not really)',
  execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.reply('no user tagged');
    }
    const taggedUser = msg.mentions.users.first();

    msg.channel.send(`Kick: ${taggedUser.username}`);
  },
};
