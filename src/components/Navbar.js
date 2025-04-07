import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 12px rgba(255, 105, 180, 0.1)',
  borderBottom: `1px solid ${theme.palette.primary.light}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2rem',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  fontFamily: '"Dancing Script", cursive',
  '&:hover': {
    opacity: 0.8,
    transform: 'scale(1.05)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: theme.spacing(0, 1),
  fontFamily: '"Dancing Script", cursive',
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
    color: theme.palette.primary.main,
  },
}));

const WalletButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  fontFamily: '"Dancing Script", cursive',
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(255, 105, 180, 0.2)',
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [walletAddress, setWalletAddress] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [showMetaMaskDialog, setShowMetaMaskDialog] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setShowMetaMaskDialog(true);
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
    setShowMetaMaskDialog(false);
  };

  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <NavButton
        startIcon={<HomeIcon />}
        onClick={() => handleNavigation('/')}
      >
        Home
      </NavButton>
      <NavButton
        startIcon={<CampaignIcon />}
        onClick={() => handleNavigation('/campaigns')}
      >
        Campaigns
      </NavButton>
      <NavButton
        startIcon={<AddIcon />}
        onClick={() => handleNavigation('/create-campaign')}
      >
        Create Campaign
      </NavButton>
      <NavButton
        startIcon={<PersonIcon />}
        onClick={() => handleNavigation('/profile')}
      >
        Profile
      </NavButton>
      <WalletButton
        startIcon={<AccountBalanceWalletIcon />}
        onClick={connectWallet}
        variant="contained"
      >
        {walletAddress
          ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : 'Connect Wallet'}
      </WalletButton>
    </Box>
  );

  const renderMobileNav = () => (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigation('/')}>
          <HomeIcon sx={{ mr: 1 }} /> Home
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/campaigns')}>
          <CampaignIcon sx={{ mr: 1 }} /> Campaigns
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/create-campaign')}>
          <AddIcon sx={{ mr: 1 }} /> Create Campaign
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/profile')}>
          <PersonIcon sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem onClick={connectWallet}>
          <AccountBalanceWalletIcon sx={{ mr: 1 }} />
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : 'Connect Wallet'}
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <Logo onClick={() => handleNavigation('/')}>
          UmeedFund
        </Logo>
        {isMobile ? renderMobileNav() : renderDesktopNav()}
      </StyledToolbar>

      <Dialog
        open={showMetaMaskDialog}
        onClose={() => setShowMetaMaskDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(255, 105, 180, 0.1)',
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: '"Dancing Script", cursive' }}>
          MetaMask Required
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph sx={{ fontFamily: '"Dancing Script", cursive' }}>
            To connect your wallet, you need to have MetaMask installed in your browser. MetaMask is a cryptocurrency wallet that allows you to interact with blockchain applications.
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <OpenInNewIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText
                primary="Install MetaMask"
                secondary="Visit the official MetaMask website to install the extension"
                primaryTypographyProps={{ fontFamily: '"Dancing Script", cursive' }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <OpenInNewIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText
                primary="Create a Wallet"
                secondary="Follow the setup process to create your MetaMask wallet"
                primaryTypographyProps={{ fontFamily: '"Dancing Script", cursive' }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <OpenInNewIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText
                primary="Connect to Network"
                secondary="Make sure you're connected to the correct network in MetaMask"
                primaryTypographyProps={{ fontFamily: '"Dancing Script", cursive' }}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowMetaMaskDialog(false)}
            sx={{ fontFamily: '"Dancing Script", cursive' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleInstallMetaMask}
            startIcon={<OpenInNewIcon />}
            sx={{ 
              fontFamily: '"Dancing Script", cursive',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Install MetaMask
          </Button>
        </DialogActions>
      </Dialog>
    </StyledAppBar>
  );
};

export default Navbar; 