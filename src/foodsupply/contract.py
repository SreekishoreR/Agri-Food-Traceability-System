from web3 import Web3
from web3.middleware import geth_poa_middleware
from solcx import compile_standard, install_solc

from datetime import datetime
def s():
    from solcx import compile_standard, install_solc
    import json
    conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='tran',
    port=3307)
    cursor = conn.cursor()
    install_solc("0.6.0")
    with open("./SimpleStorage.sol", "r") as file:
        simple_storage_file = file.read()

    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"SimpleStorage.sol": {"content": simple_storage_file}},
            "settings": {
                "outputSelection": {
                    "*": {
                        "*": ["abi", "metadata", "evm.bytecode", "evm.bytecode.sourceMap"]
                    }
                }
            },
        },
        solc_version="0.6.0",
    )

    with open("compiled_code.json", "w") as file:
        json.dump(compiled_sol, file)

    bytecode = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"][
        "bytecode"
    ]["object"]
    # get abi
    abi = json.loads(
        compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["metadata"]
    )["output"]["abi"]
    from web3 import Web3
    import json

    #w3 = Web3(Web3.HTTPProvider('HTTP://127.0.0.1:7545'))
    chain_id = 97
    #print(w3.is_connected())
    # BSC Testnet RPC URL
    bsc_testnet_rpc_url = "https://data-seed-prebsc-1-s1.binance.org:8545/"

    # Connect to BSC Testnet
    w3 = Web3(Web3.HTTPProvider(bsc_testnet_rpc_url))
    #web3.middleware_stack.inject(geth_poa_middleware, layer=0)
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    my_address = '0x7397aD1017054c1544083CaC010B3AD314a8c041'
    private_key ='0xc26938a2c56a4b7d4f4ac083104c441d550695e07f5b07cf4c9e45f5117dabac'
    # initialize contract
    SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)
    nonce = w3.eth.get_transaction_count(my_address)
    # set up transaction from constructor which executes when firstly
    transaction = SimpleStorage.constructor().build_transaction(
        {"chainId": chain_id, "from": my_address, "nonce": nonce}
    )
    signed_tx = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    insert_query = """
INSERT INTO transaction_receipts (
    transaction_hash, block_hash, block_number,
    cumulative_gas_used, gas_used, timestamp
) VALUES (%s, %s, %s, %s, %s, %s)
"""

    cursor.execute(insert_query, (
        tx_receipt.transactionHash.hex(),
        tx_receipt.blockHash.hex(),
        tx_receipt.blockNumber,
        tx_receipt.cumulativeGasUsed,
        tx_receipt.gasUsed,
        datetime.now()
    ))

    # Commit the transaction
    conn.commit()

    # Close the cursor and connection
    cursor.close()
    conn.close()
    print(tx_receipt)
    tx_receipt = "".join(["{:02X}".format(b) for b in tx_receipt["transactionHash"]])
    print(tx_receipt)
    print("Transacation completed")
    # Connect to MySQL


s()
