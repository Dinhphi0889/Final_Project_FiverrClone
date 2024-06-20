import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';


function FormLogin() {

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        style={{width:400}}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Email invalidate'
            },
            {
              required: true,
              message: 'Please input your Email!'
            }
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button block w-full mb-4">
            Log in
          </Button>
          <div>
            <a className='block mb-2' href="">Don't have account? Create now!</a>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormLogin;