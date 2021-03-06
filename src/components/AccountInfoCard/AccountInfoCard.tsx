import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Input,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { User } from "../../types/types";

const AccountInfoCard = () => {
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [updatedPassword, setUpdatedPassword] = useState<string>("");
  const [user, setUser] = useState<User>();

  const updatePassword = () => {
    let userJson = window.localStorage.getItem("user");
    if (!userJson) return;
    let user = JSON.parse(userJson);
    if (!user) return;
    console.log(CryptoJS.SHA1(currentPassword).toString());
    if (
      currentPassword &&
      updatedPassword &&
      CryptoJS.SHA1(currentPassword).toString() === user.password &&
      currentPassword !== updatedPassword
    ) {
      user.password = CryptoJS.SHA1(updatedPassword).toString();
      window.localStorage.setItem("user", JSON.stringify(user));
      setUpdatingPassword(false);
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    let userJson = window.localStorage.getItem("user");
    if (!userJson) return;
    let user = JSON.parse(userJson);
    if (!user) return;
    setUser(user);
  }, []);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card style={{ borderRadius: 10 }}>
        <div
          style={{
            height: 510,
            textAlign: "center",
            borderRadius: 10,
            background: "#d6d2d2",
          }}
        >
          {user && (
            <>
              <CardContent>
                <Typography variant="h2" component="div">
                  {" "}
                  Account Info
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: 20, padding: 10 }}
                >
                  <>
                    Account Created:{" "}
                    {new Date(user.accountCreated).toDateString()}
                  </>
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: 20, padding: 10 }}
                >
                  UserName: {user.userName}
                </Typography>
                <Typography variant="body2">
                  <br />
                </Typography>
                {updatingPassword && (
                  <>
                    <Typography variant="body2">
                      Current password:{" "}
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setCurrentPassword(e.target.value);
                        }}
                      ></Input>
                    </Typography>
                    <Typography variant="body2">
                      New password:{" "}
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUpdatedPassword(e.target.value);
                        }}
                      ></Input>
                    </Typography>
                  </>
                )}
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                {!updatingPassword ? (
                  <Button
                    size="small"
                    onClick={() => setUpdatingPassword(true)}
                  >
                    Update password
                  </Button>
                ) : (
                  <Button
                    size="large"
                    onClick={() => {
                      updatePassword();
                    }}
                  >
                    Update
                  </Button>
                )}
              </CardActions>
            </>
          )}
        </div>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Password Updated"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setOpenSnackbar(false);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Box>
  );
};

export default AccountInfoCard;
