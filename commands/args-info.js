module.exports = {
  name: 'args-info',
  description: 'info about args',
  args: true,
  execute(msg, args) {
    if (args[0] === 'foo') {
      return msg.channel.send('bar');
    }

    msg.channel.send(`arguments: ${args}\nArguments length: ${args.length}`);
  },
};
