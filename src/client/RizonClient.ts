import { Tendermint34Client, StatusResponse } from '@cosmjs/tendermint-rpc';
import { QueryClient as StargateQueryClient } from '@cosmjs/stargate';

import { RizonWallet, RizonUtils, RizonTypes } from '..';
import {
    AuthExtension,
    setupAuthExtension,
    BankExtension,
    setupBankExtension,
    DistributionExtension,
    setupDistributionExtension,
    GovExtension,
    setupGovExtension,
    IbcExtension,
    setupIbcExtension,
    MintExtension,
    setupMintExtension,
    StakingExtension,
    setupStakingExtension,
    TxExtension,
    setupTxExtension,
} from '../extensions';
import { setupSlashingExtension, SlashingExtension } from '../extensions/slashing';
import { AuthzExtension, setupAuthzExtension } from '../extensions/authz';
import { FeegrantExtension, setupFeegrantExtension } from '../extensions/feegrant';

export class RizonClient {
    readonly tmClient: Tendermint34Client;
    readonly queryClient: StargateQueryClient &
        AuthExtension &
        AuthzExtension &
        BankExtension &
        DistributionExtension &
        GovExtension &
        IbcExtension &
        MintExtension &
        StakingExtension &
        SlashingExtension &
        FeegrantExtension &
        TxExtension;
    private chainId?: string;

    /**
     * Create a RizonClient instance using a tendermint RPC client
     *
     * @param tmClient tendermint RPC client
     */
    constructor(tmClient: Tendermint34Client) {
        this.tmClient = tmClient;
        this.queryClient = StargateQueryClient.withExtensions(
            tmClient,
            setupAuthExtension,
            setupAuthzExtension,
            setupBankExtension,
            setupDistributionExtension,
            setupGovExtension,
            setupIbcExtension,
            setupMintExtension,
            setupStakingExtension,
            setupSlashingExtension,
            setupFeegrantExtension,
            setupTxExtension,
        );

        // Used for debugging while gasWanted, gasUsed and codespace are still waiting to be included in the code lib
        // // @ts-ignore
        // this.tmClient.r.decodeTx = (data) => {
        //     const res = adaptor34.responses.decodeTx(data);
        //     if (res && res.result) {
        //         // @ts-ignore
        //         res.result.gasWanted = Int53.fromString(data.result.tx_result.gas_wanted || '0').toNumber();
        //         // @ts-ignore
        //         res.result.gasUsed = Int53.fromString(data.result.tx_result.gas_used || '0').toNumber();
        //         // @ts-ignore
        //         res.result.codespace = data.result.tx_result.codespace;
        //     }
        //     return res;
        // };
    }

    /**
     * Creates a new RizonClient for the given endpoint
     * Uses HTTP when the URL schema is http or https, uses WebSockets otherwise
     *
     * @param endpoint Blockchain node RPC url
     */
    static connect = async (endpoint: string): Promise<RizonClient> => {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new RizonClient(tmClient);
    };

    /**
     * Disconnect the underlying tendermint client
     */
    disconnect() {
        // Temporary fix missing stop calls from the cosmjs socket implementation
        // @ts-ignore
        this.tmClient.client && this.tmClient.client.socket && this.tmClient.client.events && this.tmClient.client.socket.events._stopNow();
        // @ts-ignore
        this.tmClient.client &&
            // @ts-ignore
            this.tmClient.client.socket &&
            // @ts-ignore
            this.tmClient.client.socket.connectionStatus &&
            // @ts-ignore
            this.tmClient.client.socket.connectionStatus.updates &&
            // @ts-ignore
            this.tmClient.client.socket.connectionStatus.updates._stopNow();

        // Disconnect the client
        this.tmClient.disconnect();
    }

    /**
     * Get the connected node status information
     */
    status = async (): Promise<StatusResponse> => {
        const status = await this.tmClient.status();
        return status;
    };

    /**
     * Get the chain id
     */
    getChainId = async (): Promise<string> => {
        if (!this.chainId) {
            const response = await this.tmClient.status();
            const chainId = response.nodeInfo.network;
            if (!chainId) {
                throw new Error('Chain ID must not be empty');
            }
            this.chainId = chainId;
        }
        return this.chainId;
    };

    /**
     * Get the current block height
     */
    getBlockHeight = async (): Promise<number> => {
        const status = await this.tmClient.status();
        return status.syncInfo.latestBlockHeight;
    };

    /**
     * Get a block by height
     *
     * @param height block height to get (default to current height)
     */
    getBlock = async (height?: number): Promise<RizonTypes.BlockResponse> => {
        const response = await this.tmClient.block(height);
        return response as RizonTypes.BlockResponse;
    };

    /**
     * Get account information
     *
     * @param address wallet address
     */
    getAccount = async (address: string): Promise<RizonTypes.Account | null> => {
        const anyAccount = await this.queryClient.auth.account(address);
        if (!anyAccount) {
            return null;
        }
        return RizonUtils.accountFromAny(anyAccount);
    };

    /**
     * Get account balance
     *
     * @param address wallet address
     * @param searchDenom Coin denomination (ex: rizon)
     */
    getBalance = async (address: string, searchDenom: string): Promise<RizonTypes.Coin | null> => {
        const balance = await this.queryClient.bank.balance(address, searchDenom);
        return balance ? balance : null;
    };

    /**
     * Get all account balances
     *
     * @param address wallet address
     */
    getAllBalances = async (address: string): Promise<RizonTypes.Coin[]> => {
        const balances = await this.queryClient.bank.allBalances(address);
        return balances;
    };

    /**
     * Get coin supply
     *
     * @param searchDenom Coin denomination (ex: rizon)
     */
    getSupply = async (searchDenom: string): Promise<RizonTypes.Coin | null> => {
        const supply = await this.queryClient.bank.supplyOf(searchDenom);
        return supply ? supply : null;
    };

    /**
     * Get all coins supplies
     */
    getAllSupplies = async (): Promise<RizonTypes.Coin[]> => {
        const supplies = await this.queryClient.bank.totalSupply();
        return supplies;
    };

    /**
     * Get a transaction by Hash
     *
     * @param hash transaction hash to retrieve
     * @param includeProof whether or not to include proof of the transaction inclusion in the block
     */
    getTx = async (hash: Uint8Array, includeProof?: boolean): Promise<RizonTypes.TxResponse | null> => {
        const result = await this.tmClient.tx({ hash: hash, prove: includeProof });
        return result;
    };

    /**
     * Search for transactions (paginated)
     * All queries will be run and results will be deduplicated, merged and sorted by block height
     *
     * Queries:
     * To tell which events you want, you need to provide a query. query is a string, which has a form: "condition AND condition ..." (no OR at the moment). condition has a form: "key operation operand". key is a string with a restricted set of possible symbols ( \t\n\r\()"'=>< are not allowed). operation can be "=", "<", "<=", ">", ">=", "CONTAINS" AND "EXISTS". operand can be a string (escaped with single quotes), number, date or time.
     * Examples: tm.event = 'NewBlock' # new blocks tm.event = 'CompleteProposal' # node got a complete proposal tm.event = 'Tx' AND tx.hash = 'XYZ' # single transaction tm.event = 'Tx' AND tx.height = 5 # all txs of the fifth block tx.height = 5 # all txs of the fifth block
     * Tendermint provides a few predefined keys: tm.event, tx.hash and tx.height. Note for transactions, you can define additional keys by providing events with DeliverTx response.
     *
     * @param queries queries to run (see utils/search for helpers)
     * @param page page to query (default to 1)
     * @param perPage results per pages (default to 30)
     * @param includeProof whether or not to include proofs of the transactions inclusion in the block
     */
    searchTx = async (queries: string[], page = 1, perPage = 30, includeProof?: boolean): Promise<RizonTypes.TxResponse[]> => {
        const results = await Promise.all(queries.map((q) => this.txsQuery({ query: q, page: page, per_page: perPage, prove: includeProof })));
        const seenHashes: Uint8Array[] = [];
        const uniqueResults: RizonTypes.TxResponse[] = [];
        for (let r = 0; r < results.length; r++) {
            for (let t = 0; t < results[r].length; t++) {
                const tx = results[r][t];
                if (!seenHashes.includes(tx.hash)) {
                    seenHashes.push(tx.hash);
                    uniqueResults.push(results[r][t]);
                }
            }
        }
        return uniqueResults.sort((a, b) => a.height - b.height);
    };

    /**
     * Run a tx search
     *
     * @param params Search params
     */
    private txsQuery = async (params: RizonTypes.TxSearchParams): Promise<readonly RizonTypes.TxResponse[]> => {
        const results = await this.tmClient.txSearch(params);
        return results.txs;
    };

    /**
     * Signs the messages using the provided wallet and builds the transaction
     *
     * @param wallet signing wallet or wallets for multi signature
     * @param doc document to sign
     */
    signTx = async (wallet: RizonWallet | RizonWallet[], doc: RizonTypes.Doc): Promise<Uint8Array> => {
        let wallets: RizonWallet[] = [];
        if (Array.isArray(wallet)) {
            wallets = wallet;
        } else {
            wallets = [wallet];
        }

        if (wallets.length < 1) {
            throw new Error('At least one wallet is required to sign the transaction');
        }

        let signDoc: RizonTypes.SignDoc | undefined = undefined;
        const signatures: Uint8Array[] = [];

        for (let i = 0; i < wallets.length; i++) {
            const account = await this.getAccount(wallets[i].getAddress());
            if (!account) {
                throw new Error(`Account not found for wallet at index ${i}`);
            }
            const [walletSignedDoc, signature] = await wallets[i].signTransaction(doc);
            if (i === 0) {
                signDoc = walletSignedDoc;
            }
            signatures.push(signature);
        }
        if (!signDoc) {
            throw new Error('Impossible error to avoid typescript warnings');
        }
        return RizonUtils.generateTxBytes(signDoc, signatures);
    };

    /**
     * Broadcast a signed transaction
     * Basic usage would be to use the signTx method prior to calling this method
     *
     * @param tx signed transaction to broadcast
     */
    broadcastTx = async (tx: Uint8Array): Promise<RizonTypes.BroadcastTxCommitResponse> => {
        const response = await this.tmClient.broadcastTxCommit({ tx });
        return response;
    };

    /**
     * Signs and broadcast the transaction using the specified wallet and messages
     *
     * @param wallet signing wallet or wallets for multi signature
     * @param doc document to sign and broadcast as a transaction
     */
    signAndBroadcastTx = async (wallet: RizonWallet | RizonWallet[], doc: RizonTypes.Doc): Promise<RizonTypes.BroadcastTxCommitResponse> => {
        const signedTx = await this.signTx(wallet, doc);
        return this.broadcastTx(signedTx);
    };
}
