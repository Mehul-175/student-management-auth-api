import express from "express"
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"

import User from "../models/user.model.js"

import {
  signupValidation,
  loginValidation,
  refreshValidation
} from "../validations/auth.validation.js"

import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/token.js"

import { successResponse, errorResponse } from "../utils/response.js"

const router = express.Router()


router.post("/signup", async (req, res) => {
  try {
    const { error } = signupValidation.validate(req.body)
    if (error) return errorResponse(res, 400, error.details[0].message)

    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) return errorResponse(res, 400, "User already exists")

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

   const user = await User.create({
  name: req.body.name,
  email: req.body.email,
  password: hashedPassword
})

const userData = {
  _id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt
}

return successResponse(res, 201, "Signup successful", userData)

  } catch (err) {
    return errorResponse(res, 500, err.message)
  }
})



router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body)
    if (error) return errorResponse(res, 400, error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return errorResponse(res, 404, "User not found")

    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) return errorResponse(res, 401, "Invalid credentials")

    // Generate Tokens
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    // HASH refreshToken before storing
    const hashedRefresh = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex")

    user.refreshToken = hashedRefresh
    await user.save()

    return successResponse(res, 200, "Login successful", {
      accessToken,
      refreshToken
    })
  } catch (err) {
    return errorResponse(res, 500, err.message)
  }
})



router.post("/refresh", async (req, res) => {
  try {
    const { error } = refreshValidation.validate(req.body)
    if (error) return errorResponse(res, 400, error.details[0].message)

    const refreshToken = req.body.refreshToken

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    // Hash refresh token for comparison
    const hashedRefresh = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex")

    const user = await User.findOne({ refreshToken: hashedRefresh })
    if (!user) return errorResponse(res, 401, "Invalid refresh token")

    // New access token
    const newAccessToken = generateAccessToken(user._id)

    return successResponse(res, 200, "Access token regenerated", {
      accessToken: newAccessToken
    })
  } catch (err) {
    return errorResponse(res, 401, "Refresh token expired or invalid")
  }
})

export default router
