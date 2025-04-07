import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  LinearProgress,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const CampaignCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const Campaigns = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      title: 'Save the Rainforest',
      description: 'Help us protect the Amazon rainforest and its biodiversity.',
      image: 'https://source.unsplash.com/random/800x600/?rainforest',
      targetAmount: 100000,
      currentAmount: 75000,
      daysLeft: 15,
      status: 'active',
      category: 'Environment',
    },
    {
      id: 2,
      title: 'Clean Ocean Initiative',
      description: 'Support our mission to clean up ocean plastic pollution.',
      image: 'https://source.unsplash.com/random/800x600/?ocean',
      targetAmount: 50000,
      currentAmount: 30000,
      daysLeft: 30,
      status: 'active',
      category: 'Environment',
    },
    {
      id: 3,
      title: 'Education for All',
      description: 'Providing quality education to underprivileged children.',
      image: 'https://source.unsplash.com/random/800x600/?education',
      targetAmount: 75000,
      currentAmount: 45000,
      daysLeft: 45,
      status: 'active',
      category: 'Education',
    },
    // Add more mock campaigns as needed
  ];

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.daysLeft - a.daysLeft;
      case 'oldest':
        return a.daysLeft - b.daysLeft;
      case 'highest':
        return b.currentAmount - a.currentAmount;
      case 'lowest':
        return a.currentAmount - b.currentAmount;
      default:
        return 0;
    }
  });

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Campaigns
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search campaigns"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="highest">Highest Amount</MenuItem>
                <MenuItem value="lowest">Lowest Amount</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {sortedCampaigns.map((campaign) => (
          <Grid item key={campaign.id} xs={12} sm={6} md={4}>
            <CampaignCard onClick={() => navigate(`/campaigns/${campaign.id}`)}>
              <CardMedia
                component="img"
                height="200"
                image={campaign.image}
                alt={campaign.title}
              />
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={campaign.category} color="primary" size="small" />
                  <Chip
                    label={campaign.status}
                    color={campaign.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </Stack>
                <Typography gutterBottom variant="h5" component="div">
                  {campaign.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {campaign.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(campaign.currentAmount / campaign.targetAmount) * 100}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ${campaign.currentAmount.toLocaleString()} raised of ${campaign.targetAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {campaign.daysLeft} days left
                  </Typography>
                </Box>
              </CardContent>
            </CampaignCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Campaigns; 