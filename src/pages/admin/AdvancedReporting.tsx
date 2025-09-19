// Advanced reporting system with custom report builder and analytics

import { useState, useCallback, useMemo } from 'react';
import { 
  Calendar, 
  BarChart3, 
  FileText, 
  Download, 
  Plus,
  Settings,
  TrendingUp,
  DollarSign,
  Clock,
  Activity,
  Search,
  Grid,
  List,
  Bookmark,
  Play,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '../../utils';

// Types for the reporting system
interface Report {
  id: string;
  name: string;
  description: string;
  type: 'financial' | 'clinical' | 'operational' | 'custom';
  status: 'active' | 'scheduled' | 'paused' | 'draft';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'one-time';
  lastRun?: Date;
  nextRun?: Date;
  createdBy: string;
  createdAt: Date;
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv' | 'json';
  isBookmarked: boolean;
}

interface ReportMetric {
  id: string;
  name: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  trend: number[];
}



// Mock data for reports and analytics
const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Revenue Report',
    description: 'Comprehensive revenue analysis with treatment breakdowns',
    type: 'financial',
    status: 'active',
    frequency: 'monthly',
    lastRun: new Date('2024-01-15'),
    nextRun: new Date('2024-02-15'),
    createdBy: 'John Admin',
    createdAt: new Date('2024-01-01'),
    recipients: ['finance@clinic.com', 'admin@clinic.com'],
    format: 'pdf',
    isBookmarked: true,
  },
  {
    id: '2',
    name: 'Patient Satisfaction Survey',
    description: 'Weekly patient feedback and satisfaction metrics',
    type: 'clinical',
    status: 'active',
    frequency: 'weekly',
    lastRun: new Date('2024-01-20'),
    nextRun: new Date('2024-01-27'),
    createdBy: 'Dr. Smith',
    createdAt: new Date('2024-01-05'),
    recipients: ['quality@clinic.com'],
    format: 'excel',
    isBookmarked: false,
  },
  {
    id: '3',
    name: 'Appointment Analytics',
    description: 'Daily appointment scheduling and attendance patterns',
    type: 'operational',
    status: 'scheduled',
    frequency: 'daily',
    lastRun: new Date('2024-01-21'),
    nextRun: new Date('2024-01-22'),
    createdBy: 'Sarah Manager',
    createdAt: new Date('2024-01-10'),
    recipients: ['operations@clinic.com'],
    format: 'csv',
    isBookmarked: true,
  },
  {
    id: '4',
    name: 'Custom Treatment Analysis',
    description: 'Quarterly analysis of treatment success rates and outcomes',
    type: 'custom',
    status: 'draft',
    frequency: 'quarterly',
    createdBy: 'Dr. Johnson',
    createdAt: new Date('2024-01-18'),
    recipients: ['research@clinic.com'],
    format: 'json',
    isBookmarked: false,
  },
];

const mockMetrics: ReportMetric[] = [
  {
    id: 'revenue',
    name: 'Total Revenue',
    value: '$124,580',
    change: 12.5,
    changeType: 'increase',
    trend: [45000, 52000, 49000, 61000, 55000, 67000, 78000],
  },
  {
    id: 'patients',
    name: 'Active Patients',
    value: '2,847',
    change: 8.2,
    changeType: 'increase',
    trend: [2200, 2350, 2280, 2450, 2380, 2520, 2680],
  },
  {
    id: 'appointments',
    name: 'Monthly Appointments',
    value: '1,245',
    change: -3.1,
    changeType: 'decrease',
    trend: [980, 1120, 1080, 1200, 1150, 1280, 1245],
  },
  {
    id: 'satisfaction',
    name: 'Patient Satisfaction',
    value: '94.8%',
    change: 2.3,
    changeType: 'increase',
    trend: [91, 92, 93, 94, 93, 95, 95],
  },
];

export function AdvancedReporting() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports' | 'builder'>('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'financial' | 'clinical' | 'operational' | 'custom'>('all');


  // Filter reports based on search and type
  const filteredReports = useMemo(() => {
    return mockReports.filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           report.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || report.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const handleRunReport = useCallback((reportId: string) => {
    console.log('Running report:', reportId);
    // In a real app, this would trigger the report generation
  }, []);

  const handleScheduleReport = useCallback((reportId: string) => {
    console.log('Scheduling report:', reportId);
    // In a real app, this would open the scheduling modal
  }, []);

  const handleExportData = useCallback((format: 'pdf' | 'excel' | 'csv') => {
    console.log('Exporting data as:', format);
    // In a real app, this would trigger the export
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Advanced Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create, schedule, and analyze comprehensive reports across all clinic operations
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExportData('pdf')}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          <button
            onClick={() => setActiveTab('builder')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Report
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {[
            { id: 'dashboard' as const, label: 'Analytics Dashboard', icon: BarChart3 },
            { id: 'reports' as const, label: 'Reports Library', icon: FileText },
            { id: 'builder' as const, label: 'Report Builder', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <PatientFlowChart />
          </div>

          {/* Recent Reports */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Reports
              </h3>
              <button
                onClick={() => setActiveTab('reports')}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {mockReports.slice(0, 3).map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      report.status === 'active' && 'bg-green-500',
                      report.status === 'scheduled' && 'bg-blue-500',
                      report.status === 'paused' && 'bg-yellow-500',
                      report.status === 'draft' && 'bg-gray-500'
                    )} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {report.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {report.lastRun ? `Last run: ${report.lastRun.toLocaleDateString()}` : 'Never run'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRunReport(report.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Run
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="financial">Financial</option>
                <option value="clinical">Clinical</option>
                <option value="operational">Operational</option>
                <option value="custom">Custom</option>
              </select>
              
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 text-sm',
                    viewMode === 'grid'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 text-sm border-l border-gray-300 dark:border-gray-600',
                    viewMode === 'list'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Reports Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} onRun={handleRunReport} onSchedule={handleScheduleReport} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <ReportTable reports={filteredReports} onRun={handleRunReport} onSchedule={handleScheduleReport} />
            </div>
          )}
        </div>
      )}

      {activeTab === 'builder' && (
        <div className="space-y-6">
          <ReportBuilder />
        </div>
      )}
    </div>
  );
}

// Metric Card Component
function MetricCard({ metric }: { metric: ReportMetric }) {
  const ChangeIcon = metric.changeType === 'increase' ? TrendingUp : 
                    metric.changeType === 'decrease' ? TrendingUp : Activity;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {metric.name}
        </h3>
        <div className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
          metric.changeType === 'increase' && 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
          metric.changeType === 'decrease' && 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
          metric.changeType === 'neutral' && 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
        )}>
          <ChangeIcon className="w-3 h-3" />
          {Math.abs(metric.change)}%
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {metric.value}
        </p>
        
        {/* Mini trend chart */}
        <div className="w-20 h-8">
          <svg viewBox="0 0 80 32" className="w-full h-full">
            <polyline
              points={metric.trend.map((value, index) => 
                `${(index * 80) / (metric.trend.length - 1)},${32 - (value / Math.max(...metric.trend)) * 24}`
              ).join(' ')}
              fill="none"
              stroke={metric.changeType === 'increase' ? '#10b981' : 
                     metric.changeType === 'decrease' ? '#ef4444' : '#6b7280'}
              strokeWidth="2"
              className="opacity-60"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Revenue Chart Component
function RevenueChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Revenue Trends
        </h3>
        <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {[45000, 52000, 49000, 61000, 55000, 67000, 78000].map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-blue-500 rounded-t"
              style={{ height: `${(value / 78000) * 200}px` }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Patient Flow Chart Component
function PatientFlowChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Patient Flow
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">New Patients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">Returning</span>
          </div>
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {[
          { new: 25, returning: 45 },
          { new: 32, returning: 52 },
          { new: 28, returning: 48 },
          { new: 35, returning: 61 },
          { new: 30, returning: 55 },
          { new: 38, returning: 67 },
          { new: 42, returning: 78 },
        ].map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-1">
            <div
              className="w-full bg-green-500 rounded-t"
              style={{ height: `${(data.returning / 78) * 120}px` }}
            />
            <div
              className="w-full bg-blue-500"
              style={{ height: `${(data.new / 78) * 120}px` }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Report Card Component
function ReportCard({ report, onRun, onSchedule }: { 
  report: Report; 
  onRun: (id: string) => void;
  onSchedule: (id: string) => void;
}) {
  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'financial': return <DollarSign className="w-4 h-4 text-green-500" />;
      case 'clinical': return <Activity className="w-4 h-4 text-blue-500" />;
      case 'operational': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'custom': return <Settings className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getTypeIcon(report.type)}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {report.name}
            </h3>
            <span className={cn(
              'inline-block px-2 py-1 rounded-full text-xs font-medium mt-1',
              getStatusColor(report.status)
            )}>
              {report.status}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-1 text-gray-400 hover:text-yellow-500 transition-colors">
            <Bookmark className={cn('w-4 h-4', report.isBookmarked && 'text-yellow-500 fill-current')} />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {report.description}
      </p>
      
      <div className="space-y-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center justify-between">
          <span>Frequency:</span>
          <span className="capitalize">{report.frequency}</span>
        </div>
        {report.lastRun && (
          <div className="flex items-center justify-between">
            <span>Last Run:</span>
            <span>{report.lastRun.toLocaleDateString()}</span>
          </div>
        )}
        {report.nextRun && (
          <div className="flex items-center justify-between">
            <span>Next Run:</span>
            <span>{report.nextRun.toLocaleDateString()}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onRun(report.id)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Play className="w-3 h-3" />
          Run Now
        </button>
        
        <button
          onClick={() => onSchedule(report.id)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Calendar className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Report Table Component
function ReportTable({ reports, onRun, onSchedule }: { 
  reports: Report[]; 
  onRun: (id: string) => void;
  onSchedule: (id: string) => void;
}) {
  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Report Name
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Type
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Frequency
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Run
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Next Run
            </th>
            <th className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {reports.map((report) => (
            <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {report.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {report.description}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="capitalize text-sm text-gray-600 dark:text-gray-400">
                  {report.type}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={cn(
                  'inline-block px-2 py-1 rounded-full text-xs font-medium',
                  getStatusColor(report.status)
                )}>
                  {report.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="capitalize text-sm text-gray-600 dark:text-gray-400">
                  {report.frequency}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {report.lastRun ? report.lastRun.toLocaleDateString() : '-'}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {report.nextRun ? report.nextRun.toLocaleDateString() : '-'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onRun(report.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Run
                  </button>
                  <button
                    onClick={() => onSchedule(report.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <Calendar className="w-3 h-3" />
                    Schedule
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <MoreHorizontal className="w-3 h-3" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Report Builder Component
function ReportBuilder() {
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState<Report['type']>('custom');
  const [frequency, setFrequency] = useState<Report['frequency']>('monthly');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const availableMetrics = [
    { id: 'revenue', name: 'Total Revenue', category: 'financial' },
    { id: 'patients', name: 'Patient Count', category: 'clinical' },
    { id: 'appointments', name: 'Appointments', category: 'operational' },
    { id: 'treatments', name: 'Treatment Success Rate', category: 'clinical' },
    { id: 'satisfaction', name: 'Patient Satisfaction', category: 'clinical' },
    { id: 'costs', name: 'Operating Costs', category: 'financial' },
  ];

  const availableFilters = [
    { id: 'date_range', name: 'Date Range' },
    { id: 'patient_age', name: 'Patient Age Group' },
    { id: 'treatment_type', name: 'Treatment Type' },
    { id: 'doctor', name: 'Doctor/Provider' },
    { id: 'location', name: 'Location/Branch' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Create Custom Report
        </h2>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Name
              </label>
              <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Enter report name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as Report['type'])}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="financial">Financial</option>
                <option value="clinical">Clinical</option>
                <option value="operational">Operational</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          {/* Schedule Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Report['frequency'])}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="one-time">One Time</option>
              </select>
            </div>
          </div>

          {/* Metrics Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Metrics
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableMetrics.map((metric) => (
                <label
                  key={metric.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedMetrics.includes(metric.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMetrics([...selectedMetrics, metric.id]);
                      } else {
                        setSelectedMetrics(selectedMetrics.filter(id => id !== metric.id));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {metric.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {metric.category}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Filters Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Report Filters
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableFilters.map((filter) => (
                <label
                  key={filter.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFilters([...selectedFilters, filter.id]);
                      } else {
                        setSelectedFilters(selectedFilters.filter(id => id !== filter.id));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {filter.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Save as Draft
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              Create Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}