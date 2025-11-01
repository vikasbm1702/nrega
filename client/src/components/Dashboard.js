import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  TextField,
  Button
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import CompareIcon from '@mui/icons-material/Compare';
import InfoIcon from '@mui/icons-material/Info';
import { formatCurrency, formatNumber } from '../utils/formatters';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { state, district } = useParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [compareData, setCompareData] = useState([]);
  const [timeRange, setTimeRange] = useState('1y');
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  
  // Date range state for monthly trend (format: YYYY-MM)
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  

  const fetchDashboardData = useCallback(async () => {
    try {
      let url = `http://localhost:5001/api/districts/${state}/${district}?range=${timeRange}`;
      if (startMonth && endMonth) {
        url = `http://localhost:5001/api/districts/${state}/${district}?startMonth=${startMonth}&endMonth=${endMonth}`;
      }
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [state, district, timeRange, startMonth, endMonth]);

  const fetchComparisonData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/districts/${state}/compare/${district}`);
      const result = await response.json();
      setCompareData(result);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    }
  }, [state, district]);

  useEffect(() => {
    fetchDashboardData();
    fetchComparisonData();
  }, [fetchDashboardData, fetchComparisonData]);

  const handleShare = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleCloseShare = () => {
    setShareAnchorEl(null);
  };

  const handleApplyDateRange = () => {
    if (startMonth && endMonth) {
      setLoading(true);
      fetchDashboardData();
      setShowDatePicker(false);
    }
  };

  const handleResetDateRange = () => {
    setStartMonth('');
    setEndMonth('');
    setTimeRange('1y');
    setLoading(true);
    setShowDatePicker(false);
  };

  const handleDownload = async (format) => {
    try {
      const response = await fetch(`http://localhost:5001/api/districts/export/${state}/${district}?format=${format}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MGNREGA-${district}-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading data:', error);
      alert(`Failed to download ${format.toUpperCase()}: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {district} District Dashboard
        </Typography>
        <Box>
          <Tooltip title={t('share.tooltip')}>
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('download.tooltip')}>
            <IconButton onClick={() => handleDownload('pdf')}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          {/* Help Icon with Info Tooltip */}
          <Tooltip title={t('help.tooltip')}>
            <IconButton onClick={() => window.open('https://nrega.nic.in/help', '_blank')}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
          {/* Compare Districts */}
          <Tooltip title={t('compare.tooltip')}>
            <IconButton onClick={() => setTimeRange('1y')}>
              <CompareIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={shareAnchorEl}
          open={Boolean(shareAnchorEl)}
          onClose={handleCloseShare}
        >
          <MenuItem onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank')}>WhatsApp</MenuItem>
          <MenuItem onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>Facebook</MenuItem>
          <MenuItem onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            handleCloseShare();
          }}>Copy Link</MenuItem>
        </Menu>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'stats.totalWorkers', value: data?.totalWorkers, icon: '👥' },
          { title: 'stats.expenditure', value: formatCurrency(data?.totalExpenditure), icon: '💰' },
          { title: 'stats.workdays', value: formatNumber(data?.workdaysGenerated), icon: '📅' },
          { title: 'stats.wages', value: formatCurrency(data?.wagesPerDay), icon: '💸' }
        ].map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h3" sx={{ mb: 1 }}>{metric.icon}</Typography>
                <Typography variant="h6" component="div">
                  {t(metric.title)}
                </Typography>
                <Typography variant="h4" color="primary">
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Monthly Trend */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {t('trend.title')}
              </Typography>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                {showDatePicker ? 'Hide Range' : 'Set Date Range'}
              </Button>
            </Box>

            {showDatePicker && (
              <Box sx={{ display: 'flex', gap: 2, mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <TextField
                  type="month"
                  label="Start Month"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ max: new Date().toISOString().split('T')[0] }}
                  size="small"
                />
                <TextField
                  type="month"
                  label="End Month"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ max: new Date().toISOString().split('T')[0] }}
                  size="small"
                />
                <Button 
                  variant="contained" 
                  onClick={handleApplyDateRange}
                  disabled={!startMonth || !endMonth}
                >
                  Apply
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={handleResetDateRange}
                >
                  Reset
                </Button>
              </Box>
            )}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip />
                <Legend />
                <Line type="monotone" dataKey="workers" stroke="#8884d8" name={t('stats.totalWorkers')} />
                <Line type="monotone" dataKey="workdays" stroke="#82ca9d" name={t('stats.workdays')} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* District Comparison */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('compare.title')}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={compareData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <ChartTooltip />
                <Bar dataKey="workers" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Gender Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('gender.distribution')}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.genderDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data?.genderDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Project Categories */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('project.categories')}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.projectCategories}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data?.projectCategories?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;