package com.fundraising.util;

import org.web3j.codegen.SolidityFunctionWrapperGenerator;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Contract;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

import java.io.File;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ContractGenerator {
    public static void generateContractWrapper(String contractBinary, String contractAbi, String outputPath, String packageName) {
        try {
            File binFile = new File("build/contracts/FundraisingCampaign.bin");
            File abiFile = new File("build/contracts/FundraisingCampaign.abi");
            File outputDir = new File(outputPath);
            
            SolidityFunctionWrapperGenerator generator = new SolidityFunctionWrapperGenerator(
                binFile,
                abiFile,
                outputDir,
                packageName,
                "FundraisingCampaign",
                false,
                false,
                false,
                null,
                0,
                false
            );
            
            generator.generate();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate contract wrapper", e);
        }
    }

    public static void main(String[] args) {
        try {
            // Read the contract binary and ABI
            String binary = new String(Files.readAllBytes(Paths.get("build/contracts/FundraisingCampaign.bin")));
            String abi = new String(Files.readAllBytes(Paths.get("build/contracts/FundraisingCampaign.abi")));

            // Generate the wrapper
            String basePackageName = "com.fundraising.contracts";
            String destinationDir = "src/main/java";
            String contractName = "FundraisingCampaign";

            generateContractWrapper(binary, abi, destinationDir, basePackageName);

            System.out.println("Contract wrapper generated successfully!");
        } catch (Exception e) {
            System.err.println("Error generating contract wrapper: " + e.getMessage());
            e.printStackTrace();
        }
    }
} 