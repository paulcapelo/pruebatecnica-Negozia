import { Button, Alert, Form, Input, Layout } from "antd";
import { useUser } from "../hooks";
import { Navigate } from "react-router-dom";


const { Header, Footer, Sider, Content } = Layout;
const Login = () => {
  const { user, mutate } = useUser();

  const onFinish = (values) => {
    mutate(values);
  };

  if (user?._id) {
    return <Navigate to="/user" replace />;
  }

  const onFinishFailed = (errorInfo) => {
    
  };

  return (
    <Layout>
      {user?.err && <Alert message={user?.err} type="error" />}
      <Content className="centerCtn">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
