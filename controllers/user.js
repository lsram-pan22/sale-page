const express = require('express')
const bcrypy = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const { username, password, fristname, lastname, role } = req.body
        const hashedPassword = await bcrypy.hash(password, 10)

        const newUser = new User({
            username: username,
            password: hashedPassword,
            fristname: fristname,
            lastname: lastname,
            role: role
        })

        await newUser.save()
        return res.status(201).json({ stats: true, message: 'เพิ่มข้อมูลผู้ใช้งานสำเร็จ' })
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(403).json({ status: false, message: 'ดึงข้อมูลไม่สำเร็จ' })
        } else {
            return res.status(201).json({ status: true, message: 'ดึงข้อมูลสำเร็จ', data: user })
        }
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
})

router.get('/getById/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) {
            return res.status(403).json({ status: false, message: 'ดึงข้อมูลไม่สำเร็จ' })
        } else {
            return res.status(201).json({ status: true, message: 'ดึงข้อมูลสำเร็จ', data: user })
        }
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updateUser) {
            return res.status(403).json({ status: false, message: 'แก้ไขข้อมูลไม่สำเร็จ' })
        } else {
            return res.status(201).json({ status: true, message: 'แก้ไขข้อมูลสำเร็จ', data: updateUser })
        }
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
})

module.exports = router