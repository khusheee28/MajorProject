import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Countdown from 'react-countdown';
import { NumericFormat } from 'react-number-format';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  LinearProgress,
  styled,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  padding: theme.spacing(15, 0),
  position: 'relative',
  overflow: 'hidden',
  color: '#fff',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.svg")',
    opacity: 0.1,
    animation: 'float 20s linear infinite',
  },
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0) translateX(0)',
    },
    '50%': {
      transform: 'translateY(-20px) translateX(20px)',
    },
    '100%': {
      transform: 'translateY(0) translateX(0)',
    },
  },
}));

const CampaignCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  background: '#fff',
  border: `1px solid ${theme.palette.primary.light}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.primary.light,
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const featuredCampaigns = [
  {
    id: 1,
    title: 'Help Children Get Education',
    description: 'Support underprivileged children in getting quality education and a brighter future.',
    image: 'https://source.unsplash.com/random/800x600/?education',
    targetAmount: 500000,
    currentAmount: 250000,
    daysLeft: 15,
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
    endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const countdownRenderer = ({ days, hours, minutes }) => (
    <Typography variant="body2" color="text.secondary">
      {days}d {hours}h {minutes}m left
    </Typography>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <HeroSection>
        <Container maxWidth="lg">
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

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <motion.div
          ref={ref}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Typography variant="h2" gutterBottom align="center" color="primary">
            Featured Campaigns
          </Typography>
          <Typography variant="h5" paragraph align="center" color="text.secondary" sx={{ mb: 6 }}>
            Support these impactful initiatives and help make the world a better place.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {featuredCampaigns.map((campaign) => (
            <Grid item xs={12} md={4} key={campaign.id}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CampaignCard onClick={() => navigate(`/campaign/${campaign.id}`)}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={campaign.image}
                    alt={campaign.title}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom color="primary">
                      {campaign.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {campaign.description}
                    </Typography>
                    <Box sx={{ mt: 2, mb: 1 }}>
                      <StyledLinearProgress
                        variant="determinate"
                        value={(campaign.currentAmount / campaign.targetAmount) * 100}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Raised: ₹{campaign.currentAmount.toLocaleString()} of ₹{campaign.targetAmount.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Countdown
                        date={campaign.endDate}
                        renderer={countdownRenderer}
                      />
                    </Box>
                  </CardContent>
                </CampaignCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
};

export default Home; 