// Dashboard page component for all admin panels

interface DashboardStats {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: React.ReactNode;
}

interface DashboardProps {
  title: string;
  stats: DashboardStats[];
  children?: React.ReactNode;
}

export function Dashboard({ title, stats, children }: DashboardProps) {
  const getChangeColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      case 'neutral':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening at your clinic.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                {stat.change && (
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-sm font-medium ${getChangeColor(
                        stat.change.trend
                      )}`}
                    >
                      {stat.change.trend === 'up' && '↗'}
                      {stat.change.trend === 'down' && '↘'}
                      {stat.change.trend === 'neutral' && '→'}
                      {stat.change.value}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-blue-600 dark:text-blue-400 w-8 h-8">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Content */}
      {children && (
        <div className="space-y-6">
          {children}
        </div>
      )}
    </div>
  );
}

// Super Admin Dashboard with SaaS metrics
export function SuperAdminDashboard() {
  const stats: DashboardStats[] = [
    {
      title: 'Total Clinics',
      value: '247',
      change: {
        value: '+12% this month',
        trend: 'up',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Active Subscriptions',
      value: '234',
      change: {
        value: '+5.2% this month',
        trend: 'up',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Monthly Revenue',
      value: '$47,283',
      change: {
        value: '+18.2% vs last month',
        trend: 'up',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Support Tickets',
      value: '23',
      change: {
        value: '-8.5% this week',
        trend: 'down',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <Dashboard title="Super Admin Dashboard" stats={stats}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Signups */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Clinic Signups
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Bright Smiles Dental</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">New York, NY</p>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">Premium Plan</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Family Dental Care</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Los Angeles, CA</p>
              </div>
              <span className="text-sm text-blue-600 dark:text-blue-400">Basic Plan</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Elite Orthodontics</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Chicago, IL</p>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">Premium Plan</span>
            </div>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Revenue Trend
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Chart placeholder - integrate with charting library</p>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

// Clinic Admin Dashboard with practice metrics
export function ClinicAdminDashboard() {
  const stats: DashboardStats[] = [
    {
      title: "Today's Appointments",
      value: '18',
      change: {
        value: '2 more than yesterday',
        trend: 'up',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Total Patients',
      value: '1,247',
      change: {
        value: '+24 this month',
        trend: 'up',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Monthly Revenue',
      value: '$12,847',
      change: {
        value: '+15.3% vs last month',
        trend: 'up',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Pending Treatments',
      value: '7',
      change: {
        value: '3 urgent cases',
        trend: 'neutral',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <Dashboard title="Clinic Dashboard" stats={stats}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Today's Schedule
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-l-4 border-blue-500 pl-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">John Smith - Cleaning</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">9:00 AM - Dr. Johnson</p>
              </div>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                In Progress
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-l-4 border-green-500 pl-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Sarah Wilson - Filling</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">10:30 AM - Dr. Davis</p>
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                Scheduled
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-l-4 border-orange-500 pl-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Mike Chen - Consultation</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2:00 PM - Dr. Johnson</p>
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                Scheduled
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
              <div className="text-blue-600 dark:text-blue-400 w-6 h-6 mb-2">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">New Patient</p>
            </button>
            <button className="p-3 text-left bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
              <div className="text-green-600 dark:text-green-400 w-6 h-6 mb-2">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Schedule</p>
            </button>
            <button className="p-3 text-left bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
              <div className="text-purple-600 dark:text-purple-400 w-6 h-6 mb-2">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">New Invoice</p>
            </button>
            <button className="p-3 text-left bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors">
              <div className="text-orange-600 dark:text-orange-400 w-6 h-6 mb-2">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Reports</p>
            </button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

// Doctor Dashboard with doctor-specific metrics
export function DoctorDashboard() {
  const stats: DashboardStats[] = [
    {
      title: "Today's Appointments",
      value: '12',
      change: {
        value: '1 more than yesterday',
        trend: 'up',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'My Patients',
      value: '342',
      change: {
        value: '+8 this month',
        trend: 'up',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Treatments This Month',
      value: '89',
      change: {
        value: '+12.5% vs last month',
        trend: 'up',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Follow-up Required',
      value: '5',
      change: {
        value: '2 urgent cases',
        trend: 'neutral',
      },
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <Dashboard title="Doctor Dashboard" stats={stats}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            My Schedule Today
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-l-4 border-blue-500 pl-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Emma Thompson - Root Canal</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">9:00 AM - 10:00 AM</p>
              </div>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                In Progress
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-l-4 border-green-500 pl-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">David Miller - Check-up</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">10:30 AM - 11:00 AM</p>
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                Next
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-l-4 border-orange-500 pl-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Lisa Anderson - Crown Fitting</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2:00 PM - 3:00 PM</p>
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                Scheduled
              </span>
            </div>
          </div>
        </div>

        {/* Recent Treatments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Treatments
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">John Parker - Filling</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Yesterday, 3:00 PM</p>
              </div>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                Completed
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Maria Garcia - Extraction</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monday, 1:00 PM</p>
              </div>
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                Follow-up Needed
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Robert Kim - Cleaning</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Friday, 10:00 AM</p>
              </div>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}