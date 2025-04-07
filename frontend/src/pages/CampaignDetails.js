import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { ethers } from 'ethers';

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);
  const [error, setError] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    // TODO: Fetch campaign details from blockchain
    // Mock data for now
    setCampaign({
      id: 1,
      title: 'Save the Rainforest',
      description: 'Help us protect the Amazon rainforest and its biodiversity. Our mission is to preserve this vital ecosystem for future generations.',
      image: 'https://source.unsplash.com/random/800x600/?rainforest',
      targetAmount: '100',
      currentAmount: '75',
      daysLeft: 15,
      status: 'active',
      category: 'Environment',
      creator: '0x1234...5678',
      donations: [
        { donor: '0xabcd...efgh', amount: '10', timestamp: Date.now() - 86400000 },
        { donor: '0xijkl...mnop', amount: '5', timestamp: Date.now() - 172800000 },
      ],
    });
    setLoading(false);
  }, [id]);

  const handleDonate = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    setDonating(true);
    setError('');

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to make a donation');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Create donation transaction
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // TODO: Replace with your actual contract address and ABI
      const contractAddress = 'YOUR_CONTRACT_ADDRESS';
      const contractABI = []; // Add your contract ABI here

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Convert donation amount to Wei
      const donationAmountWei = ethers.utils.parseEther(donationAmount);

      // Send donation transaction
      const tx = await contract.donate(id, {
        value: donationAmountWei,
      });

      // Wait for transaction to be mined
      await tx.wait();

      // Refresh campaign data
      // TODO: Implement refresh logic

      // Clear donation amount
      setDonationAmount('');
    } catch (err) {
      setError(err.message);
    } finally {
      setDonating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!campaign) {
    return (
      <Container>
        <Alert severity="error">Campaign not found</Alert>
      </Container>
    );
  }

  const progress = (parseFloat(campaign.currentAmount) / parseFloat(campaign.targetAmount)) * 100;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <img
              src={campaign.image}
              alt={campaign.title}
              style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '24px' }}
            />
            <Typography variant="h4" gutterBottom>
              {campaign.title}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip label={campaign.category} color="primary" sx={{ mr: 1 }} />
              <Chip
                label={campaign.status}
                color={campaign.status === 'active' ? 'success' : 'default'}
              />
            </Box>
            <Typography variant="body1" paragraph>
              {campaign.description}
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Donations
            </Typography>
            <List>
              {campaign.donations.map((donation, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={`${ethers.utils.formatEther(donation.amount)} ETH`}
                      secondary={`From ${donation.donor} • ${new Date(donation.timestamp).toLocaleDateString()}`}
                    />
                  </ListItem>
                  {index < campaign.donations.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Campaign Progress
            </Typography>
            <Box sx={{ mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 10, borderRadius: 5, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {progress.toFixed(1)}% funded
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                {ethers.utils.formatEther(campaign.currentAmount)} ETH
              </Typography>
              <Typography variant="body2" color="text.secondary">
                raised of {ethers.utils.formatEther(campaign.targetAmount)} ETH
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {campaign.daysLeft} days left
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="Donation Amount (ETH)"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                type="number"
                InputProps={{
                  inputProps: { min: 0, step: 0.01 },
                }}
              />
              <Button
                variant="contained"
                onClick={handleDonate}
                disabled={donating || campaign.status !== 'active'}
                startIcon={donating && <CircularProgress size={20} />}
              >
                Donate
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CampaignDetails; 