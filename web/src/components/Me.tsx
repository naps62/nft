import React, { FC, useState, useEffect, useContext } from "react";
import { ApiContext } from "./ApiContext";

import TokenCard from "./TokenCard";
import Buy from "./Buy";

const Me: FC = (props) => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [state] = useContext(ApiContext);

  useEffect(() => {
    if (!state.account) {
      return;
    }

    const { address } = state.account!;

    state
      .api!.nft.query.tokensOf(address, { value: 0, gasLimit: 0 }, address)
      .then(({ output }: any) => {
        setTokens(output);
      });
  }, [state.account, state.api]);

  return (
    <section>
      <h2>Buy a Pokemon</h2>
      <Buy />
      <h2>Your Tokens</h2>
      <ul>
        {tokens.map((token) => (
          <li key={token}>
            <TokenCard token={token} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Me;
