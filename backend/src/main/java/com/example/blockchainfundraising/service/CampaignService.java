package com.example.blockchainfundraising.service;

import com.example.blockchainfundraising.model.Campaign;
import com.example.blockchainfundraising.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    public Campaign createCampaign(Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public Campaign getCampaignById(Long id) {
        return campaignRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Campaign not found with id: " + id));
    }

    public void deleteCampaign(Long id) {
        campaignRepository.deleteById(id);
    }
} 