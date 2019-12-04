/**
 * Helpers.
 *
 * Small helper functions that can be used to perform small but repetitive tasks.
 *
 * @since  0.0.1
 */

/**
 * This function splices api response
 *
 * @param {String} payload   The data to splice
 */
export function spliceData(payload) {
  let handler = payload;
  return handler.splice(6);
}

/**
 *  The function generates a random number for an imag
 *
 * @param {Number} payload  length of the array
 */

export function getRandomNumber(payload) {
  const number = Math.floor(Math.random() * payload);
  return number;
}
