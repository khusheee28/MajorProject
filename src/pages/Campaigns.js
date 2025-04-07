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
  styled,
  InputAdornment,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import { NumericFormat } from 'react-number-format';
import Countdown from 'react-countdown';

const CampaignCard = styled(motion(Card))(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const MotionContainer = motion(Container);

const Campaigns = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      title: 'Help Children Get Education',
      description: 'Support underprivileged children in getting quality education and a brighter future.',
      image: 'https://source.unsplash.com/random/800x600/?education',
      targetAmount: 500000,
      currentAmount: 250000,
      daysLeft: 15,
      status: 'active',
      category: 'Education',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      title: 'Clean Water Initiative',
      description: 'Provide clean drinking water to rural communities in need.',
      image: 'https://source.unsplash.com/random/800x600/?water',
      targetAmount: 750000,
      currentAmount: 450000,
      daysLeft: 20,
      status: 'active',
      category: 'Environment',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      title: 'Medical Aid for All',
      description: 'Support healthcare initiatives for those who cannot afford medical treatment.',
      image: 'https://source.unsplash.com/random/800x600/?medical',
      targetAmount: 1000000,
      currentAmount: 600000,
      daysLeft: 25,
      status: 'active',
      category: 'Healthcare',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    },
  ];

  const filteredCampaigns = campaigns
    .filter((campaign) => {
      const matchesSearch = campaign.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt - a.createdAt;
        case 'oldest':
          return a.createdAt - b.createdAt;
        case 'highest':
          return Number(b.currentAmount) - Number(a.currentAmount);
        case 'lowest':
          return Number(a.currentAmount) - Number(b.currentAmount);
        default:
          return 0;
      }
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <MotionContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ py: 8 }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          All Campaigns
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Discover and support meaningful causes from around the world
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SortIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="highest">Highest Amount</MenuItem>
              <MenuItem value="lowest">Lowest Amount</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <AnimatePresence>
        <Grid container spacing={4}>
          {filteredCampaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={4} key={campaign.id}>
              <CampaignCard
                variants={itemVariants}
                onClick={() => navigate(`/campaign/${campaign.id}`)}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={campaign.image}
                  alt={campaign.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {campaign.title}
                    </Typography>
                    <Chip
                      label={campaign.status}
                      color={campaign.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 2 }}
                  >
                    {campaign.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <StyledLinearProgress
                      variant="determinate"
                      value={(Number(campaign.currentAmount) / Number(campaign.targetAmount)) * 100}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Raised: ₹{campaign.currentAmount.toLocaleString()} of ₹{campaign.targetAmount.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Goal
                      </Typography>
                      <Typography variant="h6">
                        <NumericFormat
                          value={campaign.targetAmount}
                          suffix=" ETH"
                          decimalScale={2}
                        />
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Ends in:
                    </Typography>
                    <Countdown
                      date={campaign.endDate}
                      renderer={({ days, hours, minutes }) => (
                        <Typography variant="body2" color="primary">
                          {days}d {hours}h {minutes}m
                        </Typography>
                      )}
                    />
                  </Box>
                </CardContent>
              </CampaignCard>
            </Grid>
          ))}
        </Grid>
      </AnimatePresence>
    </MotionContainer>
  );
};

export default Campaigns; 