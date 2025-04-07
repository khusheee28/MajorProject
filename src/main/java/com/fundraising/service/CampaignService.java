package com.fundraising.service;

import com.fundraising.domain.Campaign;
import com.fundraising.domain.Donation;
import com.fundraising.repository.CampaignRepository;
import com.fundraising.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;

@Service
public class CampaignService {
    private final CampaignRepository campaignRepository;
    private final DonationRepository donationRepository;
    private final BlockchainService blockchainService;

    @Autowired
    public CampaignService(CampaignRepository campaignRepository, 
                         DonationRepository donationRepository,
                         BlockchainService blockchainService) {
        this.campaignRepository = campaignRepository;
        this.donationRepository = donationRepository;
        this.blockchainService = blockchainService;
    }

    @Transactional
    public Campaign createCampaign(String title, String description, BigInteger targetAmount, BigInteger endDate) {
        try {
            String contractAddress = blockchainService.createCampaign(title, description, targetAmount, endDate);
            Campaign campaign = new Campaign();
            campaign.setTitle(title);
            campaign.setDescription(description);
            campaign.setTargetAmount(targetAmount);
            campaign.setEndDate(endDate);
            campaign.setCurrentAmount(BigInteger.ZERO);
            campaign.setContractAddress(contractAddress);
            campaign.setStatus("ACTIVE");
            return campaignRepository.save(campaign);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create campaign", e);
        }
    }

    @Transactional
    public Donation makeDonation(Long campaignId, String donorAddress, BigInteger amount) {
        try {
            Campaign campaign = getCampaign(campaignId);
            if (campaign == null || !"ACTIVE".equals(campaign.getStatus())) {
                throw new RuntimeException("Campaign is not active");
            }

            String transactionHash = blockchainService.makeDonation(
                campaign.getContractAddress(), 
                BigInteger.valueOf(campaignId), 
                amount
            );

            Donation donation = new Donation();
            donation.setCampaign(campaign);
            donation.setDonorAddress(donorAddress);
            donation.setAmount(amount);
            donation.setTransactionHash(transactionHash);
            donation = donationRepository.save(donation);

            campaign.setCurrentAmount(campaign.getCurrentAmount().add(amount));
            if (campaign.getCurrentAmount().compareTo(campaign.getTargetAmount()) >= 0) {
                campaign.setStatus("FUNDED");
            }
            campaignRepository.save(campaign);

            return donation;
        } catch (Exception e) {
            throw new RuntimeException("Failed to make donation", e);
        }
    }

    @Transactional
    public void withdrawFunds(Long campaignId) {
        try {
            Campaign campaign = getCampaign(campaignId);
            if (campaign == null || !"FUNDED".equals(campaign.getStatus())) {
                throw new RuntimeException("Campaign is not funded");
            }
            blockchainService.withdrawFunds(campaign.getContractAddress(), BigInteger.valueOf(campaignId));
        } catch (Exception e) {
            throw new RuntimeException("Failed to withdraw funds", e);
        }
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public List<Campaign> getActiveCampaigns() {
        return campaignRepository.findByStatus("ACTIVE");
    }

    public List<Campaign> getFundedCampaigns() {
        return campaignRepository.findByStatus("FUNDED");
    }

    public List<Campaign> getCampaignsByCreator(String creatorAddress) {
        return campaignRepository.findByCreatorAddress(creatorAddress);
    }

    public Campaign getCampaign(Long id) {
        return campaignRepository.findById(id).orElse(null);
    }

    public List<Donation> getCampaignDonations(Long campaignId) {
        return donationRepository.findByCampaignId(campaignId);
    }
} 