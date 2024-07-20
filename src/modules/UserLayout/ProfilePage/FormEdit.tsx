import {
    DatePicker,
    Dropdown,
    Form,
    Input,
    Select,
} from 'antd';
import dayjs from 'dayjs';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 4 },
        sm: { span: 14 },
    },
};
const { Option } = Select;


export default function FormEdit(props: any) {

    const [form] = Form.useForm<FormData>();

    const handleValuesChange = () => {
        const values = form.getFieldsValue()
        props.onFormEdit(values)
    }
    

    return (
        <Form
        className='form-edit-profile'
            form={form}
            {...formItemLayout}
            initialValues={{
                ...props.dataProps,
                birthday: dayjs(props.dataProps.birthday,'DD-MM-YYYY')
            }}
            onValuesChange={handleValuesChange}
            variant="filled"
            style={{ maxWidth: 600 }}>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Please input!' }
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { type: 'email', message: 'The input is not valid E-mail! ' },
                    { required: true, message: 'Please input!' }
                ]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                    { required: true, message: 'Please input!' }
                ]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Skills"
                name="skill"
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Certification"
                name="certification"
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select gender!' }]}
            >
                <Select placeholder="select your gender">
                    <Option value={true}>Male</Option>
                    <Option value={false}>Female</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Birthday"
                name="birthday"
                rules={[{ required: true, message: 'Please input!' }]}
            >
                <DatePicker />
            </Form.Item>
        </Form>
    );
}
