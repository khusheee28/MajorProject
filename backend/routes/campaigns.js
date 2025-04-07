const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Campaign, Donation } = require('../models/Campaign');
const sequelize = require('../config/database');

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: Donation,
        attributes: ['amount', 'donor', 'date']
      }]
    });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single campaign
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id, {
      include: [{
        model: Donation,
        attributes: ['amount', 'donor', 'date']
      }]
    });
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create campaign
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('targetAmount').isNumeric().withMessage('Target amount must be a number'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
  body('category').isIn(['Environment', 'Education', 'Healthcare', 'Technology', 'Arts', 'Social', 'Other']).withMessage('Invalid category'),
  body('imageUrl').isURL().withMessage('Invalid image URL'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const campaign = await Campaign.create({
      ...req.body,
      endDate: new Date(Date.now() + req.body.duration * 24 * 60 * 60 * 1000),
    });
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update campaign
router.patch('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    await campaign.update(req.body);
    res.json(campaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete campaign
router.delete('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    await campaign.destroy();
    res.json({ message: 'Campaign deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add donation to campaign
router.post('/:id/donations', [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('donor').trim().notEmpty().withMessage('Donor information is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    if (campaign.status !== 'active') {
      return res.status(400).json({ message: 'Campaign is not active' });
    }

    const donation = await Donation.create({
      campaignId: campaign.id,
      amount: req.body.amount,
      donor: req.body.donor,
    });

    await campaign.update({
      currentAmount: sequelize.literal(`currentAmount + ${req.body.amount}`)
    });

    res.json(campaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 