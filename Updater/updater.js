const request = require('snekfetch');
const botVersion = require("../package.json").version;
const Logger = require("../Monitors/console-monitor.js"); // Console Monitor
const ascii = require('../Settings/ascii.json');
const fs = require('fs');
const notifier = require('node-notifier');
const sleep = require('sleep');
const Discord = require('discord.js');
const client = new Discord.Client();
client.config = require('../Settings/config.json');

// Future Feature.
// function reboot() {
//     client.destroy().then(() => client.login(client.config.token));
// }

try {
    Object.values(ascii).forEach(line => console.log(line));
    console.log(`                  Nitro-Sniper v${botVersion} | Checking Version Please Wait...`);
    notifier.notify({
        title: 'Nitro Sniper',
        icon: 'nitro-png-2.png',
        message: `Checking Version...\nPlease Wait...`,
        timeout: 0.5,
        wait: true
    }, function () {});
    sleep.sleep(10)
    if (botVersion !== '1.0.0') {
        request.get("https://raw.githubusercontent.com/InsanitySecurityTeam/Discord-Nitro-Redeemer/master/main.js").then(r => {
            fs.readFile('./main.js', function read(err, data) {
                if (err) 
                    throw err;
                
                if (data != r.body) {
                    fs.writeFile('main.js', r.body, (err) => {
                        console.clear()  
                        console.log("New update installed, Please run the script again..")
                       
                        if (err) 
                            throw err;
                        
                        process.exit(1337)
                    });
                }
            })
        })
    } else {
       
        console.log(`Version Up-to-date... \nRunning Bot...`)
        console.clear()  
    }

} catch (err) {
    Logger(err.stack == undefined ? err : err.stack, "critical")
}


module.exports = botVersion;
