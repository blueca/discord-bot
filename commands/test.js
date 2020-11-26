module.exports = {
  name: 'test',
  description: 'tests',
  execute(msg, args) {
    msg.channel.send('test!');
  },
};
