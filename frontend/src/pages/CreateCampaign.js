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
} from '@mui/material';
import { ethers } from 'ethers';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    duration: '30',
    category: 'Environment',
    image: '',
  });

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
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to create a campaign');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Create campaign on blockchain
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

      // Convert target amount to Wei
      const targetAmountWei = ethers.utils.parseEther(formData.targetAmount);

      // Create campaign transaction
      const tx = await contract.createCampaign(
        formData.title,
        formData.description,
        targetAmountWei,
        formData.duration
      );

      // Wait for transaction to be mined
      await tx.wait();

      // Navigate to campaign details page
      navigate('/campaigns');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Campaign
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Campaign Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Target Amount (ETH)"
                name="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={handleChange}
                InputProps={{
                  inputProps: { min: 0, step: 0.01 },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Duration (days)</InputLabel>
                <Select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  label="Duration (days)"
                >
                  <MenuItem value="7">7 days</MenuItem>
                  <MenuItem value="15">15 days</MenuItem>
                  <MenuItem value="30">30 days</MenuItem>
                  <MenuItem value="60">60 days</MenuItem>
                  <MenuItem value="90">90 days</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="Environment">Environment</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Social">Social</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Campaign Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/campaigns')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  Create Campaign
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateCampaign; 