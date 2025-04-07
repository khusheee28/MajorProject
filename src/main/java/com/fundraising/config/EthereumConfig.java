package com.fundraising.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;
import java.math.BigInteger;

@Configuration
public class EthereumConfig {

    @Value("${ethereum.node.url}")
    private String ethereumNodeUrl;

    @Value("${ethereum.contract.address}")
    private String contractAddress;

    @Bean
    public Web3j web3j() {
        return Web3j.build(new HttpService(ethereumNodeUrl));
    }

    @Bean
    public ContractGasProvider gasProvider() {
        return new StaticGasProvider(
                BigInteger.valueOf(20000000000L), // Gas price
                BigInteger.valueOf(6721975L)      // Gas limit
        );
    }

    @Bean
    public String contractAddress() {
        return contractAddress;
    }
} 