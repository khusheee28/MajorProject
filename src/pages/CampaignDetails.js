import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  styled,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import { NumericFormat } from 'react-number-format';
import Countdown from 'react-countdown';

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);
const MotionGrid = motion(Grid);

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const CampaignDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);
  const [error, setError] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

  const fetchCampaignDetails = async () => {
    try {
      // TODO: Replace with actual blockchain call
      // Mock data for now
      setCampaign({
        id: 1,
        title: 'Save the Rainforest',
        description:
          'Help protect endangered species and their habitats in the Amazon rainforest. Your contribution will go towards conservation efforts and sustainable development.',
        image: 'https://source.unsplash.com/random/1200x600/?rainforest',
        targetAmount: '100',
        currentAmount: '75',
        daysLeft: 15,
        status: 'active',
        category: 'Environment',
        creator: '0x1234...5678',
        endDate: Date.now() + 15 * 24 * 60 * 60 * 1000,
        recentDonations: [
          {
            donor: '0xabcd...efgh',
            amount: '5',
            timestamp: Date.now() - 3600000, // 1 hour ago
          },
          {
            donor: '0xijkl...mnop',
            amount: '2',
            timestamp: Date.now() - 7200000, // 2 hours ago
          },
        ],
      });
    } catch (err) {
      setError('Failed to fetch campaign details');
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setDonating(true);
    setError('');

    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to make a donation');
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Convert donation amount to Wei
      const donationAmountWei = ethers.utils.parseEther(donationAmount);

      // Create donation transaction
      const campaignContract = new ethers.Contract(
        process.env.REACT_APP_CAMPAIGN_CONTRACT_ADDRESS,
        process.env.REACT_APP_CAMPAIGN_ABI,
        signer
      );

      const tx = await campaignContract.donate(id, {
        value: donationAmountWei,
      });

      await tx.wait();
      setDonationAmount('');
      fetchCampaignDetails();
    } catch (err) {
      setError(err.message);
    } finally {
      setDonating(false);
    }
  };

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

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!campaign) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">Campaign not found</Alert>
      </Container>
    );
  }

  return (
    <MotionContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ py: 8 }}
    >
      <MotionGrid container spacing={4}>
        <MotionGrid item xs={12} md={8} variants={itemVariants}>
          <MotionPaper
            elevation={3}
            sx={{ p: 4, borderRadius: 2, mb: 4 }}
          >
            <Box
              component="img"
              src={campaign.image}
              alt={campaign.title}
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: 2,
                mb: 4,
              }}
            />
            <Typography variant="h3" gutterBottom>
              {campaign.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Chip
                icon={<CategoryIcon />}
                label={campaign.category}
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<AccessTimeIcon />}
                label={`${campaign.daysLeft} days left`}
                color="secondary"
                variant="outlined"
              />
            </Box>
            <Typography variant="body1" paragraph>
              {campaign.description}
            </Typography>
          </MotionPaper>

          <MotionPaper
            elevation={3}
            sx={{ p: 4, borderRadius: 2 }}
            variants={itemVariants}
          >
            <Typography variant="h5" gutterBottom>
              Recent Donations
            </Typography>
            <List>
              {campaign.recentDonations.map((donation, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon />
                          <Typography variant="body1">
                            {donation.donor}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccountBalanceWalletIcon fontSize="small" />
                          <Typography variant="body2" color="primary">
                            <NumericFormat
                              value={donation.amount}
                              suffix=" ETH"
                              decimalScale={2}
                            />
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < campaign.recentDonations.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </MotionPaper>
        </MotionGrid>

        <MotionGrid item xs={12} md={4} variants={itemVariants}>
          <MotionPaper
            elevation={3}
            sx={{ p: 4, borderRadius: 2 }}
          >
            <Typography variant="h5" gutterBottom>
              Campaign Progress
            </Typography>
            <Box sx={{ mb: 3 }}>
              <StyledLinearProgress
                variant="determinate"
                value={(Number(campaign.currentAmount) / Number(campaign.targetAmount)) * 100}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Raised
                </Typography>
                <Typography variant="h5" color="primary">
                  <NumericFormat
                    value={campaign.currentAmount}
                    suffix=" ETH"
                    decimalScale={2}
                  />
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Goal
                </Typography>
                <Typography variant="h5">
                  <NumericFormat
                    value={campaign.targetAmount}
                    suffix=" ETH"
                    decimalScale={2}
                  />
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Time Remaining
              </Typography>
              <Countdown
                date={campaign.endDate}
                renderer={({ days, hours, minutes }) => (
                  <Typography variant="h6" color="primary">
                    {days}d {hours}h {minutes}m
                  </Typography>
                )}
              />
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleDonate}>
              <StyledTextField
                fullWidth
                label="Donation Amount (₹)"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                required
                disabled={donating || campaign.status !== 'active'}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={donating || campaign.status !== 'active'}
              >
                {donating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Donate Now'
                )}
              </Button>
            </form>
          </MotionPaper>
        </MotionGrid>
      </MotionGrid>
    </MotionContainer>
  );
};

export default CampaignDetails; 