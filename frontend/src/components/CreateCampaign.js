import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { Button, TextField, Typography, Box, Alert } from '@mui/material';

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    endDate: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert target amount to Wei
      const targetAmountWei = ethers.utils.parseEther(formData.targetAmount);
      
      // Convert end date to Unix timestamp
      const endDateTimestamp = Math.floor(new Date(formData.endDate).getTime() / 1000);

      const response = await axios.post('http://localhost:8080/api/campaigns', {
        title: formData.title,
        description: formData.description,
        targetAmount: targetAmountWei.toString(),
        endDate: endDateTimestamp.toString(),
      });

      setSuccess('Campaign created successfully!');
      setFormData({
        title: '',
        description: '',
        targetAmount: '',
        endDate: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating campaign');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Campaign
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Campaign Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          fullWidth
          label="Target Amount (ETH)"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          margin="normal"
          type="number"
          required
        />
        <TextField
          fullWidth
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          margin="normal"
          type="datetime-local"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Campaign
        </Button>
      </form>
    </Box>
  );
};

export default CreateCampaign; 