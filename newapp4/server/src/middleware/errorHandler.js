const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose errors
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Resource not found' });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value' });
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  res.status(500).json({ message: 'Server Error' });
};

module.exports = errorHandler;