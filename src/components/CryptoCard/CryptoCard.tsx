import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatToPercent, formatToUSD } from "../../util/formatters";

const CryptoCard = ({ coinDetails }: any) => {
  if (coinDetails) console.log(coinDetails);
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
                  variant="body2"
                  style={{ fontSize: 20, padding: 10 }}
                >
                  Current Price: ${formatToUSD(coinDetails.data.priceUsd)}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ fontSize: 20, padding: 10 }}
                >
                  Current Market Cap: $
                  {formatToUSD(coinDetails.data.marketCapUsd)}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ fontSize: 20, padding: 10 }}
                >
                  Current Supply: {formatToUSD(coinDetails.data.supply)} coins
                </Typography>
                {coinDetails.data.maxSupply && (
                  <>
                    <Typography
                      variant="body2"
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
        </Box>
      )}
    </>
  );
};

export default CryptoCard;
