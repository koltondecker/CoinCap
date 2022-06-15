import React, { useState } from "react";
// import API from "../utils/API";
// import { useUserContext } from "../utils/userContext";
import { useNavigate, Link } from "react-router-dom";
import type { LoginObj } from "../../types/types";
import { Container } from "@mui/system";
import { Button, Card, Grid, Input } from "@mui/material";
import CryptoJS from "crypto-js";

const Login = () => {
  const [formObject, setFormObject] = useState<LoginObj>({
    userName: "",
    password: "",
  });
  const [success, setSuccess] = useState(true);
  const [fail, setFail] = useState(true);
  const navigate = useNavigate();
  //   const { dispatch } = useUserContext();

  function handleInputChange(event: any) {
    const { name, value } = event.target;

    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event: any) {
    event.preventDefault();
    let userObj = { ...formObject };
    userObj.password = CryptoJS.SHA1(formObject.password).toString();
    window.localStorage.setItem("user", JSON.stringify(userObj));
    navigate("/dashboard");
    // if (formObject.userName && formObject.password) {
    //     axios.post("/api/users/login", {
    //         username: formObject.userName,
    //         password: formObject.password,
    //       });
    //     .then(async (res) => {
    //       setSuccess(true);
    //       setFail(false);
    //       dispatch({
    //         type: "add",
    //         id: res.data._id,
    //         userName: res.data.userName,
    //         firstName: res.data.name.firstName,
    //         lastName: res.data.name.lastName,
    //         memberOf: res.data.memberOf,
    //         isAuthenticated: "true",
    //       });
    //       navigate("/");
    //     })
    //     .catch((err:) => {
    //       setSuccess(false);
    //       setFail(true);
    //       console.log(err);
    //     });
    // }
  }

  return (
    <>
      <Container className="login-container">
        <Card className="login-card card">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h3>Log Into an Existing Account</h3>
            </Grid>
            <Grid item xs={12}>
              <Input
                onChange={handleInputChange}
                name="userName"
                placeholder="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                onChange={handleInputChange}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!(formObject.userName && formObject.password)}
                onClick={handleFormSubmit}
              >
                Log in
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to="/signup">Create a new account</Link>
              {!success && <div> Whoops! Please try again.</div>}
              {!fail && <div> Success! You are now logged in.</div>}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default Login;
