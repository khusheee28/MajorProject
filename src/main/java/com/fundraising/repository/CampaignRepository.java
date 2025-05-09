package com.fundraising.repository;

import com.fundraising.domain.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByActiveTrue();
    List<Campaign> findByCreatorAddress(String creatorAddress);
    Campaign findByContractAddress(String contractAddress);
    List<Campaign> findByStatus(String status);
} 