from web3 import Web3

def setup_bsc_testnet():
    # Connect to BSC Testnet
    bsc_testnet_rpc_url = "https://data-seed-prebsc-1-s1.binance.org:8545/"
    web3 = Web3(Web3.HTTPProvider(bsc_testnet_rpc_url))

    if web3.is_connected():
        print(f"Connected to BSC Testnet at {bsc_testnet_rpc_url}")
    else:
        print("Failed to connect to BSC Testnet")
        return

    # Generate a new account or use an existing one
    account = web3.eth.account.create()
    private_key = account.key.hex()
    address = account.address

    print(f"Generated Account:")
    print(f"Address: {address}")
    print(f"Private Key: {private_key}")

    return address, private_key

if __name__ == "__main__":
    address, private_key = setup_bsc_testnet()
