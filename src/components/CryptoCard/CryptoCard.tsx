import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatToUSD } from "../../util/formatters";
import { IconButton, Input, Snackbar } from "@mui/material";
import type { CoinCapData } from "../../types/types";
import CloseIcon from "@mui/icons-material/Close";

interface CryptoCardProps {
  coinDetails: CoinCapData;
}

const CryptoCard = ({ coinDetails }: CryptoCardProps) => {
  if (coinDetails) console.log(coinDetails);
  const [coinPurchase, setCoinPurchase] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const purchaseCoin = () => {
    if (!window.localStorage.getItem("user")) return;
    let userJson = window.localStorage.getItem("user");
    if (!userJson) return;
    let user: any = JSON.parse(userJson);
    if (!user.Wallet) user.Wallet = [];
    if (
      user.Wallet.filter((o: any) => {
        return o.coin === coinDetails.data.symbol;
      }).length > 0
    ) {
      user.Wallet = user.Wallet.map((o: any) => {
        if (o.coin === coinDetails.data.symbol)
          return {
            coin: coinDetails.data.symbol,
            amount: parseFloat(o.amount) + parseFloat(coinPurchase),
          };
      });
    } else {
      user.Wallet.push({ coin: coinDetails.data.symbol, amount: coinPurchase });
    }
    window.localStorage.setItem("user", JSON.stringify(user));
    setOpenSnackbar(true);
    setCoinPurchase("");
  };
  return (
    <>
      {coinDetails && (
        <Box sx={{ minWidth: 275 }}>
          <Card>
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
                  {coinDetails.data.symbol}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  asset
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: 20, padding: 10 }}
                >
                  Current Price: ${formatToUSD(coinDetails.data.priceUsd)}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: 20, padding: 10 }}
                >
                  Current Market Cap: $
                  {formatToUSD(coinDetails.data.marketCapUsd)}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: 20, padding: 10 }}
                >
                  Current Supply: {formatToUSD(coinDetails.data.supply)} coins
                </Typography>
                {coinDetails.data.maxSupply && (
                  <>
                    <Typography
                      variant="body1"
                      style={{ fontSize: 20, padding: 10 }}
                    >
                      Max Supply: {formatToUSD(coinDetails.data.maxSupply)}{" "}
                      coins
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5 }}
                      color="text.secondary"
                      style={{ fontSize: 20, padding: 10 }}
                    >
                      {(
                        (parseFloat(coinDetails.data.supply) /
                          parseFloat(coinDetails.data.maxSupply)) *
                        100
                      ).toFixed(2)}
                      % of supply in circulation
                    </Typography>
                  </>
                )}
                <Typography
                  variant="body1"
                  style={{ fontSize: 20, padding: 10 }}
                >
                  Buy {coinDetails.data.symbol}:{" "}
                  <Input
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCoinPurchase(e.target.value)
                    }
                  ></Input>
                  <Button
                    style={{ borderRadius: 10, border: "solid" }}
                    type="submit"
                    onClick={() => {
                      purchaseCoin();
                    }}
                  >
                    Buy
                  </Button>
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button
                  href={`${coinDetails.data.explorer}`}
                  target="_blank"
                  size="small"
                >
                  Learn More
                </Button>
              </CardActions>
            </div>
          </Card>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            message={`Purchase of ${coinDetails.data.name} succesful`}
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
      )}
    </>
  );
};

export default CryptoCard;
