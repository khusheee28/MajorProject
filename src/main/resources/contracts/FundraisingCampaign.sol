// SPDX-License-Identifier: MIT
pragma solidity 0.8.29;

contract FundraisingCampaign {
    struct Campaign {
        string title;
        string description;
        uint256 targetAmount;
        uint256 currentAmount;
        uint256 startDate;
        uint256 endDate;
        address creator;
        bool active;
        bool funded;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    event CampaignCreated(
        uint256 indexed campaignId,
        string title,
        uint256 targetAmount,
        address creator
    );

    event DonationReceived(
        uint256 indexed campaignId,
        address donor,
        uint256 amount
    );

    event FundsWithdrawn(
        uint256 indexed campaignId,
        address creator,
        uint256 amount
    );

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _targetAmount,
        uint256 _endDate
    ) public returns (uint256) {
        require(_targetAmount > 0, "Target amount must be greater than 0");
        require(_endDate > block.timestamp, "End date must be in the future");

        campaignCount++;
        campaigns[campaignCount] = Campaign({
            title: _title,
            description: _description,
            targetAmount: _targetAmount,
            currentAmount: 0,
            startDate: block.timestamp,
            endDate: _endDate,
            creator: msg.sender,
            active: true,
            funded: false
        });

        emit CampaignCreated(campaignCount, _title, _targetAmount, msg.sender);
        return campaignCount;
    }

    function makeDonation(uint256 _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.active, "Campaign is not active");
        require(block.timestamp <= campaign.endDate, "Campaign has ended");
        require(msg.value > 0, "Donation amount must be greater than 0");

        campaign.currentAmount += msg.value;
        
        if (campaign.currentAmount >= campaign.targetAmount) {
            campaign.funded = true;
        }

        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only creator can withdraw funds");
        require(campaign.currentAmount > 0, "No funds to withdraw");
        require(block.timestamp > campaign.endDate || campaign.funded, 
                "Campaign must be ended or funded to withdraw");

        uint256 amount = campaign.currentAmount;
        campaign.currentAmount = 0;
        campaign.active = false;

        (bool success, ) = campaign.creator.call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(_campaignId, campaign.creator, amount);
    }

    function getCampaign(uint256 _campaignId) public view returns (
        string memory title,
        string memory description,
        uint256 targetAmount,
        uint256 currentAmount,
        uint256 startDate,
        uint256 endDate,
        address creator,
        bool active,
        bool funded
    ) {
        Campaign memory campaign = campaigns[_campaignId];
        return (
            campaign.title,
            campaign.description,
            campaign.targetAmount,
            campaign.currentAmount,
            campaign.startDate,
            campaign.endDate,
            campaign.creator,
            campaign.active,
            campaign.funded
        );
    }
} 