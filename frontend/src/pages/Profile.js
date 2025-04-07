import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ethers } from 'ethers';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userDonations, setUserDonations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
          throw new Error('Please install MetaMask to view your profile');
        }

        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setUserAddress(accounts[0]);

        // TODO: Fetch user's campaigns and donations from blockchain
        // Mock data for now
        setUserCampaigns([
          {
            id: 1,
            title: 'Save the Rainforest',
            status: 'active',
            targetAmount: '100',
            currentAmount: '75',
            daysLeft: 15,
          },
          {
            id: 2,
            title: 'Clean Ocean Initiative',
            status: 'completed',
            targetAmount: '50',
            currentAmount: '50',
            daysLeft: 0,
          },
        ]);

        setUserDonations([
          {
            campaignId: 3,
            campaignTitle: 'Education for All',
            amount: '10',
            timestamp: Date.now() - 86400000,
          },
          {
            campaignId: 4,
            campaignTitle: 'Healthcare Access',
            amount: '5',
            timestamp: Date.now() - 172800000,
          },
        ]);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleWithdrawFunds = async (campaignId) => {
    try {
      // TODO: Implement withdrawal logic
      console.log('Withdrawing funds for campaign:', campaignId);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {userAddress}
        </Typography>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="My Campaigns" />
          <Tab label="My Donations" />
        </Tabs>

        {activeTab === 0 && (
          <List>
            {userCampaigns.map((campaign) => (
              <ListItem key={campaign.id} divider>
                <ListItemText
                  primary={campaign.title}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label={campaign.status}
                        color={campaign.status === 'active' ? 'success' : 'default'}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {ethers.utils.formatEther(campaign.currentAmount)} ETH raised of{' '}
                        {ethers.utils.formatEther(campaign.targetAmount)} ETH
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {campaign.daysLeft} days left
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  {campaign.status === 'completed' && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleWithdrawFunds(campaign.id)}
                    >
                      Withdraw Funds
                    </Button>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        {activeTab === 1 && (
          <List>
            {userDonations.map((donation, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={donation.campaignTitle}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {ethers.utils.formatEther(donation.amount)} ETH
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(donation.timestamp).toLocaleDateString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default Profile; 