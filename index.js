const SteamUser = require('steam-user');
const spells = require('./spells');

require('dotenv').config();

let client = new SteamUser();
client.logOn({
    accountName: process.env.username,
    password: process.env.password
});

client.on('loggedOn', () => {
    console.log(`Logged on as '${process.env.username}'`);
});

client.chat.on('friendMessage', msg => {
    let text = msg.message;
    let counter = text.split(/\n+/).map(onMessage)
        .filter(Boolean).join('\n');
    if (counter) {
        client.chat.sendFriendMessage(msg.steamid_friend, counter);
    }
});

let buf = [];
function onMessage(message) {
    let counter = null;

    if (message.length == 1) {
        if (message == "!") {
            counter = counterSpell(buf.join(''), true);
            buf = [];
        } else {
            buf.push(message.charAt(0));
        }
    } else {
        let match = message.match(/\w+!/g) || [];
        counter = match.map(m => counterSpell(m.slice(0, -1), false))
            .filter(Boolean).join(' ');
        buf = [];
    }

    return counter;
}

function counterSpell(spell, newline) {
    let counter = spells.counter(spell);
    if (counter) {
        let msg = counter + '!';
        if (newline)
            msg = msg.split('').join('\n');
        return msg;
    }
    return null;
}
