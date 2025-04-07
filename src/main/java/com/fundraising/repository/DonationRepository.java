package com.fundraising.repository;

import com.fundraising.domain.Donation;
import com.fundraising.domain.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByCampaign(Campaign campaign);
    List<Donation> findByDonorAddress(String donorAddress);
    Donation findByTransactionHash(String transactionHash);
    List<Donation> findByCampaignId(Long campaignId);
} 