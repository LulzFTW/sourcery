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
let fmtBuf = [];
let letter = /[A-Za-z]/;
let letter_g = new RegExp(letter.source, 'g');

function onMessage(message) {
    let counter = [];

    for (const c of [...message, '\n']) {
        if (letter.test(c)) {
            if (spellBuf.length == 3) {
                spellBuf.shift();
                do fmtBuf.shift();
                while (!letter.test(fmtBuf[0]));
            }
            spellBuf.push(c);
        }
        if (spellBuf.length) {
            fmtBuf.push(c);
        }
        if (c == '!') {
            let spell = spellBuf.join('');
            let fmt = fmtBuf.join('');
            let res = counterSpell(spell, fmt);
            if (res) counter.push(res);
            spellBuf = [];
            fmtBuf = [];
        }
    }

    return counter.join(' ');
}

function counterSpell(spell, fmt) {
    let counter = spells.counter(spell);
    if (counter) {
        let i = 0;
        fmt = fmt.replace(letter_g, () => counter[i++]);
        return fmt;
    }
    return null;
}
