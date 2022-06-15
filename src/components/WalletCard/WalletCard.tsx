import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const WalletCard = () => {
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
              My Wallet
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Current Balance
            </Typography>
            <Typography variant="body2">
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Buy more</Button>
          </CardActions>
        </div>
      </Card>
    </Box>
  );
};

export default WalletCard;
