import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Asset } from "../../types/types";
import { formatToUSD } from "../../util/formatters";
import GetCryptoCoins from "../../util/GetCryptoCoins";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WalletCard = () => {
  const { topCoins } = GetCryptoCoins();
  const [currentBalance, setCurrentBalance] = useState<string>("0");
  const [ownedCoins, setOwnedCoins] = useState<Asset[]>();
  const [wallet, setWallet] = useState<{ coin: string; amount: number }[]>();

  const getAmountOwned = (symbol: string) => {
    if (!wallet) return 0;
    console.log("amountOwned function", wallet);
    let newWallet = [...wallet];
    let coinData = newWallet.filter((coin) => coin.coin === symbol);
    return coinData[0].amount;
  };

  //This UseEffect builds out an arrays to store in state of which coins the current user owns, how much they owe, and the coins most up to date data.
  useEffect(() => {
    if (!topCoins) return;
    if (!window.localStorage.getItem("user")) return;
    let userJson = window.localStorage.getItem("user");
    if (!userJson) return;
    let user: any = JSON.parse(userJson);
    if (!user.Wallet) return;
    setWallet(user.Wallet);
    let newWallet = [...user.Wallet];
    console.log("1st useEffect - 1", user.Wallet);
    let ownedCoins = newWallet.map((o: any) => {
      return o.coin;
    });
    let newTopCoins = { ...topCoins };
    console.log("1st useEffect - 1", user.Wallet);

    setOwnedCoins(
      newTopCoins.data.filter((coin) => {
        if (ownedCoins.includes(coin.symbol)) return coin;
      })
    );
  }, [topCoins]);

  //This UseEffect sets the current balance the user owns.
  useEffect(() => {
    if (!wallet) return;
    console.log("2nd useEffect", wallet);
    let balance: number = 0;
    let newWallet = [...wallet];
    newWallet.forEach((coin) => {
      if (ownedCoins) {
        let curCoin = ownedCoins.filter((o: any) => o.symbol === coin.coin);
        balance += coin.amount * parseFloat(curCoin[0].priceUsd);
      }
    });
    let strBalance = JSON.stringify(balance);
    setCurrentBalance(formatToUSD(strBalance));
  }, [ownedCoins, wallet]);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card style={{ borderRadius: 10 }}>
        <div
          style={{
            height: "auto",
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
              <>Current Balance: ${currentBalance}</>
            </Typography>
            <Typography variant="body2">
              <br />
            </Typography>
            <div>
              {ownedCoins?.map((coin, index) => {
                return (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{coin.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Price Per Coin: ${formatToUSD(coin.priceUsd)}
                      </Typography>
                      <Typography>
                        <>Amount Owned: {getAmountOwned(coin.symbol)}</>
                      </Typography>
                      <Typography>
                        Total Value: $
                        {formatToUSD(
                          JSON.stringify(
                            getAmountOwned(coin.symbol) *
                              parseFloat(coin.priceUsd)
                          )
                        )}
                      </Typography>
                      <Button>Buy</Button>
                      <Button>Sell</Button>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <Button size="small">Buy more</Button>
          </CardActions>
        </div>
      </Card>
    </Box>
  );
};

export default WalletCard;
