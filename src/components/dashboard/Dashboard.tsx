import GetCryptoCoins from "../../util/GetCryptoCoins";
import Navbar from "../navbar/Navbar";

import CryptoTable from "../Table/CryptoTable";

const Dashboard = () => {
  const { topCoins } = GetCryptoCoins();

  return (
    <>
      <Navbar />
      <h1 style={{ color: "white", textAlign: "center", marginTop: 20 }}>
        Crypto Dashboard
      </h1>
      {/* <h3>
        Last Checked at:{" "}
        {topCoins?.timestamp ? new Date(topCoins?.timestamp * 1000) : ""}
      </h3> */}
      <CryptoTable topCoins={topCoins} />
    </>
  );
};

export default Dashboard;
