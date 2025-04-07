package com.fundraising.controller;

import com.fundraising.domain.Campaign;
import com.fundraising.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/")
public class WebController {

    @Autowired
    private CampaignService campaignService;

    @GetMapping
    public String home(Model model) {
        List<Campaign> campaigns = campaignService.getAllCampaigns();
        model.addAttribute("campaigns", campaigns);
        return "index";
    }

    @GetMapping("/campaign/{id}")
    public String campaignDetails(@PathVariable Long id, Model model) {
        Campaign campaign = campaignService.getCampaign(id);
        model.addAttribute("campaign", campaign);
        return "campaign-details";
    }

    @GetMapping("/campaigns")
    public String allCampaigns(Model model) {
        List<Campaign> campaigns = campaignService.getAllCampaigns();
        model.addAttribute("campaigns", campaigns);
        return "campaigns";
    }

    @GetMapping("/campaigns/create")
    public String createCampaign() {
        return "campaign/create";
    }

    @GetMapping("/campaigns/my")
    public String myCampaigns(Model model) {
        // TODO: Get the current user's address from the session
        String userAddress = "0x..."; // This should come from the user's session
        model.addAttribute("campaigns", campaignService.getCampaignsByCreator(userAddress));
        return "campaign/my";
    }
} 