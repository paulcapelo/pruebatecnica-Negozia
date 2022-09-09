import { useState, useEffect } from "react";
import { Space, Table, Button, notification } from "antd";
import { EditFilled, DeleteFilled, UserAddOutlined } from "@ant-design/icons";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../services/user";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/useContext";
import { url } from '../services'

const DashBoard = () => {
  const { user: usuario } = useAuth();
  let navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { data } = useSWR(`${url}/users`, fetcher);
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    if (!data) return;
    setdataSource(data.map((item) => ({ key: item._id, ...item })));
  }, [data]);

  const eliminar = async (_id) => {
    
    const editarFetcher = await fetch(`${url}/user`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    }).then((res) => res.json());

    if (editarFetcher?.resp) {
      notification.open({
        message: "Registro Eliminado",
        description: "",
      });
      window.location.reload();
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Password", dataIndex: "password", key: "password" },
    { title: "Rol", dataIndex: "rol", key: "rol" },
    // { title: "ID", dataIndex: "_id", key: "_id" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<EditFilled />}
            onClick={() =>
              navigate(`../editar/${record._id}`, { state: { user: record } })
            }
          />
          <Button
            shape="circle"
            icon={<DeleteFilled />}
            onClick={() => eliminar(record._id)}
          />
        </Space>
      ),
    },
  ];
  return (
    <div className="centerCtn">
      {usuario?.rol === "V" && <Navigate to="/user" replace />}
      <div>
        <p>DashBoard</p>
        <div className="">
          <Button
            icon={<UserAddOutlined />}
            onClick={() => navigate(`../ingresar`)}
          >
            Agregar Usuario
          </Button>
          <Table dataSource={dataSource} columns={columns} />;
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
