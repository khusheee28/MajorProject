package com.fundraising.service;

import com.fundraising.contracts.FundraisingCampaign;
import com.fundraising.domain.Campaign;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.abi.datatypes.Type;

import java.math.BigInteger;
import java.util.List;

@Service
public class BlockchainService {

    @Autowired
    private Web3j web3j;

    @Autowired
    private Credentials credentials;

    @Autowired
    private ContractGasProvider gasProvider;

    public String createCampaign(String title, String description, BigInteger targetAmount, BigInteger endDate) throws Exception {
        FundraisingCampaign contract = FundraisingCampaign.deploy(web3j, credentials, gasProvider, title, description, targetAmount, endDate).send();
        return contract.getContractAddress();
    }

    public String makeDonation(String contractAddress, BigInteger campaignId, BigInteger amount) throws Exception {
        FundraisingCampaign contract = FundraisingCampaign.load(contractAddress, web3j, credentials, gasProvider);
        TransactionReceipt receipt = contract.makeDonation(campaignId, amount).send();
        return receipt.getTransactionHash();
    }

    public void withdrawFunds(String contractAddress, BigInteger campaignId) throws Exception {
        FundraisingCampaign contract = FundraisingCampaign.load(contractAddress, web3j, credentials, gasProvider);
        contract.withdrawFunds(campaignId).send();
    }

    public List<Type> getCampaign(String contractAddress, BigInteger campaignId) throws Exception {
        FundraisingCampaign contract = FundraisingCampaign.load(contractAddress, web3j, credentials, gasProvider);
        return contract.getCampaign(campaignId).send();
    }
} 