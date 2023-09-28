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

let guildId = null; //holds guildId 

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

// This will run when the bot is started and make sure that all commands are loaded
client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
  client.guilds.cache.forEach((guild) => {
    guildId = guild.id;
    main();
  });
});

// This will make sure that when the bot is added to new servers all commands are loaded 
client.on("guildCreate", (guild) => {
  console.log(`Bot has joined the guild: ${guild.name}`);
  guildId = guild.id;
  main();
  jsonStart(guild);
});

// -------------------------------------Example command----------------------------

/*
  When you want to add a new command you will add something like below.

  The setName("") is very strict and you can not format it like these:
    X setName("ping pong")
    X setName("PingPong")
  It has to be lower case and unbroken | setName("pingpong")
  This can leave the names looking and feeling wrong so its best to leave them to one word.
*/

const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pings and returns Pong")
pingCommand.toJSON();

// -------------------------------------Example command logic------------------------

/* 
  The commandName is the name set above and can be anything you want.
  You do not need multiple "Client.on" you can just continue to add if statements into this, however
  you should create your function and call it inside the if instead of filling it with logic 
*/

client.on("interactionCreate", (interaction) => {

  if (interaction.commandName === "ping") {
    console.log(interaction);
    interaction.reply("Pong");
  }

})

  // ---------------------------------------Start Up---------------------------------

  /* 
    You need to put all commands into the "commands" variable for them to be picked up and added to the server.
    This will be whatever you called the new slashcommandbuilder and changed to json. line 63

    The "try" will send the content of "commands" to the guilds and attempt to add them using the client id and guild id
    After this we use the token to login 
  */

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
