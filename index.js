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
    let text = msg.message.normalize('NFD');
    let counter = text.split(/\n+/).map(onMessage)
        .filter(Boolean).join('\n');
    if (counter) {
        client.chat.sendFriendMessage(msg.steamid_friend, counter);
    }
});

let spellBuf = [];
let letter = /[A-Za-z]/;

function onMessage(message) {
    let counter = [];

    for (const c of [...message, '\n']) {
        if (letter.test(c)) {
            if (spellBuf.length == 3)
                spellBuf.shift();
            spellBuf.push([c]);
        } else if (spellBuf.length) {
            spellBuf[spellBuf.length-1].push(c);
        }
        if (c == '!') {
            if (counterSpell(spellBuf)) {
                let r = spellBuf.map(e => e.join('')).join('');
                counter.push(r);
            }
            spellBuf = [];
        }
    }

    return counter.join(' ');
}

function counterSpell(buf) {
    let spell = buf.map(e => e[0]).join('');
    let counter = spells.counter(spell);
    if (counter) {
        for (let i = 0; i < buf.length; i++)
            buf[i][0] = counter[i];
        return true;
    }
    return false;
}
