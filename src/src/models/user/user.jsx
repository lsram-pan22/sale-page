import React, { useState, useEffect } from "react";
import { Table, message, Typography, Popconfirm, Input, Form } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import axios from "axios";

function User() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/getAll`);
                if (response.status === 201) {
                    const users = response.data.data;

                    const filteredData = users.map((user) => ({
                        key: user._id, // แก้จาก id เป็น key
                        username: user.username,
                        fristname: user.fristname,
                        lastname: user.lastname,
                        role: user.role
                    }));

                    setData(filteredData);
                }
            } catch (err) {
                setLoading(false);
                messageApi.open({
                    type: 'error',
                    content: err.response?.data?.message || "Failed to fetch data",
                });
            }
        };

        fetchData();
    }, []);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({ ...record });  // เซ็ตค่าให้ Form เพื่อแสดงข้อมูล
        setEditingKey(record.key);
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                newData[index] = { ...newData[index], ...row };
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/update/${newData[index].key}`, {
                    username: newData[index].username,
                    fristname: newData[index].fristname,
                    lastname: newData[index].lastname,
                    role: newData[index].role
                });
                if (response.status == 201) {
                    setData(newData);
                    setEditingKey('');
                    messageApi.open({
                        type: 'success',
                        content: 'แก้ไขข้อมูลสำเร็จ',
                    });
                }
            }
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: err.response.data.message || "Validation failed",
            });
        }
    };

    const cancel = () => {
        setEditingKey('');
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            editable: true,
        },
        {
            title: 'Firstname',
            dataIndex: 'fristname',
            editable: true,
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            editable: true,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Popconfirm title="Your Sure Update?" onConfirm={() => save(record.key)} style={{ marginRight: 8 }}>
                            <a><SaveOutlined /> Save</a>
                        </Popconfirm>
                        <Popconfirm title="Cancel editing?" onConfirm={cancel}>
                            <a><CloseOutlined /> Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <EditOutlined /> Edit
                    </Typography.Link>
                );
            }
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            })
        };
    });

    const EditableCell = ({ editing, dataIndex, title, record, ...restProps }) => {
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[{ required: true, message: `Please enter ${title}` }]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    restProps.children
                )}
            </td>
        );
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <h2>User</h2>
            </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell
                        }
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    rowKey="key"
                />
            </Form>
            {contextHolder}
        </>
    );
}

export default User;
