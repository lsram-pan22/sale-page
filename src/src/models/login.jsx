import { useState, useEffect } from "react"
import { Form, Input, Button, Card, Typography, message, Space } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import '../css/login.css'

const { Title } = Typography;

function Login() {
    const [loading, setLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const userData = {
                username: values.username,
                password: values.password
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, userData)
            if (response.status == 201) {
                setLoading(false)
                localStorage.setItem('token', response.data.token)
                messageApi.open({
                    type: 'success',
                    content: 'เข้าสู่ระบบสำเร็จ',
                })
                navigate('/home')
            }
        } catch (err) {
            setLoading(false)
            messageApi.open({
                type: 'error',
                content: err.response.data.message,
            })
        }
    };

    return (
        <div className="container">
            <Card className="">
                <Title level={2}>ระบบจัดการ Sale Page</Title>
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item name="username" rules={[{ required: true, message: "Please enter your username!" }]}>
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <div className="button">
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Login
                            </Button>
                        </div>
                    </Form.Item>
                    {contextHolder}
                </Form>
            </Card>
        </div>
    );
}

export default Login