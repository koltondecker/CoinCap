import { Button, Card, Container, Grid, Input } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../types/types";
import CryptoJS from "crypto-js";

const Signup = () => {
  const [formObject, setFormObject] = useState<User>({
    userName: "",
    password: "",
    accountCreated: new Date(),
    Wallet: [],
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    if (formObject.userName && formObject.password) {
      let today = new Date();
      let userObj = { ...formObject };
      userObj.accountCreated = today;
      userObj.password = CryptoJS.SHA1(formObject.password).toString();
      window.localStorage.setItem("user", JSON.stringify(userObj));
      setSuccess(true);
      navigate("/dashboard");
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card card">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Sign Up for a New Account</h3>
          </Grid>
          <Grid item xs={12}>
            <Input
              onChange={handleInputChange}
              name="userName"
              placeholder="Username (required)"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Password (required)"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={!(formObject.userName && formObject.password)}
              onClick={handleFormSubmit}
            >
              Submit User
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Link to="/login">Already have an account? Log in here</Link>
            {success && <div> Success! Redirecting to Dashboard.</div>}
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Signup;
