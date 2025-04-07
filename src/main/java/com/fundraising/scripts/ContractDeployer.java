package com.fundraising.scripts;

import com.fundraising.contracts.FundraisingCampaign;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;
import java.math.BigInteger;


@Component
public class ContractDeployer implements CommandLineRunner {

    private final Web3j web3j;
    private final String deployerAddress;
    private final String deployerPrivateKey;

    public ContractDeployer(
            Web3j web3j,
            @Value("${ethereum.deployer.address}") String deployerAddress,
            @Value("${ethereum.deployer.private-key}") String deployerPrivateKey) {
        this.web3j = web3j;
        this.deployerAddress = deployerAddress;
        this.deployerPrivateKey = deployerPrivateKey;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Deploying FundraisingCampaign contract...");
        
        Credentials credentials = Credentials.create(deployerPrivateKey);
        ContractGasProvider gasProvider = new StaticGasProvider(
                BigInteger.valueOf(20000000000L),
                BigInteger.valueOf(6721975L)
        );

        FundraisingCampaign contract = FundraisingCampaign.deploy(
                web3j,
                credentials,
                gasProvider,
                "Initial Campaign",
                "Initial Description",
                BigInteger.valueOf(1000000000000000000L), // 1 ETH
                BigInteger.valueOf(System.currentTimeMillis() / 1000 + 30 * 24 * 60 * 60) // 30 days from now
        ).send(); 

        String contractAddress = contract.getContractAddress();
        System.out.println("Contract deployed successfully!");
        System.out.println("Contract address: " + contractAddress);
        System.out.println("Please update this address in application.properties");
    }
} 