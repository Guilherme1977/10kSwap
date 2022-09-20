export default {
  main_network: 'Mainnet',
  goerli_test_network: 'Görli',
  loading: 'loading...',
  connect: 'Connect Wallet',
  comingSoon: 'Coming Soon',
  warning: `This is an ALPHA version, please use small transactions. You can ask for help in <a  href="https://discord.gg/T77yphUPB6" target="_blank">Discord</a> if you have any questions.`,
  account_modal: {
    account: 'Account',
    tips: 'Connected with %{wallet}',
    disconnect: 'Disconnect',
    copy: 'Copy Address',
    copy_success: 'Copy Success',
  },
  connector_not_found_modal: {
    title: 'No Wallet Detected',
    tips: 'Please download <span style="color:#111;">Argent X</span> to use this dapp,which runs on StarkNet,a ZK Rollup network on Ethereum Layer 2.',
  },
  connect_reject_modal: {
    title: 'Error Connectir',
    tips: 'The connection attempt failed.Please click try again and follow the steps to connect in your wallet.',
    retry: 'Try Again',
  },
  connecting_modal: {
    connecting: 'Connecting...',
    tips: 'By connecting a wallet，you agree to <span style="color:#3bc6a5;">10K Swap Labs’ Terms of sevice</span> and acknowledge that you have read and understand the <span style="color:#3bc6a5;">10K Swap Protocl Disclaimer.</span>',
  },
  slippage_tolerance_settings_modal: {
    title: 'Transaction Settings',
    slippage_tolerance: 'Slippage tolerance',
    slippage_tolerance_desc: 'Your transaction will revert if the price changes unfavorably by more than this percentage.',
    auto: 'Auto',
    confirm: 'Confirm',
  },
  recent_transactions: {
    title: 'Recent Transactions',
    clear: 'Clear All',
    tips: 'your transaction will appear here...',
  },
  currency_input_panel: {
    balance: 'balance: %{balance}',
  },
  header: {
    nav: {
      swap: 'Swap',
      pool: 'Pool',
      faucet: 'Faucet',
    },
    connector: {
      connect: 'Connect Wallet',
    },
  },
  swap: {
    title: 'Swap',
    connect: 'Connect Wallet',
    insufficient_liquidity: 'Insufficient liquidity for this trade.',
    fetching: 'Fetching best price',
    expected_output: 'Expected Output',
    expected_input: 'Expected Input',
    price_impact: 'Price Impact',
    minimun_received: 'Minimun received after slippage (%{slippage}%)',
    maximum_received: 'Maximum sold after slippage (%{slippage}%)',
    confirm_swap: 'Confirm Swap',
    swap: 'Swap',
    confirm: 'Confirm',
  },
  transaction: {
    waitting_modal_label: 'Waiting For Confirmation...',
    tips: 'Confirm this transaction in your wallet',
    transaction_rejected: 'Transaction Rejected',
    dismiss: 'Dismiss',
    transaction_submitted: 'Transaction Submitted',
    close: 'Close',
    view_on_scan: 'View on Voyage',
  },
  token_select: {
    label: 'Select',
  },
  faucet: {
    title: 'Faucet',
    connectTips1: 'We will provide free test coins,',
    connectTips2: 'please connect wallet for more information.',
    tips: 'Retweet to get 500 TKA, 500 TKB and 0.01 Goerli ETH within 30 mins.',
    retweet: 'Retweet',
  },
  pool: {
    title: 'Pools Overview',
    my_pools: 'My pools',
    pools: 'Pools',
    new_position: '+ New position',
    name: 'Name',
    APR: 'APR',
    liquidit: 'Liquidit',
    pool_share: 'Pool Share',
    get: 'Get %{token} LP',
    withdraw: 'Withdraw',
    tips: 'Connect wallet to check your pools',
    tips2: 'Your liquidity positions will appear here',
    deposit: 'Deposit',
  },
  pool_modal: {
    add_liqiudit: 'Add Liqiudit',
    withdraw: 'Withdraw',
  },
  add_liqiudit: {
    liqiudity: 'Liqiudity: %{value}',
    no_liqiudity: 'No Liqiudity',
    share_of_pool: 'Share of Pool',
    no_liqiudity_tips: 'Initial prices and pool share',
    deposit: 'Deposit',
    desc: 'Liquidity  providers earn  a 0.25% fee  on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time  and can be claimed by withdrawing your liquidity.',
    confirm_title: 'You will receive',
    pool_token: '%{tokens} Pool Tokens',
    confirm_tips: 'Output is estimated.If the price changes by more than %{slippage}% your transaction will revert',
    deposited: '%{token} Deposited',
    rates: 'Rates',
    confirm: 'Confirm Supply',
  },
  remove_liqiudit: {
    tips: 'Tip: Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.',
    approve: 'Approve',
    price: 'Price',
    your_position: 'Your position',
    pool_share: 'Your pool share',
    confirm_title: 'You will receive',
    confirm_tips: 'Output is estimated.If the price changes by more than %{slippage}% your transaction will revert',
    burned: '%{token} Burned',
    confirm: 'Confirm',
  },
}
