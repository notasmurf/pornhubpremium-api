/**
 *
 * @param object
 * @param array
 * @returns {*}
 */
const findMatchingKeys = (object = {}, array = []) => {
  const keys = Object.keys(object);

  return array.find((val) => keys.every((key) => val[key] === object[key]));
};

module.exports = {
  findMatchingKeys,
};
