import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, message, Form, Input } from 'antd';
import { apiLogin } from '../../apis/apiLogin';
import { useAppDispatch } from '../../redux/hooks';
import { currentUserAction } from '../../redux/slices/user.slice';



function FormLogin(props: any) {

  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage();
  const loginSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Login Success',
    });
  };

  const loginError = () => {
    messageApi.open({
      type: 'error',
      content: 'Email or password is incorrect',
    });
  };

  const onFinish = async (values: any) => {
    try {

      const result = await apiLogin(values)
      console.log(result)
      loginSuccess()
      props.closeModal(false)
      localStorage.setItem('user', JSON.stringify(result))
      dispatch(currentUserAction.setCurrentUser(result))

    } catch {
      loginError()
    }
  };



  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        style={{ width: 400 }}
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
            <a type='button' onClick={() => { props.setSwitchLogin(true, 'block', 'none') }} className='block mb-2'>Don't have account? Create now!</a>
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