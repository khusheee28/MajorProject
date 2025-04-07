import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/campaigns');
      setCampaigns(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching campaigns');
      setLoading(false);
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Active Campaigns
      </Typography>
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {campaign.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {campaign.description}
                </Typography>
                <Typography variant="body2">
                  Target: {formatAmount(campaign.targetAmount)} ETH
                </Typography>
                <Typography variant="body2">
                  Raised: {formatAmount(campaign.currentAmount)} ETH
                </Typography>
                <Typography variant="body2">
                  End Date: {formatDate(campaign.endDate)}
                </Typography>
                <Typography variant="body2" color={campaign.active ? 'success.main' : 'error.main'}>
                  Status: {campaign.active ? 'Active' : 'Ended'}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  component={Link}
                  to={`/campaign/${campaign.id}`}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CampaignList; 