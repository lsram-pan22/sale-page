const express = require('express')
const bcrypy = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {
            console.log('ไม่พบข้อมูลผู้ใช้งาน')
        }

        const isMatch = await bcrypy.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" })
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            return res.status(201).json({ token: token, user: { fristname: user.fristname, lastname: user.lastname, permission: user.permission } })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router