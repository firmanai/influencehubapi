const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            message: message,
            datas: data,
        }
    });
}

module.exports = response;
