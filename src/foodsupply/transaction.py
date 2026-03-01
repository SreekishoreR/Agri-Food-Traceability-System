def transaction(sender_address, receiver_address, private_key):
    from web3 import Web3

    # Binance Smart Chain RPC endpoint
    bsc_rpc_endpoint = "https://bsc-dataseed.binance.org/"

    # Initialize Web3 object with BSC endpoint
    w3 = Web3(Web3.HTTPProvider(bsc_rpc_endpoint))

    # Check if connected to the BSC network
    if w3.is_connected():
        print("Connected to BSC network")
    else:
        print("Not connected to BSC network")
        return None

    # Fetch the nonce for the sender address
    nonce = w3.eth.get_transaction_count(sender_address)

    # Build a transaction dictionary
    transaction_dict = {
        'nonce': nonce,
        'to': receiver_address,
        'value': w3.to_wei(1, 'ether'),  # Sending 1 BNB (1 BNB = 10^18 Wei)
        'gas': 21000,  # Standard gas limit for a simple transaction
        'gasPrice': w3.to_wei(5, 'gwei')  # Gas price in Wei (5 Gwei)
    }

    # Sign the transaction
    signed_transaction = w3.eth.account.sign_transaction(transaction_dict, private_key)

    # Send the raw transaction
    transaction_hash = w3.eth.send_raw_transaction(signed_transaction.rawTransaction)

    # Wait for the transaction receipt
    transaction_receipt = w3.eth.waitForTransactionReceipt(transaction_hash)

    # Convert the transaction hash to hex
    transaction_receipt_hex = transaction_receipt['transactionHash'].hex()

    print("Transaction Hash:", transaction_receipt_hex)
    return transaction_receipt_hex
v=transaction("0x71A644A1EE4DF405e93B1Be7A047cb04924b8459","0x7397aD1017054c1544083CaC010B3AD314a8c041","0xeacbf55c6bcc60612c33a9c506fff68189b60bf1c36207764fbb919f30e9974e")
print(v)

