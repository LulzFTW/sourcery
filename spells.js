// Spells in countering pairs
spells = [
    [ 'ZAP', 'ZEN' ],
    [ 'HOT', 'dOC' ],
    [ 'FOF', 'mUD' ],
    [ 'WAL', 'POp' ],
    [ 'LAW', 'mAG' ],
    [ 'dUM', 'JIG' ],
    [ 'BIG', 'YOB' ],
    [ 'WOK', 'RAZ' ],
    [ 'DOP', 'fAR' ],
    [ 'SUS', 'gAK' ],
    [ 'SIX', 'KIN' ],
    [ 'GOB', 'DUD' ],
    [ 'gUm', 'ZIp' ],
    [ 'HOW', 'fIX' ],
    [ 'DOZ', 'NIP' ],
    [ 'fAL', 'ROK' ],
    [ 'dIm', 'KID' ],
    [ 'FOG', 'SUN' ],
    [ 'NIF', 'HUF' ],
    [ 'TEL', 'YAZ' ],
    [ 'SAP', 'PEP' ],
    [ 'gOD', 'NAp' ],
    [ 'RAp', 'YAP' ],
    [ 'RES', 'ZEd' ],
    [ 'ZOB', 'SOB' ],
]

let spellMap = new Map();

spells.forEach(pair => {
    spellMap.set(pair[0].toUpperCase(), pair[1]);
    spellMap.set(pair[1].toUpperCase(), pair[0]);
});

module.exports = {
    counter: (spell) => spellMap.get(spell.toUpperCase())
};
