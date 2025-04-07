import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Alert,
  CircularProgress,
  styled,
  InputAdornment,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useBlockchain, setUseBlockchain] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    duration: '',
    category: '',
    imageUrl: '',
  });

  const categories = [
    'Environment',
    'Education',
    'Healthcare',
    'Technology',
    'Arts',
    'Social',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (useBlockchain) {
        // Blockchain campaign creation
        if (!window.ethereum) {
          throw new Error('Please install MetaMask to create a blockchain campaign');
        }

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const targetAmountWei = ethers.utils.parseEther(formData.targetAmount);

        const campaignContract = new ethers.Contract(
          process.env.REACT_APP_CAMPAIGN_CONTRACT_ADDRESS,
          process.env.REACT_APP_CAMPAIGN_ABI,
          signer
        );

        const tx = await campaignContract.createCampaign(
          formData.title,
          formData.description,
          targetAmountWei,
          formData.duration,
          formData.category,
          formData.imageUrl
        );

        await tx.wait();
      } else {
        // Non-blockchain campaign creation
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful creation
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      navigate('/campaigns');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
      <MotionPaper
        variants={itemVariants}
        elevation={3}
        sx={{ p: 4, borderRadius: 2 }}
      >
        <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
          Create New Campaign
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Switch
                checked={useBlockchain}
                onChange={(e) => setUseBlockchain(e.target.checked)}
                color="primary"
              />
            }
            label="Create on Blockchain (requires MetaMask)"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {useBlockchain 
              ? "Your campaign will be created on the blockchain for decentralized fundraising"
              : "Your campaign will be created on our platform for traditional fundraising"}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Campaign Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Target Amount (₹)"
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Duration (days)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  label="Category"
                  startAdornment={
                    <InputAdornment position="start">
                      <CategoryIcon />
                    </InputAdornment>
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/campaigns')}
                  disabled={loading}
                  sx={{ px: 4 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ px: 4 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Create Campaign'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </MotionPaper>
    </MotionContainer>
  );
};

export default CreateCampaign;