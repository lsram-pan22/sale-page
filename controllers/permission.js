const express = require('express')
const Permission = require('../models/permission')

const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const { role, name, code, status } = req.body

        const newPermission = new Permission({
            role, role,
            name: name,
            code: code,
            status: status,
        })

        await newPermission.save()
        return res.status(201).json({ status: true, message: 'เพิ่มข้อมูลสำเร็จ' })
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
})

module.exports = router