// Subscription & Billing Management System for SaaS Platform

import { useState, useMemo } from 'react';
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Download,
  Bell
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { subscriptions, subscriptionPlans, getClinicStats } from '../../data/clinics';
import { formatCurrency, formatDate } from '../../utils';
import type { Subscription } from '../../types';

type SubscriptionView = 'overview' | 'active' | 'trials' | 'expired' | 'plans';
type SubscriptionFilter = 'all' | 'active' | 'trial' | 'expired' | 'cancelled';

// Mock subscription metrics (in real app, this would come from API)
const subscriptionMetrics = {
  totalRevenue: 89750,
  monthlyRecurringRevenue: 15890,
  averageRevenuePerUser: 187,
  churnRate: 3.2,
  lifetimeValue: 2340,
  trialConversionRate: 68.5,
  totalSubscribers: 156,
  newSubscriptions: 12,
  cancelledSubscriptions: 4,
  upgrades: 8,
  downgrades: 2
};

export function SubscriptionManagement() {
  const [activeView, setActiveView] = useState<SubscriptionView>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<SubscriptionFilter>('all');

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => {
      const matchesSearch = sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sub.metadata?.billingEmail?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || sub.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  const stats = getClinicStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Subscription Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage subscriptions, billing, and revenue analytics
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Subscription
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Recurring Revenue"
          value={formatCurrency(subscriptionMetrics.monthlyRecurringRevenue)}
          subtitle={`+${subscriptionMetrics.newSubscriptions} new this month`}
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: 12.5, isPositive: true }}
          color="emerald"
        />
        <MetricCard
          title="Total Subscribers"
          value={subscriptionMetrics.totalSubscribers}
          subtitle={`${stats.activeSubs} active subscriptions`}
          icon={<Users className="w-6 h-6" />}
          trend={{ value: 8.2, isPositive: true }}
          color="blue"
        />
        <MetricCard
          title="Churn Rate"
          value={`${subscriptionMetrics.churnRate}%`}
          subtitle={`${subscriptionMetrics.cancelledSubscriptions} cancelled this month`}
          icon={<TrendingDown className="w-6 h-6" />}
          trend={{ value: 0.8, isPositive: false }}
          color="red"
        />
        <MetricCard
          title="Trial Conversion"
          value={`${subscriptionMetrics.trialConversionRate}%`}
          subtitle={`${stats.trialSubs} active trials`}
          icon={<TrendingUp className="w-6 h-6" />}
          trend={{ value: 5.3, isPositive: true }}
          color="purple"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'active', label: 'Active' },
            { id: 'trials', label: 'Trials' },
            { id: 'expired', label: 'Expired' },
            { id: 'plans', label: 'Plans' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveView(id as SubscriptionView)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <Input
            placeholder="Search subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="max-w-sm"
          />
          <Select
            value={filterStatus}
            onChange={(value) => setFilterStatus(value as SubscriptionFilter)}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'trial', label: 'Trial' },
              { value: 'expired', label: 'Expired' },
            ]}
          />
        </div>
      </div>

      {/* Content based on view */}
      {activeView === 'overview' && <SubscriptionOverview />}
      {activeView === 'active' && <SubscriptionList subscriptions={filteredSubscriptions.filter(s => s.status === 'active')} />}
      {activeView === 'trials' && <SubscriptionList subscriptions={filteredSubscriptions.filter(s => s.status === 'trial')} />}
      {activeView === 'expired' && <SubscriptionList subscriptions={filteredSubscriptions.filter(s => s.status === 'expired')} />}
      {activeView === 'plans' && <PlanManagement />}
    </div>
  );
}

// Subscription Overview Dashboard
function SubscriptionOverview() {
  return (
    <div className="space-y-6">
      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Trends
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(subscriptionMetrics.monthlyRecurringRevenue)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(subscriptionMetrics.totalRevenue)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Average Per User</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(subscriptionMetrics.averageRevenuePerUser)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Customer LTV</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(subscriptionMetrics.lifetimeValue)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Subscription Activity
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">New Subscriptions</span>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                  +{subscriptionMetrics.newSubscriptions}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Upgrades</span>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  +{subscriptionMetrics.upgrades}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Cancellations</span>
              <div className="flex items-center">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                  -{subscriptionMetrics.cancelledSubscriptions}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Downgrades</span>
              <div className="flex items-center">
                <TrendingDown className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                  -{subscriptionMetrics.downgrades}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Subscriptions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Subscriptions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Next Billing
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {subscriptions.slice(0, 5).map((subscription) => {
                const plan = subscriptionPlans.find(p => p.id === subscription.planId);
                return (
                  <tr key={subscription.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {subscription.id}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {subscription.metadata?.billingEmail || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {plan?.name || 'Unknown Plan'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={subscription.status} />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(plan?.price || 0)}/mo
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatDate(subscription.currentPeriodEnd)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Subscription List Component
function SubscriptionList({ subscriptions: subs }: { subscriptions: Subscription[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Subscription Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Plan & Billing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status & Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {subs.map((subscription) => {
              const plan = subscriptionPlans.find(p => p.id === subscription.planId);
              const isTrialEnding = subscription.trialEndsAt && 
                new Date(subscription.trialEndsAt).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000; // 7 days
              
              return (
                <tr key={subscription.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {subscription.id}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Clinic: {subscription.clinicId}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {subscription.metadata?.billingEmail || 'No billing email'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {plan?.name || 'Unknown Plan'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(plan?.price || 0)} / {plan?.interval || 'month'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <StatusBadge status={subscription.status} />
                      {subscription.trialEndsAt && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          Trial ends: {formatDate(subscription.trialEndsAt)}
                        </div>
                      )}
                      {isTrialEnding && (
                        <div className="flex items-center text-xs text-orange-600 dark:text-orange-400">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Trial ending soon
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {subscription.metadata?.paymentMethod || 'No payment method'}
                      </div>
                      {subscription.metadata?.lastPaymentDate && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Last: {formatDate(new Date(subscription.metadata.lastPaymentDate))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Edit Subscription">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {subscription.status === 'trial' && isTrialEnding && (
                        <Button variant="ghost" size="sm" title="Send Reminder">
                          <Bell className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" title="More Actions">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Plan Management Component
function PlanManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Subscription Plans
        </h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => {
          const planSubscriptions = subscriptions.filter(sub => sub.planId === plan.id);
          const activeCount = planSubscriptions.filter(sub => sub.status === 'active').length;
          const revenue = activeCount * plan.price;
          
          return (
            <div
              key={plan.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all ${
                plan.isPopular
                  ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-100 dark:ring-blue-900'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.isPopular && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium rounded-t-lg">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(plan.price)}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      /{plan.interval}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {plan.features.length > 5 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      +{plan.features.length - 5} more features
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Active Subscriptions</span>
                    <span className="font-medium text-gray-900 dark:text-white">{activeCount}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600 dark:text-gray-400">Monthly Revenue</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(revenue)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Utility Components
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  color: 'emerald' | 'blue' | 'red' | 'purple' | 'indigo' | 'orange';
}

function MetricCard({ title, value, subtitle, icon, trend, color }: MetricCardProps) {
  const colorClasses = {
    emerald: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400',
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    red: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
    indigo: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${
            trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    active: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-800 dark:text-green-200',
      icon: CheckCircle,
      label: 'Active'
    },
    trial: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-800 dark:text-blue-200',
      icon: Clock,
      label: 'Trial'
    },
    expired: {
      bg: 'bg-red-100 dark:bg-red-900',
      text: 'text-red-800 dark:text-red-200',
      icon: XCircle,
      label: 'Expired'
    },
    cancelled: {
      bg: 'bg-gray-100 dark:bg-gray-900',
      text: 'text-gray-800 dark:text-gray-200',
      icon: XCircle,
      label: 'Cancelled'
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.expired;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}