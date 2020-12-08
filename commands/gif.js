require('dotenv').config();
const axios = require('axios');

module.exports = {
  name: 'gif',
  cooldown: 5,
  async execute(msg, args) {
    const apiKey = process.env.TENORAPI;
    const query = args.join(' ');
    const url = `https://api.tenor.com/v1/search?q=${query}&key=${apiKey}`;

    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        const { results } = res.data;
        const random = Math.floor(results.length * Math.random());
        msg.channel.send(results[random].url);
      } else {
        this.handleError(res.status, msg);
      }
    } catch (err) {
      console.error(err);
      msg.reply('error finding gif');
    }
  },
  handleError(err, msg) {
    const errors = {
      429: 'Rate limit exceeded, please try again in 30 seconds',
      404: 'gif not found',
      redirect: 'Redirect error',
      server: 'Unexpected server error',
    };

    if (err in errors) {
      msg.reply(errors[err]);
    } else if (err >= 300 && err < 400) {
      msg.reply(errors.redirect);
    } else {
      msg.reply(errors.server);
    }
  },
};
