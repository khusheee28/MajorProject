import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const campaignService = {
    // Get all campaigns
    getAllCampaigns: async () => {
        const response = await axios.get(`${API_URL}/campaigns`);
        return response.data;
    },

    // Get campaign by ID
    getCampaignById: async (id) => {
        const response = await axios.get(`${API_URL}/campaigns/${id}`);
        return response.data;
    },

    // Create new campaign
    createCampaign: async (campaignData) => {
        const response = await axios.post(`${API_URL}/campaigns`, campaignData);
        return response.data;
    },

    // Update campaign
    updateCampaign: async (id, campaignData) => {
        const response = await axios.put(`${API_URL}/campaigns/${id}`, campaignData);
        return response.data;
    },

    // Delete campaign
    deleteCampaign: async (id) => {
        const response = await axios.delete(`${API_URL}/campaigns/${id}`);
        return response.data;
    },

    // Test database connection
    testConnection: async () => {
        const response = await axios.post(`${API_URL}/campaigns/test`);
        return response.data;
    }
};