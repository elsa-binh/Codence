import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  TrendingUp,
  CheckCircle,
} from '@mui/icons-material';

const statsCards = [
  {
    title: 'Total Projects',
    value: '12',
    icon: '📊',
    trend: '+2 this month',
    color: '#1976d2',
  },
  {
    title: 'Active Tasks',
    value: '28',
    icon: '✅',
    trend: '+5 this week',
    color: '#2e7d32',
  },
  {
    title: 'Team Members',
    value: '8',
    icon: '👥',
    trend: '+1 new',
    color: '#f57c00',
  },
  {
    title: 'Completion Rate',
    value: '87%',
    icon: '🎯',
    trend: '+12% up',
    color: '#c2185b',
  },
];

const recentProjects = [
  { id: 1, name: 'Mobile App Redesign', status: 'In Progress', progress: 65, dueDate: '2026-07-15' },
  { id: 2, name: 'API Integration', status: 'Completed', progress: 100, dueDate: '2026-06-20' },
  { id: 3, name: 'Dashboard UI Update', status: 'In Progress', progress: 45, dueDate: '2026-08-01' },
  { id: 4, name: 'Database Optimization', status: 'Pending', progress: 0, dueDate: '2026-07-30' },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  const getInitials = (name) => {
    return (name || 'User')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* AppBar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DashboardIcon sx={{ fontSize: 28, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Codence
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<SettingsIcon />}
              color="inherit"
              sx={{ textTransform: 'none' }}
            >
              Settings
            </Button>

            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                cursor: 'pointer',
                fontWeight: 600,
              }}
              onClick={handleMenuOpen}
            >
              {getInitials(user.name)}
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem disabled>
                <Typography variant="body2">{user.email}</Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Preferences</MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Welcome back, {user.name || 'User'}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your projects today.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', boxShadow: 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 500 }}>
                        {stat.trend}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 28 }}>{stat.icon}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Projects Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Recent Projects
          </Typography>

          <Grid container spacing={3}>
            {recentProjects.map((project) => (
              <Grid item xs={12} md={6} key={project.id}>
                <Card sx={{ boxShadow: 1, height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                        {project.name}
                      </Typography>
                      <Chip
                        label={project.status}
                        color={getStatusColor(project.status)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {project.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{ height: 6, borderRadius: 1 }}
                      />
                    </Box>

                    <Typography variant="caption" color="text.secondary">
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View Details</Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
