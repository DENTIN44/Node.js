// A counter variable to keep track of the count
let count = 0;

/**
 * Increment the count by 1 and return the updated count.
 * 
 * @returns {number} The updated count after increment.
 */
export function next() {
    return ++count;
}

/**
 * A helper function that calculates the square of the current count.
 * This function is not exported by default but can be used internally.
 * 
 * @returns {number} The square of the current count.
 */
function squared() {
    return Math.pow(count, 2);
}

/**
 * A function that returns a greeting message.
 * This function is exported as a named export.
 * 
 * @returns {string} A greeting message.
 */
export function hello() {
    return "Hello, Universe!";
}

/**
 * The default export is a function that returns the current count.
 * This function is used when the module is imported without a specific named import.
 * 
 * @returns {number} The current count value.
 */
export default function() {
    return count;
}

/**
 * A constant that holds the value of 42, which is famously known as the "answer to the ultimate question."
 * This is a named export.
 * 
 * @constant
 * @type {number}
 */
export const meaning = 42;

/**
 * A variable initialized with -1. This could be used to represent an absence or an error in some context.
 * This is a named export.
 * 
 * @type {number}
 */
export let nocount = -1;

/**
 * Exporting the squared function, so it can be used by other modules that import it.
 * This allows us to separate the export of `squared` without including it in the main export block.
 */
export {
    squared
};
