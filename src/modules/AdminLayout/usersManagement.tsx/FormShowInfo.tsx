import { useEffect, useState } from 'react';
import {
    Checkbox,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import dayjs from 'dayjs';



const { Option } = Select;


export const FormShowInfo = (props: any) => {

    const [form] = Form.useForm<FormData>();
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);


    useEffect(() => {
        form.setFieldsValue({
            ...props.dataPropsAdmin,
            birthday: dayjs(props.dataPropsAdmin.birthday, 'YYYY-MM-DD')
        })
    }, [props.dataPropsAdmin, form])

    // get values onChange
    const handleValuesChange = () => {
        const values = form.getFieldsValue()
        props.formEdit({ ...values, id: props.dataPropsAdmin.id })
    }

    return (
        <>
            <Checkbox
                className='my-3'
                checked={componentDisabled}
                onChange={(e) => setComponentDisabled(e.target.checked)}
            >
                Edit User
            </Checkbox>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{ width: 550 }}
                initialValues={{
                    ...props.dataPropsAdmin,
                    birthday: dayjs(props.dataPropsAdmin.birthday, 'YYYY-MM-DD')
                }}
                onValuesChange={handleValuesChange}
                form={form}
            >
                <Form.Item label="Name"
                    name='name'>
                    <Input />
                </Form.Item>

                <Form.Item label="Email"
                    name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Phone"
                    name="phone">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Skills"
                    name="skill"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Certification"
                    name="certification"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="role"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender">
                    <Select
                    >
                        <Option value={true}>Male</Option>
                        <Option value={false}>Female</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Birthday"
                    name='birthday'
                >
                    <DatePicker />
                </Form.Item>
            </Form>

        </>
    );
};
