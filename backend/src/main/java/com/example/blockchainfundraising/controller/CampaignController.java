package com.example.blockchainfundraising.controller;

import com.example.blockchainfundraising.model.Campaign;
import com.example.blockchainfundraising.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @PostMapping("/test")
    public ResponseEntity<?> testDatabaseConnection() {
        try {
            // Test campaign data
            Campaign testCampaign = new Campaign();
            testCampaign.setTitle("Test Campaign");
            testCampaign.setDescription("This is a test campaign to verify database connectivity");
            testCampaign.setTargetAmount(new BigDecimal("1000"));
            testCampaign.setCurrentAmount(new BigDecimal("0"));
            testCampaign.setDuration(30);
            testCampaign.setCategory("Test");
            testCampaign.setImageUrl("https://example.com/test.jpg");
            testCampaign.setCreator("0x123456789");
            testCampaign.setStatus("ACTIVE");
            testCampaign.setStartDate(LocalDateTime.now());
            testCampaign.setEndDate(LocalDateTime.now().plusDays(30));

            // Save to database
            Campaign savedCampaign = campaignService.createCampaign(testCampaign);

            // Verify by retrieving
            Campaign retrievedCampaign = campaignService.getCampaignById(savedCampaign.getId());

            // Clean up test data
            campaignService.deleteCampaign(savedCampaign.getId());

            return ResponseEntity.ok(Map.of(
                "message", "Database connection successful",
                "savedCampaign", retrievedCampaign,
                "timestamp", LocalDateTime.now()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "error", "Database connection failed",
                    "message", e.getMessage()
                ));
        }
    }
} 