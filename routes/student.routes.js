import express from "express"
import Student from "../models/student.model.js"
import { protect } from "../middlewares/auth.middleware.js"

import {
  createStudentValidation,
  updateStudentValidation
} from "../validations/student.validation.js"

import { successResponse, errorResponse } from "../utils/response.js"

const router = express.Router()

// 1. Create Student
router.post("/students", protect, async (req, res) => {
  try {
    const { error } = createStudentValidation.validate(req.body)

    if (error) {
      return errorResponse(res, 400, error.details[0].message)
    }

    const student = await Student.create(req.body)

    return successResponse(res, 201, "Student created successfully", student)
  } catch (error) {
    return errorResponse(res, 500, error.message)
  }
})


// 2. Get Students
router.get("/students", protect, async (req, res) => {
  try {
    const students = await Student.find()

    return successResponse(res, 200, "Students fetched successfully", students)
  } catch (error) {
    return errorResponse(res, 500, error.message)
  }
})


// 3. Get Student By ID
router.get("/students/:id", protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)

    if (!student) {
      return errorResponse(res, 404, "Student not found")
    }

    return successResponse(res, 200, "Student fetched successfully", student)
  } catch (error) {
    return errorResponse(res, 500, error.message)
  }
})


// 4. Update Student
router.put("/students/:id", protect, async (req, res) => {
  try {
    const { error } = updateStudentValidation.validate(req.body)

    if (error) {
      return errorResponse(res, 400, error.details[0].message)
    }

    if (Object.keys(req.body).length === 0) {
      return errorResponse(res, 400, "At least one field must be provided")
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedStudent) {
      return errorResponse(res, 404, "Student not found")
    }

    return successResponse(
      res,
      200,
      "Student updated successfully",
      updatedStudent
    )
  } catch (error) {
    return errorResponse(res, 500, error.message)
  }
})


// 5. Delete Student
router.delete("/students/:id", protect, async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id)

    if (!deletedStudent) {
      return errorResponse(res, 404, "Student not found")
    }

    return successResponse(res, 200, "Student deleted successfully")
  } catch (error) {
    return errorResponse(res, 500, error.message)
  }
})

export default router
