#!/bin/bash

# Download Web3j
curl -L get.web3j.io | sh

# Generate contract wrapper
web3j generate solidity \
    -a src/main/resources/contracts/FundraisingCampaign.sol \
    -b src/main/resources/contracts/bin \
    -o src/main/java \
    -p com.fundraising.contracts 