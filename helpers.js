function generateError(message, code) {
    const error = new Error(message);
    error.httpStatus = code;
    throw error;
}

module.experts = {
    generateError,
};
