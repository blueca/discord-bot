module.exports = {
  name: 'user-info',
  description: 'info about user',
  execute(msg, args) {
    msg.channel.send(`Username: ${msg.author.username}\nID: ${msg.author.id}`);
  },
};
