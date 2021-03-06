
class NetRepo {
  constructor() {
    this.clear();
  }

  get array() {
    return [...this.nets];
  }

  clear() {
    this.nets = new Set();
    this.add('');
    this.add('GND');
    this.add('VCC');
  }

  format(net) {
    return `(net ${this.indexOf(net)} "${net}")`;
  }

  get(name) {
    const net = this.array[this.indexOf(name)];
    if (!net) {
      throw `Net with name ${name} not found`
    }
    return this.format(net);
  }

  indexOf(net) {
    return this.array.indexOf(net);
  }

  add(net) {
    this.nets.add(net);
    return this.format(net);
  }
}

// create a unique, global symbol name
// -----------------------------------

const NET_REPO = Symbol.for("MrKeebs.KbPCB.NetRepo");

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------

var globalSymbols = Object.getOwnPropertySymbols(global);
var exists = (globalSymbols.indexOf(NET_REPO) > -1);

if (!exists) {
  global.NET_REPO = new NetRepo();
}

// define the singleton API
// ------------------------

var singleton = {};

Object.defineProperty(singleton, "instance", {
  get: function() {
    return global.NET_REPO;
  }
});

// ensure the API is never changed
// -------------------------------

Object.freeze(singleton);

// export the singleton API only
// -----------------------------

module.exports = singleton;
