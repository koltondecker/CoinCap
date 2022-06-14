import GetCryptoCoins from "../../util/GetCryptoCoins";
import SearchAppBar from "../navbar/Navbar";

import CryptoTable from "../Table/CryptoTable";

const Dashboard = () => {
  const { topCoins } = GetCryptoCoins();

  return (
    <>
      <SearchAppBar search={true} />
      <CryptoTable lastCheckedAt={topCoins?.timestamp} topCoins={topCoins} />
    </>
  );
};

export default Dashboard;
