import jwt from "jsonwebtoken"
import { errorResponse } from "../utils/response.js"

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return errorResponse(res, 401, "Authorization header missing")
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      return errorResponse(res, 401, "Access token missing")
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = decoded
    next()
  } catch (error) {
    return errorResponse(res, 401, "Invalid or expired token")
  }
}
