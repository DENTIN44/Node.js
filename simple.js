let count = 0;

exports.next = function () {
    count++;  // Increment count each time next is called
    return count;  // Return the updated count
};

exports.hello = function () {
    return "Hello, Universe";  // Return greeting message
};
