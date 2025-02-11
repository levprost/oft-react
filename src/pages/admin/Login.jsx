import Container from "react-bootstrap/Container"; 
import LoginForm from "../../components/Auth/LoginForm"; 
import Menu from "../../components/Menu"; 
 
function Login() { 
  return ( 
    <div> 
      <Menu /> 
      <Container fluid className="loginContainer"> 
        <LoginForm /> 
      </Container> 
    </div> 
  ); 
} 
 
export default Login; 