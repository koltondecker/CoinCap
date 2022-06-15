import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AccountInfoCard = () => {
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
          <CardContent>
            <Typography variant="h2" component="div">
              {" "}
              Account Info
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              UserName:
            </Typography>
            <Typography variant="body2">
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Update password</Button>
          </CardActions>
        </div>
      </Card>
    </Box>
  );
};

export default AccountInfoCard;
