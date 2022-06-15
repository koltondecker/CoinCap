import { Grid } from "@mui/material";
import AccountInfoCard from "../AccountInfoCard/AccountInfoCard";
import Navbar from "../navbar/Navbar";
import WalletCard from "../WalletCard/WalletCard";

const Account = () => {
  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={6} style={{ padding: 50 }}>
          <AccountInfoCard />
        </Grid>
        <Grid item xs={6} style={{ padding: 50 }}>
          <WalletCard />
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
