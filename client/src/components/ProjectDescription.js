import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Build as BuildIcon,
  Opacity as IrrigationIcon,
  Water as WaterIcon,
  Nature as AgricultureIcon,
  Engineering as EngineeringIcon,
  Public as EnvironmentIcon,
  MoreHoriz as MoreIcon
} from '@mui/icons-material';

const ProjectDescription = () => {
  const { t } = useTranslation();
  const [projectData, setProjectData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/districts/projects/descriptions/all');
        if (!response.ok) throw new Error('Failed to fetch project data');
        const data = await response.json();
        setProjectData(data.projects);
        setSummary(data.summary);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        // Fallback to static data if API fails
        setProjectData(getStaticProjects());
        setSummary(getStaticSummary());
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const getStaticProjects = () => [
    {
      id: 'ruralRoads',
      label: t('project.ruralRoads'),
      description: t('project.ruralRoads.desc'),
      focus: t('project.ruralRoads.focus'),
      impact: t('project.ruralRoads.impact'),
      totalExpenditure: 0,
      averageExpenditure: 0
    },
    {
      id: 'irrigation',
      label: t('project.irrigation'),
      description: t('project.irrigation.desc'),
      focus: t('project.irrigation.focus'),
      impact: t('project.irrigation.impact'),
      totalExpenditure: 0,
      averageExpenditure: 0
    },
    {
      id: 'waterStructures',
      label: t('project.waterStructures'),
      description: t('project.waterStructures.desc'),
      focus: t('project.waterStructures.focus'),
      impact: t('project.waterStructures.impact'),
      totalExpenditure: 0,
      averageExpenditure: 0
    },
    {
      id: 'agriculture',
      label: t('project.agriculture.label'),
      description: t('project.agriculture.desc'),
      focus: t('project.agriculture.focus'),
      impact: t('project.agriculture.impact'),
      percentOfExpenditure: 0
    },
    {
      id: 'categoryB',
      label: t('project.categoryB.label'),
      description: t('project.categoryB.desc'),
      focus: t('project.categoryB.focus'),
      impact: t('project.categoryB.impact'),
      averagePercent: 0
    },
    {
      id: 'nrm',
      label: t('project.nrm.label'),
      description: t('project.nrm.desc'),
      focus: t('project.nrm.focus'),
      impact: t('project.nrm.impact'),
      averagePercent: 0
    }
  ];

  const getStaticSummary = () => ({
    totalCompletedWorks: 0,
    totalOngoingWorks: 0,
    totalExpenditure: 0,
    recordsProcessed: 0
  });

  const projectIcons = {
    ruralRoads: BuildIcon,
    irrigation: IrrigationIcon,
    waterStructures: WaterIcon,
    agriculture: AgricultureIcon,
    categoryB: EngineeringIcon,
    nrm: EnvironmentIcon
  };

  const projectColors = {
    ruralRoads: '#1976d2',
    irrigation: '#00796b',
    waterStructures: '#0277bd',
    agriculture: '#558b2f',
    categoryB: '#f57c00',
    nrm: '#00897b'
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const ProjectCard = ({ project }) => {
    const IconComponent = projectIcons[project.id] || MoreIcon;
    const color = projectColors[project.id] || '#999';
    
    return (
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          border: `2px solid ${color}`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.15)`,
            transform: 'translateY(-4px)'
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Header with Icon and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box 
              sx={{ 
                p: 1, 
                bgcolor: color, 
                borderRadius: 2, 
                mr: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <IconComponent sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography variant="h6" component="div" sx={{ color: color, fontWeight: 'bold' }}>
              {project.label}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Description */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, color: '#555' }}>
              <strong>{t('action.download')}:</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.6 }}>
              {project.description}
            </Typography>
          </Box>

          {/* Focus Area */}
          <Box sx={{ mb: 2 }}>
            <Chip 
              label={project.focus} 
              variant="outlined" 
              size="small"
              sx={{ 
                borderColor: color, 
                color: color,
                width: '100%',
                height: 'auto',
                '& .MuiChip-label': {
                  whiteSpace: 'normal',
                  padding: '8px'
                }
              }}
            />
          </Box>

          {/* Statistics */}
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {project.totalExpenditure !== undefined && (
              <Chip
                label={`Total: ₹${formatNumber(project.totalExpenditure)}`}
                size="small"
                sx={{ bgcolor: `${color}20`, color: color }}
              />
            )}
            {project.averageExpenditure !== undefined && (
              <Chip
                label={`Avg: ₹${formatNumber(project.averageExpenditure)}`}
                size="small"
                sx={{ bgcolor: `${color}20`, color: color }}
              />
            )}
            {project.averagePercent !== undefined && (
              <Chip
                label={`Avg: ${project.averagePercent}%`}
                size="small"
                sx={{ bgcolor: `${color}20`, color: color }}
              />
            )}
            {project.percentOfExpenditure !== undefined && (
              <Chip
                label={`Share: ${project.percentOfExpenditure}%`}
                size="small"
                sx={{ bgcolor: `${color}20`, color: color }}
              />
            )}
          </Box>

          {/* Impact */}
          <Box sx={{ bgcolor: '#f5f5f5', p: 1.5, borderRadius: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: color }}>
              {t('stats.wages')}:
            </Typography>
            <Typography variant="body2" sx={{ color: '#333', mt: 0.5, lineHeight: 1.5 }}>
              {project.impact}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {t('message.noResults')} - {t('message.loading')} {t('project.description')}
        </Alert>
      )}

      {/* Title Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1, color: '#1976d2' }}>
          {t('project.description')}
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
          {t('project.sectorDiversity')}
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      {/* Major Projects Grid */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
          {t('project.majorProjects')}
        </Typography>
        <Grid container spacing={3}>
          {projectData && projectData.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Other Projects Section */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, bgcolor: '#f9f9f9', border: '2px dashed #ccc' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <MoreIcon sx={{ fontSize: 32, color: '#999', mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
              {t('project.otherDesc')}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
            {t('project.otherDetails')}
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1, borderLeft: '4px solid #999' }}>
            <Typography variant="body2" sx={{ color: '#555', fontStyle: 'italic' }}>
              💡 {t('message.success')}: {t('project.otherDetails')}
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Summary Stats */}
      {summary && (
        <Box sx={{ mt: 4, p: 3, bgcolor: '#e3f2fd', borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {formatNumber(summary.totalCompletedWorks)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Completed Works
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#00796b', fontWeight: 'bold' }}>
                  {formatNumber(summary.totalOngoingWorks)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Ongoing Works
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#558b2f', fontWeight: 'bold' }}>
                  ₹{formatNumber(summary.totalExpenditure)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Total Expenditure
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                  {summary.recordsProcessed}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Data Records
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProjectDescription;