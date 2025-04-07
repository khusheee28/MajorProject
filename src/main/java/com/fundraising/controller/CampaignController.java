package com.fundraising.controller;

import com.fundraising.domain.Campaign;
import com.fundraising.domain.Donation;
import com.fundraising.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {
    private final CampaignService campaignService;

    @Autowired
    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam BigInteger targetAmount,
            @RequestParam BigInteger endDate) {
        return ResponseEntity.ok(campaignService.createCampaign(title, description, targetAmount, endDate));
    }

    @PostMapping("/{campaignId}/donate")
    public ResponseEntity<Donation> makeDonation(
            @PathVariable Long campaignId,
            @RequestParam String donorAddress,
            @RequestParam BigInteger amount) {
        return ResponseEntity.ok(campaignService.makeDonation(campaignId, donorAddress, amount));
    }

    @GetMapping
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        return ResponseEntity.ok(campaignService.getAllCampaigns());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Campaign>> getActiveCampaigns() {
        return ResponseEntity.ok(campaignService.getActiveCampaigns());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaign(@PathVariable Long id) {
        return ResponseEntity.ok(campaignService.getCampaign(id));
    }

    @GetMapping("/{id}/donations")
    public ResponseEntity<List<Donation>> getCampaignDonations(@PathVariable Long id) {
        return ResponseEntity.ok(campaignService.getCampaignDonations(id));
    }
} 