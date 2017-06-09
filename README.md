Purpose:
---
Provide a demo applications that does signing and validation. The user will create a signature, and then validate it against a Solidity  smart contract.

Requirements:
----
1. Truffle 3.2.1 or greater globally installed
2. A running Ethereum node
3. Node 4 or greater
4. NPM 3 or greater

Setup:
----
1. Start privae Ethereum node (`geth --datadir ... --networkid ... --mine --minerthreads 1 --rpc ...`)
2. Clone repo
3. cd into repo
4. npm install
5. npm run deploy
6. npm run validate

NOTE:
---
This will not work with testrpc!
