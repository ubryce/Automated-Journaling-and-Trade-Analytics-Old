import React, { useState } from 'react';
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { FormControl, FormLabel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';

const Login = () => {
    
    const [ show, setShow ] = useState(false);
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const toast = useToast();

    const submitHandler = async () => {
        if (!email || !password) {
            toast({
              title: "Please fill all fields",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
        }
        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/trades');
        } catch (error) {
            toast({
              title: "Error Occured!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
    };

    return (
        <VStack spacing="5px">
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : 'password'} placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button colorScheme="blue" width="100%" style={{ marginTop:15 }} onClick={submitHandler}>
                Login
            </Button>
            <Button variant="solid" colorScheme="yellow" width="100%" style={{ marginTop:15 }} onClick={() => {
                setEmail("guest@example.com");
                setPassword("123456");
            }}>
                Guest
            </Button>
        </VStack>
    )
}

export default Login