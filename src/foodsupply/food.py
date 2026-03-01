from PIL import Image
from pyzbar.pyzbar import decode
from flask_cors import CORS
from flask import *
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
import mysql.connector
import requests
def connect():
    return mysql.connector.connect(host="localhost", user="root",  password="",  database="food",auth_plugin = 'mysql_native_password',port='3306')


from web3 import Web3
from web3.middleware import geth_poa_middleware
from solcx import compile_standard, install_solc

from datetime import datetime

# IPFS server API endpoint
ipfs_api_url = "http://127.0.0.1:5001/api/v0"  # Replace with the actual API URL of your IPFS server
def upload_file_to_ipfs(file_path):
    try:
        # Send a POST request to add the file to IPFS
        response = requests.post(f"{ipfs_api_url}/add", files={"file": open("static/upload/"+file_path, "rb")})
        if response.status_code == 200:
            json_response = response.json()
            print(json_response)
            # The file has been successfully uploaded to IPFS
            ipfs_hash = json_response["Hash"]
            print(ipfs_hash)
            return ipfs_hash
        else:
            print(f"Failed to upload file to IPFS. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    
def download_file(f,fileid):
     # The URL of the file you want to download
        url = "http://127.0.0.1:8080/ipfs/%s?filename=%s"%(fileid,fileid)  # Replace with the actual API URL of your IPFS server
        # The local file path where you want to save the downloaded file
        response = requests.get(url)
        if response.status_code == 200:
                with open("static/download/"+f, "wb") as file:
                            file.write(response.content)
                print(f"File downloaded and saved to {f}")
def blocktransaction(address,privatekey):
    import json
    conn = connect()
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
    my_address = address
    private_key =privatekey
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
    data=[tx_receipt.transactionHash.hex(),
        tx_receipt.blockHash.hex(),
        tx_receipt.blockNumber,
        tx_receipt.cumulativeGasUsed,
        tx_receipt.gasUsed,
        datetime.now()
    ]
    tx_receipt = "".join(["{:02X}".format(b) for b in tx_receipt["transactionHash"]])
    print(tx_receipt)
    print("Transacation completed")
    # Connect to MySQL
    return data
@app.route('/food/insertproductlot', methods=["POST"], strict_slashes=False)
def insertproductlot():
    r=request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select productid from productlot order by productid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
            eid = 1
    else:
            eid = e[0][0]+1
    d="insert into productlot(productid,productname,owners,seedid)values ('%s','%s','%s','%s')"%(eid,r['productname'],r['owners'],r['seedid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 'e'
    
@app.route('/food/updateproductlot', methods=["POST"], strict_slashes=False)
def updateproductlot():
    r=request.json
    mydb = connect()
    d="update productlot set productname ='%s',owners ='%s',seedid ='%s' where productid='%s'"%(r['productname'],r['owners'],r['seedid'],r['productid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'
    
@app.route('/food/viewproductlot', methods=["POST"], strict_slashes=False)
def viewproductlot():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from productlot where owners=(select uid from users where blockchainaddress='%s')"%(r["address"])
        print(tx)
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)
@app.route('/food/deleteproductlot', methods=["POST"], strict_slashes=False)
def deleteproductlot():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from productlot where productid={0}".format(r['id'])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'
def addtransaction(r):
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select tid from transaction order by tid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
            eid = 1
    else:
            eid = e[0][0]+1
    d="insert into transaction(tid,prod_id,fromid,toid,transaddress,remark,file,filehash)values ('%s','%s',(select uid from users where blockchainaddress='%s'),(select uid from users where blockchainaddress='%s'),'%s','%s','%s','%s')"%(eid,r['prod_id'],r['fromid'],r['toid'],r['transaddress'],r['remark'],r["file"],r["filehash"])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
@app.route('/food/insertseed', methods=["POST"], strict_slashes=False)
def insertseed():
    r=request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select seedid from seed order by seedid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
            eid = 1
    else:
            eid = e[0][0]+1
    d="insert into seed(seedid,seedname,growthtime,ownerid)values ('%s','%s','%s',(select uid from users where blockchainaddress='%s'))"%(eid,r['seedname'],r['growthtime'],r['ownerid'])
    print(d)
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    v=blocktransaction(r["ownerid"],r["privatekey"])
    r={'prod_id':eid,'fromid':0,'toid':r["ownerid"],'transaddress':v[0],'remark':'create',"file":"","filehash":""}
    addtransaction(r)
    mydb.close()
    return 'e'

@app.route('/food/transferseed', methods=["POST"], strict_slashes=False)
def transferseed():
    r=request.json
    to=r["seedname"].split("-")
    toid=to[2]
    topri=to[3]
    seid=r["growthtime"].split("-")[0]
    if(r["file"]!=''):
        filehash=upload_file_to_ipfs(r["file"])
    else:
          filehash=''
    mydb = connect()
    d="update seed set ownerid =(select uid from users where blockchainaddress='%s') where seedid='%s'"%(toid,seid)
    mycursor = mydb.cursor()
    mycursor.execute(d)
    v=blocktransaction(toid,topri)
    r={'prod_id':seid,'fromid':r["ownerid"],'toid':toid,'transaddress':v[0],'remark':'Transfer to farmer',"file":r['file'],"filehash":filehash}
    addtransaction(r)
    mydb.commit()
    mydb.close()
    return 's'

@app.route('/food/convertproduct', methods=["POST"], strict_slashes=False)
def convertproduct():
    r=request.json
    productname=r["seedname"]
    seid=r["growthtime"].split("-")[0]
    address=r["ownerid"]
    privatekey=r["privatekey"]
    file=r['file']
    mydb = connect()
    d="update seed set ownerid ='%s' where seedid='%s'"%("",seid)
    mycursor = mydb.cursor()
    mycursor.execute(d)
    
    mycursor = mydb.cursor()
    tx = 'select productid from productlot order by productid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
            eid = 1
    else:
            eid = e[0][0]+1
    d="insert into productlot(productid,productname,owners,seedid)values ('%s','%s',(select uid from users where blockchainaddress='%s'),'%s')"%(eid,productname,address,seid)
    mycursor = mydb.cursor()
    mycursor.execute(d)
    if(file!=''):
        filehash=upload_file_to_ipfs(r["file"])
    else:
          filehash=''
    v=blocktransaction(address,privatekey)
    r={'prod_id':eid,'fromid':"",'toid':address,'transaddress':v[0],'remark':'cultivated seed to crop',"file":file,"filehash":filehash}
    addtransaction(r)
    mydb.commit()
    mydb.close()
    return 's'

@app.route('/food/transfertograinelevator', methods=["POST"], strict_slashes=False)
def transfertograinelevator():
    r=request.json
    i=r["id"]
    eid=r["growthtime"]
    address=r["userid"]
    privatekey=r["address"]
    file=r['file']
    ownerid=r['from']
    mydb = connect()
    d="update productlot set owners ='%s' where productid='%s'"%(i,eid)
    mycursor = mydb.cursor()
    mycursor.execute(d)
    if(file!=''):
        filehash=upload_file_to_ipfs(r["file"])
    else:
          filehash=''
    v=blocktransaction(address,privatekey)
    r={'prod_id':eid,'fromid':ownerid,'toid':address,'transaddress':v[0],'remark':r["remark"],"file":file,"filehash":filehash}
    addtransaction(r)
    mydb.commit()
    mydb.close()
    return 's'

@app.route('/food/generateqr', methods=["POST"], strict_slashes=False)
def generateqr():
    r=request.json
    import qrcode
    # Function to generate QR code
    def generate_qr_code(data, filename):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(data)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")

        img.save("static/qr/"+filename)
    data = "http://localhost:3000/foodsearch/"+str(r["productid"])  # Data for the QR id (e.g., URL)
    filename = "product"+str(r["productid"])+".png"  # Output filename
    generate_qr_code(data, filename)
    mydb = connect()
    d="update productlot set qr ='%s' where productid='%s'"%(filename,r["productid"])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    
    mydb.commit()
    mydb.close()
    return 's'

@app.route('/food/updateseed', methods=["POST"], strict_slashes=False)
def updateseed():
    r=request.json
    mydb = connect()
    d="update seed set seedname ='%s',growthtime ='%s',ownerid ='%s' where seedid='%s'"%(r['seedname'],r['growthtime'],r['ownerid'],r['seedid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'
    
@app.route('/food/viewseed', methods=["POST"], strict_slashes=False)
def viewseed():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from seed where ownerid=(select uid from users where blockchainaddress='%s')"%(r["address"])
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)

@app.route('/food/viewseedhistory', methods=["POST"], strict_slashes=False)
def viewseedhistory():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from transaction  where toid=(select uid from users where blockchainaddress='%s') or fromid=(select uid from users where blockchainaddress='%s')"%(r["address"],r["address"])
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)

@app.route('/food/viewhistory', methods=["POST"], strict_slashes=False)
def viewhistory():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from transaction  where prod_id='%s'"%(r["productid"])
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)
@app.route('/food/deleteseed', methods=["POST"], strict_slashes=False)
def deleteseed():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from seed where seedid={0}".format(r['id'])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'
@app.route('/food/inserttransaction', methods=["POST"], strict_slashes=False)
def inserttransaction():
    r=request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select tid from transaction order by tid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
            eid = 1
    else:
            eid = e[0][0]+1
    d="insert into transaction(tid,prod_id,fromid,toid,transactiondate,transaddress,remark)values ('%s','%s','%s','%s','%s','%s','%s')"%(eid,r['prod_id'],r['fromid'],r['toid'],r['transactiondate'],r['transaddress'],r['remark'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 'e'
    
@app.route('/food/updatetransaction', methods=["POST"], strict_slashes=False)
def updatetransaction():
    r=request.json
    mydb = connect()
    d="update transaction set prod_id ='%s',fromid ='%s',toid ='%s',transactiondate ='%s',transaddress ='%s',remark ='%s' where tid='%s'"%(r['prod_id'],r['fromid'],r['toid'],r['transactiondate'],r['transaddress'],r['remark'],r['tid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'
    
@app.route('/food/viewtransaction', methods=["POST"], strict_slashes=False)
def viewtransaction():
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from transaction"
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)
@app.route('/food/deletetransaction', methods=["POST"], strict_slashes=False)
def deletetransaction():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from transaction where tid={0}".format(r['id'])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'
@app.route('/food/insertusers', methods=["POST"], strict_slashes=False)
def insertusers():
    r=request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select uid from users order by uid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
            eid = 1
    else:
            eid = e[0][0]+1
    d="insert into users(uid,fname,mobile,blockchainaddress,privatekey,role)values ('%s','%s','%s','%s','%s','%s')"%(eid,r['fname'],r['mobile'],r['blockchainaddress'],r['privatekey'],r['role'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 'e'
    
@app.route('/food/updateusers', methods=["POST"], strict_slashes=False)
def updateusers():
    r=request.json
    mydb = connect()
    d="update users set fname ='%s',mobile ='%s',blockchainaddress ='%s',privatekey ='%s',role ='%s' where uid='%s'"%(r['fname'],r['mobile'],r['blockchainaddress'],r['privatekey'],r['role'],r['uid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'

@app.route('/food/approveusers', methods=["POST"], strict_slashes=False)
def approveusers():
    r=request.json
    mydb = connect()
    d="update users set approve='%s' where uid='%s'"%(1,r['uid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'
    
@app.route('/food/viewusers', methods=["POST"], strict_slashes=False)
def viewusers():
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from users"
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)
@app.route('/food/deleteusers', methods=["POST"], strict_slashes=False)
def deleteusers():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from users where uid={0}".format(r['id'])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'

@app.route('/food/login', methods=["POST"], strict_slashes=False)
def login():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select blockchainaddress,privatekey,role from users where blockchainaddress='%s' and privatekey='%s'"%(r["name"],r["pass"])
        mycursor.execute(tx)
        n=mycursor.fetchone()
        mydb.commit()
        mydb.close()
        return json.dumps(n)
UPLOAD_FOLDER = 'static/upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/food/upload', methods=['POST'])
def upload_file():
    import os 
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        return jsonify({'success': 'File uploaded successfully', 'filename': file.filename})
    
@app.route('/food/upload_qr', methods=['POST'])
def upload_qr():
    # Check if a file was uploaded
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    
    # Check if the file has a valid format (image)
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    if file and allowed_file(file.filename):
        try:
            # Read the uploaded image file
            img = Image.open(file.stream)
            # Decode QR code from the image
            decoded_objects = decode(img)
            qr_data = [obj.data.decode('utf-8') for obj in decoded_objects]
            return jsonify({"qr_data": qr_data,'success': 'File uploaded successfully'}), 200
        except Exception as e:
            return jsonify({"error": str(e),'success': 'File uploaded failed'}), 500
    
    return jsonify({"error": "Invalid file format",'success': 'File uploaded failed'}), 400

# Helper function to check allowed file types
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}
if __name__ == '__main__':
    app.run(debug=True)