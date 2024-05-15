module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)) // Execute theFunc and wrap it in a Promise
    .catch(next); // Catch any errors and pass them to Express's error handling middleware
};
