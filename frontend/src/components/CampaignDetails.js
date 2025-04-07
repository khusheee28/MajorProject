import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ethers } from 'ethers';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Grid,
  Divider,
} from '@mui/material';

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donationError, setDonationError] = useState('');
  const [donationSuccess, setDonationSuccess] = useState('');

  useEffect(() => {
    fetchCampaignDetails();
    fetchDonations();
  }, [id]);

  const fetchCampaignDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/campaigns/${id}`);
      setCampaign(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching campaign details');
      setLoading(false);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/campaigns/${id}/donations`);
      setDonations(response.data);
    } catch (err) {
      console.error('Error fetching donations:', err);
    }
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    try {
      const amountWei = ethers.utils.parseEther(donationAmount);
      await axios.post(`http://localhost:8080/api/campaigns/${id}/donate`, {
        amount: amountWei.toString(),
      });
      setDonationSuccess('Donation successful!');
      setDonationAmount('');
      fetchCampaignDetails();
      fetchDonations();
    } catch (err) {
      setDonationError(err.response?.data?.message || 'Error making donation');
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const formatAmount = (wei) => {
    return ethers.utils.formatEther(wei);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!campaign) {
    return <Alert severity="error">Campaign not found</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {campaign.title}
              </Typography>
              <Typography color="textSecondary" paragraph>
                {campaign.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Target Amount</Typography>
                  <Typography>{formatAmount(campaign.targetAmount)} ETH</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Current Amount</Typography>
                  <Typography>{formatAmount(campaign.currentAmount)} ETH</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Start Date</Typography>
                  <Typography>{formatDate(campaign.startDate)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">End Date</Typography>
                  <Typography>{formatDate(campaign.endDate)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Status</Typography>
                  <Typography color={campaign.active ? 'success.main' : 'error.main'}>
                    {campaign.active ? 'Active' : 'Ended'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Recent Donations
            </Typography>
            {donations.map((donation) => (
              <Card key={donation.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1">
                    {formatAmount(donation.amount)} ETH
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    From: {donation.donorAddress}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {formatDate(donation.timestamp)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Make a Donation
              </Typography>
              {donationError && (
                <Alert severity="error" sx={{ mb: 2 }}>{donationError}</Alert>
              )}
              {donationSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>{donationSuccess}</Alert>
              )}
              <form onSubmit={handleDonation}>
                <TextField
                  fullWidth
                  label="Amount (ETH)"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  type="number"
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={!campaign.active}
                >
                  Donate Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignDetails; 