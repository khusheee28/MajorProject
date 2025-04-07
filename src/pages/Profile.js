import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  styled,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import { NumericFormat } from 'react-number-format';
import Countdown from 'react-countdown';

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);
const MotionGrid = motion(Grid);
const MotionCard = motion(Card);

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userDonations, setUserDonations] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to view your profile');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setUserAddress(accounts[0]);

      // TODO: Replace with actual blockchain calls
      // Mock data for now
      setUserCampaigns([
        {
          id: 1,
          title: 'Save the Rainforest',
          description: 'Help protect endangered species and their habitats',
          image: 'https://source.unsplash.com/random/800x600/?rainforest',
          targetAmount: '100',
          currentAmount: '75',
          daysLeft: 15,
          status: 'active',
          category: 'Environment',
          endDate: Date.now() + 15 * 24 * 60 * 60 * 1000,
        },
        {
          id: 2,
          title: 'Clean Ocean Initiative',
          description: 'Join us in cleaning the oceans from plastic waste',
          image: 'https://source.unsplash.com/random/800x600/?ocean',
          targetAmount: '50',
          currentAmount: '35',
          daysLeft: 20,
          status: 'active',
          category: 'Environment',
          endDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
        },
      ]);

      setUserDonations([
        {
          campaignId: 3,
          campaignTitle: 'Education for All',
          amount: '5',
          timestamp: Date.now() - 3600000, // 1 hour ago
        },
        {
          campaignId: 4,
          campaignTitle: 'Healthcare Access',
          amount: '3',
          timestamp: Date.now() - 7200000, // 2 hours ago
        },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawFunds = async (campaignId) => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to withdraw funds');
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create withdrawal transaction
      const campaignContract = new ethers.Contract(
        process.env.REACT_APP_CAMPAIGN_CONTRACT_ADDRESS,
        process.env.REACT_APP_CAMPAIGN_ABI,
        signer
      );

      const tx = await campaignContract.withdrawFunds(campaignId);
      await tx.wait();
      fetchUserData();
    } catch (err) {
      setError(err.message);
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

  return (
    <MotionContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ py: 8 }}
    >
      <MotionPaper
        elevation={3}
        sx={{ p: 4, borderRadius: 2, mb: 4 }}
        variants={itemVariants}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" gutterBottom>
              Your Profile
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {userAddress}
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ mb: 4 }}
        >
          <Tab label="My Campaigns" />
          <Tab label="My Donations" />
        </Tabs>

        <AnimatePresence mode="wait">
          {activeTab === 0 ? (
            <MotionGrid
              key="campaigns"
              container
              spacing={4}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {userCampaigns.map((campaign) => (
                <MotionGrid item xs={12} sm={6} md={4} key={campaign.id}>
                  <MotionCard
                    variants={itemVariants}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={campaign.image}
                      alt={campaign.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {campaign.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          icon={<CategoryIcon />}
                          label={campaign.category}
                          color="primary"
                          size="small"
                        />
                        <Chip
                          icon={<AccessTimeIcon />}
                          label={`${campaign.daysLeft} days left`}
                          color="secondary"
                          size="small"
                        />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <StyledLinearProgress
                          variant="determinate"
                          value={(Number(campaign.currentAmount) / Number(campaign.targetAmount)) * 100}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Raised
                          </Typography>
                          <Typography variant="h6" color="primary">
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
                          <Typography variant="h6">
                            <NumericFormat
                              value={campaign.targetAmount}
                              suffix=" ETH"
                              decimalScale={2}
                            />
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
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
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleWithdrawFunds(campaign.id)}
                        disabled={campaign.status !== 'completed'}
                      >
                        Withdraw Funds
                      </Button>
                    </CardContent>
                  </MotionCard>
                </MotionGrid>
              ))}
            </MotionGrid>
          ) : (
            <MotionPaper
              key="donations"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <List>
                {userDonations.map((donation, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={donation.campaignTitle}
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
                    {index < userDonations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </MotionPaper>
          )}
        </AnimatePresence>
      </MotionPaper>
    </MotionContainer>
  );
};

export default Profile; 