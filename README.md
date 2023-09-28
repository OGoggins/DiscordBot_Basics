
# DiscordBot_Basics

A guide to discord bot basics


## How to get started:

First you will want to get your config.json file sorted:
- Go to [discord developer portal](https://discord.com/developers/applications) and find your way to the application section.
- select New application and give it a name
- you will then be presented with with a general info screen. We need to go to OAth2 and copy "CLIENT ID"
- Past that into config.json 
- Back on the dev portal go to the bot tab on the left. Locate the reset tocken button below the username.
- Past the token into config.json

Second we need to invite the bot to a test server:
 
- Now you need to go back to OAth2 and click "URL Generator" 
- We want to select bot located in the middle of the scope section
- Then a bot permissions section will show. Press admin and copy the URL generated at the bottom 
- Past this into any browser and select the server you want to add it too
    




## Dependency Installation & Running

Install node modules

```bash
  npm i
```
Running 
```bash
    node main.js
```


## Examples

```bash
    client.on("messageCreate", (message) => {
    })
```
```bash
    client.on("messageUpdate", (message) => {
    })
```

#### To stop a bot from triggering logic
```bash
    if (message.author.bot) return;
```
Needed when using messageCreate

#### Basic embeds
```bash 
    interaction.reply({
    content: "",
    tts: false,
    embeds: [
      {
        type: "rich",
        title: `Example `,
        description: message,
        color: 0xff0000,
      },
    ],
  ephemeral: true
});
```
The  ```ephemeral: true``` means that only the person enacting the command can see the resulting reply the bot sends
