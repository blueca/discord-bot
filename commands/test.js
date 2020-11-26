module.exports = {
  name: 'test',
  description: 'tests',
  cooldown: 5,
  execute(msg, args) {
    msg.channel.send('test!');
  },
};
