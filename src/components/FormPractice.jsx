import { Button, Col, Form, Input, Select, Typography } from "antd";
import Password from "antd/es/input/Password";
import React from "react";

function FormPractice() {
    const [form] = Form.useForm();

    const onGenderChange = (value) => {
        console.log(value);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            first_name: "Abhishek",
            last_name: "Acharya",
            gender: "male",
            password: "forgot pw",
            confirm_password: "forgot pw",
            email: "abhishek@gmail.com",
        });
    };

    return (
        <Col className="form-container" span={24} sm={{span: 14}}>
            <Form
                // wrapperCol={{ span: 20 }}
                wrapperCol={{flex: 1}}
                name="practise_form"
                className="my-form"
                form={form}
                autoComplete="off"
            >
                <Form.Item
                    label="Enter your first name"
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your first name!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Enter your last name"
                    name="last_name"
                    rules={[
                        { required: true, message: "Please enter your last name!" },
                        { min: 3, message: "Minimum chars required is 3." },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Enter your email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter email address" },
                        { type: "email", message: "Please enter a valid email address" },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Select your gender" name="gender">
                    <Select allowClear placeholder="Select an option" onChange={onGenderChange}>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="others">Others</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Enter your Password" name="password" hasFeedback>
                    <Password></Password>
                </Form.Item>

                <Form.Item label="Confirm Password" name="confirm_password" hasFeedback>
                    <Password></Password>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" className="button">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset} className="button">
                        Reset
                    </Button>
                    <Button htmlType="button" type="link" onClick={onFill} className="button">
                        Fill Form
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    );
}
export default FormPractice;
