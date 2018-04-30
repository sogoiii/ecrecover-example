const contract = require('truffle-contract')
const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

const VerifierArtifact = require('./build/contracts/Verifier')
const Verifier = contract(VerifierArtifact)
Verifier.setProvider(provider)

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}

const addr = web3.eth.accounts[0]
const msg = 'school bus'
const hex_msg = '0x' + toHex(msg)
let signature = web3.eth.sign(addr, hex_msg)

console.log(`address -----> ${addr}`)
console.log(`msg ---------> ${msg}`)
console.log(`hex(msg) ----> ${hex_msg}`)
console.log(`sig ---------> ${signature}`)

signature = signature.substr(2);
const r = '0x' + signature.slice(0, 64)
const s = '0x' + signature.slice(64, 128)
const v = '0x' + signature.slice(128, 130)
var v_decimal = web3.toDecimal(v)
if(v_decimal != 27 || v_decimal != 28) {
	v_decimal += 27
}

console.log(`r -----------> ${r}`)
console.log(`s -----------> ${s}`)
console.log(`v -----------> ${v}`)
console.log(`vd ----------> ${v_decimal}`)

Verifier
  .deployed()
  .then(instance => {
    const fixed_msg = `\x19Ethereum Signed Message:\n${msg.length}${msg}`
    const fixed_msg_sha = web3.sha3(fixed_msg)
    return instance.recoverAddr.call(
      fixed_msg_sha,
      v_decimal,
      r,
      s
    )
  })
  .then(data => {
    console.log('-----data------')
    console.log(`input addr ==> ${addr}`)
    console.log(`output addr => ${data}`)
  })
  .catch(e => {
    console.log('i got an error')
    console.log(e)
  })
