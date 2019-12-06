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
export function spliceData(payload, number) {
  let handler = payload;
  return handler.splice(number);
}

/**
 *  The function generates a random number for an image
 *
 * @param {Number} payload  length of the array
 */

export function getRandomNumber(payload) {
  const number = Math.floor(Math.random() * payload);
  return number;
}

/**
 *  The function gets a string  and capitalizes it
 *
 * @param {String} payload  word to capitalize
 */

export function capitalizeItem(payload) {
  const capitalizedWord = payload.charAt(0).toUpperCase() + payload.slice(1);
  return capitalizedWord;
}

/**
 *  The function gets an object extracts ids from respective urls and passes it in an object
 *
 * @param {Object} payload object to reconstruct
 */
const numberRegex = /\d+/g;

export function reconstructObject(people) {
  return people.map(person => {
    const [id] = person.url.match(numberRegex);
    return { ...person, id };
  });
}
