import express from "express";
import { check } from "express-validator";
import { register } from "../controllers/authController.js";

const router = express.Router();

router.post(
    "/register",
    [
        check("username", "Username is requaired").not().isEmpty(),
        check("email", "Email is requaired").not().isEmpty(),
        check("email", "Enter a valid email").isEmail(),
        check("password", "Minimum password length is 3 characters").isLength({ min: 3 }),
        check("password", "Maximum password length is 32 characters").isLength({ max: 32 }),
    ],
    register
);

export default router;
