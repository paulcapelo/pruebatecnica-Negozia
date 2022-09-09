import { Card } from "antd";
import { useAuth } from "../context/useContext";
const User = () => {
  const { user } = useAuth();

  return (
    <div className="centerCtn">
      <Card title={"User Info:"} style={{ width: 300 }}>
        <div bordered='true' layout="horizontal">
          <p>
            <strong>{"Nombre: "}</strong>
            {user?.name}
          </p>
          <p>
            {" "}
            <strong>Email: </strong>
            {user?.email}
          </p>
          <p>
            {" "}
            <strong>Rol: </strong>
            {user?.rol}
          </p>
          <p>
            <strong>Passwoord:</strong>
            {user?.password}
          </p>
          <p>
            {" "}
            <strong>id:</strong>
            {user?._id}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default User;
