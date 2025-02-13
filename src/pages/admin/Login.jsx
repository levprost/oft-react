import Container from "react-bootstrap/Container"; 
import LoginForm from "../../components/Auth/LoginForm"; 
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";  
 
function Login() { 
  return ( 
    <> 
      <Menu /> 
      <Container fluid className="loginContainer"> 
        <LoginForm /> 
      </Container>
      <Footer /> 
    </> 
  ); 
} 
 
export default Login; 