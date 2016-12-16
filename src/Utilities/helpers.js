const nouns = ['world', 'grass', 'dog', 'donkey', 'butts', 'head', 'foot', 'groin', 'wheat', 'hotdog', 'weiner'];
const verbs = ['eat', 'shoot', 'kick', 'punch', 'float', 'pound', 'hump', 'grind', 'jump', 'chug', 'slam', 'devour'];
const modifiers = ['very', 'super', 'awesome', 'terrible', 'bad', 'fine', 'top', 'girthy', 'bulbous', 'veiny', 'throbbing'];

function rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const nameify = function() {
    return `${rando(verbs)}-${rando(modifiers)}-${rando(nouns)}`;
};

export const formatPrice = function(cents) {
    return '$' + ( (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
};