import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const campaignApi = {
  // Get all campaigns
  getAllCampaigns: async () => {
    const response = await api.get('/campaigns');
    return response.data;
  },

  // Get single campaign
  getCampaign: async (id) => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  // Create campaign
  createCampaign: async (campaignData) => {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },

  // Update campaign
  updateCampaign: async (id, campaignData) => {
    const response = await api.patch(`/campaigns/${id}`, campaignData);
    return response.data;
  },

  // Delete campaign
  deleteCampaign: async (id) => {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },

  // Add donation to campaign
  addDonation: async (id, donationData) => {
    const response = await api.post(`/campaigns/${id}/donations`, donationData);
    return response.data;
  },
};

export default api; 