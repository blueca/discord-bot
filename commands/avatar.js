module.exports = {
  name: 'avatar',
  description: 'links user avatar',
  execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.channel.send(
        `Your avatar: <${msg.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
        })}>`
      );
    }

    const avatarList = msg.mentions.users.map((user) => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({
        format: 'png',
        dynamic: true,
      })}>`;
    });

    msg.channel.send(avatarList);
  },
};
