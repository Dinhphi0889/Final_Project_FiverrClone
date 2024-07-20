import { Button, DatePicker, Form, Input, Select, message, } from 'antd';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

export default function FromAddNew(props: any) {
    const [form] = Form.useForm<FormData>();
    const handleValuesChange = () => {
        const values = form.getFieldsValue()
        props.submitFormAddNew(values)
    }
    const onFinish = (values: any) => {
    }

    return (
        <>
            <Form
                className='form-add-new-admin'
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                name="register"
                onChange={handleValuesChange}
                style={{ width: "100%" }}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Your Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Your Name!',
                        },
                    ]}
                >
                    <Input value={'a'} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 6,
                            message: 'Password must be at least 6-16 characters'
                        },
                        {
                            max: 16,
                            message: 'Password must be at least 6-16 characters'
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!'
                        }
                    ]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item

                    label="Birthday"
                    name='birthday'
                  
                >
                    <div>
                        <DatePicker className='select-birthday' />
                    </div>
                </Form.Item>
                <div className='block md:flex justify-around w-full'>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{ required: true, message: 'Please select gender!' }]}
                    >
                        <Select placeholder="select your gender">
                            <Option value={true}>Male</Option>
                            <Option value={false}>Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Type"
                        rules={[{ required: true, message: 'Please select gender!' }]}
                    >
                        <Select
                            onChange={handleValuesChange}
                            placeholder="select your gender">
                            <Option value="ADMIN">ADMIN</Option>
                            <Option value="USER">USER</Option>
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};

