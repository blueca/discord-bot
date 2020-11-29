require('dotenv').config();
const axios = require('axios');

module.exports = {
  name: 'youtube',
  aliases: ['yt'],
  cooldown: 5,
  description: 'sends first search result from youtube',
  async execute(msg, args) {
    const apiKey = process.env.YOUTUBEAPI;
    const q = args.join(' ');
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=10&q=${q}`;

    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        msg.channel.send(
          `https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`
        );
      } else {
        msg.reply('youtube error');
      }
    } catch (err) {
      console.error(err);
      msg.reply('error finding video');
    }
  },
};
