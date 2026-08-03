function shipFactory(length) {
  const ship = {
    length: length,
    hits: 0,
    hit: function () {
      this.hits++;
    },
    isSunk: function () {
      return this.hits >= this.length;
    },
  };
  return ship;
}

export default shipFactory;
