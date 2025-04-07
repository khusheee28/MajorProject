import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Card, CardContent, CardMedia, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Countdown from 'react-countdown';
import { NumericFormat } from 'react-number-format';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { campaignService } from '../api/campaigns';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
  color: 'white',
  padding: theme.spacing(15, 0),
  marginBottom: theme.spacing(8),
  textAlign: 'center',
}));

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

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await campaignService.getAllCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError('Failed to fetch campaigns');
        console.error('Error fetching campaigns:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading campaigns...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <HeroSection>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography variant="h1" gutterBottom sx={{ color: '#fff' }}>
                  Make a Difference
                </Typography>
                <Typography variant="h5" paragraph sx={{ color: '#fff', opacity: 0.9 }}>
                  Join our community of changemakers and support meaningful causes through decentralized fundraising.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => navigate('/create-campaign')}
                  sx={{ 
                    mt: 2,
                    backgroundColor: '#fff',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Start a Campaign
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container sx={{ py: 8 }}>
        <Typography variant="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Featured Campaigns
        </Typography>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {campaigns.map((campaign) => (
              <Grid item key={campaign.id} xs={12} sm={6} md={4}>
                <motion.div variants={itemVariants}>
                  <CampaignCard onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={campaign.imageUrl || 'https://source.unsplash.com/random/800x600?charity'}
                      alt={campaign.title}
                    />
                    <CardContent>
                      <Typography variant="h5" gutterBottom color="primary">
                        {campaign.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {campaign.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <StyledLinearProgress
                          variant="determinate"
                          value={(campaign.currentAmount / campaign.targetAmount) * 100}
                        />
                        <Typography variant="body2" color="text.secondary" align="right">
                          {Math.round((campaign.currentAmount / campaign.targetAmount) * 100)}%
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          <NumericFormat
                            value={campaign.currentAmount}
                            prefix="$"
                            thousandSeparator=","
                            displayType="text"
                          />
                          {' / '}
                          <NumericFormat
                            value={campaign.targetAmount}
                            prefix="$"
                            thousandSeparator=","
                            displayType="text"
                          />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <Countdown
                            date={new Date(campaign.endDate)}
                            renderer={({ days, hours, minutes }) => (
                              `${days}d ${hours}h ${minutes}m`
                            )}
                          />
                        </Typography>
                      </Box>
                    </CardContent>
                  </CampaignCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home; 