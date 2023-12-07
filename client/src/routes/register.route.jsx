import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";
import {gql} from 'graphql-tag';
import { useDispatch } from "react-redux";
import { login } from "../store/auth.reducer";

const REGISTER_USER = gql`
    mutation Mutation($registerInput: RegisterInput!){
        registerUser(input: $registerInput){
            email
            name
            token
        }
    }
`

const Register = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
    })

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    

    const [registerUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, {data : {registerUser: userData}}){
            dispatch(login(userData))
            navigate('/')
            navigate(0)
        },
        onError({graphQLErrors}){
            setErrors(graphQLErrors)
        },
        variables: {
            registerInput: formData
        }
    })
    
    const onSubmitHandler = (e) => {
        
        registerUser();
    }

    return (
        <Container spacing={2} maxWidth="sm">
            <h2>Register</h2>
            <Stack spacing={3} paddingBottom={2} marginX={8}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={onChangeHandler}
                 />
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
                 <Button variant="outlined" onClick={onSubmitHandler}>Register</Button>
            </Stack>
            
            {errors.map(error => {
                return (
                    <Alert severity="error" key={error.code}>
                        {error.message}
                    </Alert>
                )
            })}
        </Container>
    );
}
export default Register;