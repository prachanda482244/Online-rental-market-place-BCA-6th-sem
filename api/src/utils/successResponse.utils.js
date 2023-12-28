const successResponse = ({ result, status, res, message = "successful" }) => {
    let _result = result || null;
    let _status = status || 200
    res.status(_status).json({
        success: true,
        result: _result,
        message: message
    })
}
export default successResponse