import React, { useState } from 'react'
import { ProductOutlined, HomeOutlined, UserOutlined, LogoutOutlined, FileTextOutlined } from '@ant-design/icons'
import { Menu, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'

const { SubMenu } = Menu;

function Mymenu() {
    const [open, setOpen] = useState(false)
    const [modalText, setModalText] = useState('คุณต้องการออกจากระบบใช่หรือไม่!')
    const navigate = useNavigate()

    const handleMenuClick = (e) => {
        navigate(`/${e.key}`); // Navigate dynamically based on the clicked key
    };

    const handleCheckOut = (e) => {
        setOpen(true);
    }

    const handleConfirmCheckout = (e) => {
        localStorage.removeItem("token"); // ลบ Token ออกจาก LocalStorage
        navigate("/"); // Redirect ไปหน้า Login
    }

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <div>
            <Menu mode="inline" defaultSelectedKeys={['home']} style={{ height: "100%", borderRight: 0 }}>
                <Menu.Item key="home" onClick={handleMenuClick} icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="product" onClick={handleMenuClick} icon={<ProductOutlined />}>
                    product
                </Menu.Item>
                <Menu.Item key="report" onClick={handleMenuClick} icon={<FileTextOutlined />}>
                    report
                </Menu.Item>
                <SubMenu key="user" icon={<UserOutlined />} title="User">
                    <Menu.Item key="user" onClick={handleMenuClick}>User</Menu.Item>
                    <Menu.Item key="permission">Permission</Menu.Item>
                </SubMenu>
                <Menu.Item key="logout" onClick={handleCheckOut} icon={<LogoutOutlined />}>
                    Logout
                </Menu.Item>
            </Menu>

            <Modal
                title={'ออกจากระบบ'}
                open={open}
                onOk={handleConfirmCheckout}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    )
}

export default Mymenu