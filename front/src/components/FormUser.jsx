import useSWR from "swr";
import { Card, Form, Input, Select, Button, notification } from "antd";
import { fetcher } from "../services";
import { url } from '../services'

const FormUser = ({ user, ready }) => {
  const { data } = useSWR(`${url}/roles`, fetcher);

  const onFinish = async (values) => {
    if (user?._id) {
      values = { ...values, _id: user?._id };
    }
    
    const editarFetcher = await fetch(`${url}/user`, {
      method: user?._id ? "PATCH" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values }),
    }).then((res) => res.json());
    
    if (editarFetcher?.resp) {
      notification.open({
        message: "Datos Guardados",
        description: "",
      });
      ready();
    }
  };

  const onFinishFailed = (errorInfo) => {
    
  };

  

  return (
    <div>
      <Card
        title={user?._id ? "Editar usuario" : "Crear usuario"}
        style={{ width: 500 }}
      >
        <div bordered="true" layout="horizontal">
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
              label="Nombre"
              name="name"
              initialValue={user?.name}
              rules={[{ required: true, message: "Ingrese su nombre!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              initialValue={user?.email}
              rules={[{ required: true, message: "Ingrese su email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              initialValue={user?.password}
              rules={[{ required: true, message: "Ingrese su contrasena!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Rol"
              name="rol"
              initialValue={user?.rol}
              rules={[{ required: true, message: "Seleccione un rol!" }]}
            >
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                // onChange={onChange}
                // onSearch={onSearch}
                // filterOption={(input, option) =>
                //     (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                // }
              >
                {data?.map((item) => (
                  <Select.Option key={`${item._id}`} value={item?.cod}>
                    {item?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default FormUser;
