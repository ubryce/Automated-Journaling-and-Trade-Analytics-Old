import React, { useState } from 'react'
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { FormControl, FormLabel } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [ show, setShow ] = useState(false);
    const [ name, setName ] = useState();
    const [ email, setEmail ] = useState();
    const [ confirmpassword, setConfirmpassword ] = useState();
    const [ password, setPassword ] = useState();
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please fill all fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords do not match",
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
                "/api/user", 
                {name,email,password},
                config
            );
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/trades')
        } catch (error) {
            toast({
                title: "Error Occured",
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
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)}/>
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : 'password'} placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input type={show ? "text" : 'password'} placeholder='Confirm Password' onChange={(e)=>setConfirmpassword(e.target.value)}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button colorScheme="blue" width="100%" style={{ marginTop:15 }} onClick={submitHandler}>
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup