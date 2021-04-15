function Dictionary() {
    this.items = {}
}

Dictionary.prototype = {
    constructor: Dictionary,
    set: function (key, value) {
        Reflect.set(this.items, key, value)
    },
    get: function (key) {
        return Reflect.get(this.items, key)
    },
    remove: function (key) {
        return Reflect.deleteProperty(this.items, key)
    },
    get keys() {
        return Reflect.ownKeys(this.items)
    },
    get values() {
        const keys = Reflect.ownKeys(this.items)
        return keys.reduce((p, c) => {
            p.push(this.items[c])
            return p
        }, [])
    }
}

const dictionary = new Dictionary()

dictionary.set('xixi', 'xixixixi')
dictionary.set('haha', 'hahaha')
console.log(dictionary.get('xixi'));
console.log(dictionary.keys);
console.log(dictionary.values);
console.log(dictionary.remove('xixi'));
