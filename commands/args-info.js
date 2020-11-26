module.exports = {
  name: 'args-info',
  description: 'info about args',
  execute(msg, args) {
    if (!args.length) {
      return msg.channel.send('no arguments provided');
    } else if (args[0] === 'foo') {
      return msg.channel.send('bar');
    }

    msg.channel.send(`First arg: ${args[0]}`);
  },
};
