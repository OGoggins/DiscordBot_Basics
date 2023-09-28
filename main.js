const {
  Client,
  Events,
  GatewayIntentBits,
  SlashCommandBuilder,
  messageLink,
  Routes,
  REST,
  EmbedBuilder,
  ChannelType,
  MessageEmbed,
} = require("discord.js");

const config = require("./config.json");

let guildId = null;

const rest = new REST({
  version: "10",
}).setToken(config.token);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
  client.guilds.cache.forEach((guild) => {
    guildId = guild.id;
    main();
  });
});

client.on("guildCreate", (guild) => {
  console.log(`Bot has joined the guild: ${guild.name}`);
  guildId = guild.id;
  main();
  jsonStart(guild);
});

  // -------------------------------------Example command----------------------------

const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pings and returns Pong")
pingCommand.toJSON();

// -------------------------------------Example command logic------------------------

client.on("interactionCreate", (interaction) => {

  if (interaction.commandName === "ping") {
    console.log(interaction);
    interaction.reply("Pong");
  }

})

  // ---------------------------------------Start Up---------------------------------
async function main() {
  const commands = [
    pingCommand,
  ];

  try {
    console.log("started refrech applicaation (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(config.clientId, guildId),
      {
        body: commands,
      }
    );
    console.log("Online");
  } catch (err) {
    console.log(err);
  }
}
client.login(config.token);
