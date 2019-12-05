const request = require('request');
const chalk = require('chalk');
const Discord = require('discord.js');
const client = new Discord.Client();
const title = require('console-title');
const notifier = require('node-notifier');
const open = require('open');

// SETTINGS
client.config = require('./Settings/config.json');// Required for Token. (DO NOT REMOVE)
client.ascii = require('./Settings/ascii.json');// Console ASCII. (DO NOT REMOVE)
client.packages = require("./package.json"); // Required to get Bot's Current Version. (DO NOT REMOVE)
const Logger = require("./Monitors/console-monitor.js"); // Console Monitor. (DO NOT REMOVE)
let count = 0;

client.on("ready", () => {
    
    console.clear()
    require("./Updater/updater.js"); // Automated Update On Load   
    Object.values(client.ascii).forEach(line => console.log(line));
    console.log(`                  Nitro-Sniper v${client.packages.version} | Loaded & Ready To Snipe!\n`);
    console.log(`      Your Account Information\n====================================\nLogged In As: ${client.user.tag}\nGuilds: ${client.guilds.size}\nFriends: ${client.user.friends.size} | Blocked: ${client.user.blocked.size} \nEmail: ${client.user.email}\nUser ID: ${client.user.id}\nDiscord Nitro: ${client.user.premium?"Yes":"No"}\n====================================`);
    notifier.notify({
        title: 'Nitro Sniper',
        icon: 'nitro-png-2.png',
        message: `Loaded & Sniping...`,
        timeout: 1.0,
        wait: true
    }, function () {});
    title(`Nitro-Sniper | Logged In As: ${client.user.tag} | ${client.guilds.size} guilds | ${client.user.friends.size} friends`);
    if (client.config.discreet) {
      // if client.config.discreet = true then it wont show as your status
    } else {
        var presences = new Array()
        presences[0] = `for Nitro Codes`
        presences[1] = `Nitro-Sniper`
        setInterval(() => {
            var ry = Math.floor(Math.random() * presences.length)

            client.user.setActivity(`${presences[ry]}`, {

                type: `WATCHING`
            })
        }, 16000)
    }
        
});

client.on("message", message => {
    let code;
    if (message.channel.type != 'dm' && message.channel.type != 'group') {
        if (message.content.includes("discord.gift") || message.content.includes("discordapp.com/gifts/")) {
            Logger(`\nGuild: ${message.guild.name}\nGuild ID: ${message.guild.id}\nGuild Owner: ${message.guild.member(message.guild.owner.username) ? message.guild.owner.toString() : message.guild.owner.user.tag} \nChannel: ${"#" +message.channel.name}\nPosted By: ${message.author.username}\nLink: ${message.content}\n`, "gift");
            if (message.content.includes("discord.gift")) {
                code = message.content.split("discord.gift/").pop();
                code = code.split(' ')[0];
                var options = {
                    url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                    headers: {
                        'Authorization': client.config.token
                    }
                };
                function callback(error, response, body) {
                    var result = JSON.parse(body);
                    Logger(`${result.message}`, "info");
                    notifier.notify({
                        title: 'Nitro Sniper - SNIPED A CODE',
                        icon: 'nitro-png-2.png',
                        appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                        message: result.message,
                        timeout: 0.1,
                        wait: true
                      }, function () {
                          open(`discord://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
                      });
                }
                request.post(options, callback);
            }
            else if (message.content.includes("discordapp.com/gifts")){
                code = message.content.split("discordapp.com/gifts/").pop();
                code = code.split(' ')[0];
                var options = {
                    url: 'https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
                    headers: {
                        'Authorization': client.config.token
                    }
                };
                function callback(error, response, body) {
                    var result = JSON.parse(body);
                    Logger(`${result.message}`, "info");
                    notifier.notify({
                        title: 'Nitro Sniper - SNIPED A CODE',
                        icon: 'nitro-png-2.png',
                        appID: `${message.guild.name} | #${message.channel.name} | ${message.author.tag}`,
                        message: result.message,
                        timeout: 0.1,
                        wait: true
                      }, function () {
                        open(`discord://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
                    });
                }
                request.post(options, callback);
            }
            count += 1;
            if (count == 1) {
                title(`${client.user.tag} | ${client.guilds.size} guilds | ${client.user.friends.size} friends | ${count.toString()} gift`)
            }
            else if (count > 1) {
                title(`${client.user.tag} | ${client.guilds.size} guilds | ${client.user.friends.size} friends | ${count.toString()} gifts`)
            }
        }
    }
});
client.login(client.config.token);
