def transaction(sender_address, receiver_address, private_key):
    from web3 import Web3

    bsc_rpc_endpoint = "https://bsc-dataseed.binance.org/"
    w3 = Web3(Web3.HTTPProvider(bsc_rpc_endpoint))

    if not w3.is_connected():
        print("Not connected to BSC network")
        return None

    nonce = w3.eth.get_transaction_count(sender_address)

    transaction_dict = {
        "nonce": nonce,
        "to": receiver_address,
        "value": w3.to_wei(1, "ether"),
        "gas": 21000,
        "gasPrice": w3.to_wei(5, "gwei"),
    }

    signed_transaction = w3.eth.account.sign_transaction(
        transaction_dict,
        private_key
    )

    tx_hash = w3.eth.send_raw_transaction(
        signed_transaction.rawTransaction
    )

    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    tx_hash_hex = tx_receipt.transactionHash.hex()

    print("Transaction Hash:", tx_hash_hex)
    return tx_hash_hex
