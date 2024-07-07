class ApiResponse {
    constructor(statusCode,data,message="success",errors=[],statck="") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}
