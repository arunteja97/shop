import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";
import { gql } from "graphql-tag";
import { useDispatch } from "react-redux";
import { login } from "../store/auth.reducer";

const REGISTER_USER = gql`
  mutation Mutation($loginInput: LoginInput!) {
    loginUser(input: $loginInput) {
      email
      name
      token
    }
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [loginUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      dispatch(login(userData));
      console.log(userData);
      navigate("/");
      navigate(0);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      loginInput: formData,
    },
  });
  const onSubmitHandler = (e) => {
    loginUser();
  };
  return (
    <Container spacing={2} maxWidth="sm">
      <h2>Login</h2>
      <Stack spacing={3} paddingBottom={2} marginX={8}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          type="password"
          onChange={onChangeHandler}
        />
        <Button variant="outlined" onClick={onSubmitHandler}>
          Login
        </Button>
      </Stack>
      {errors.map((error) => {
        return (
          <Alert severity="error" key={error.code}>
            {error.message}
          </Alert>
        );
      })}
    </Container>
  );
};
export default Login;
