// Real-Time Notifications System with WebSocket Simulation

import { useState, useEffect, useMemo } from 'react';
import { 
  Bell,
  BellRing,
  Check,
  Clock,
  AlertTriangle,
  CheckCircle,
  Mail,
  MessageSquare,
  Calendar,
  CreditCard,
  Settings,
  Search,
  Eye,
  Trash2,
  Archive,
  RotateCcw
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { formatRelativeTime } from '../../utils';
import type { Notification, NotificationPreferences } from '../../types';

type NotificationView = 'all' | 'unread' | 'archived' | 'settings';
type NotificationFilter = 'all' | 'appointment' | 'payment' | 'system' | 'reminder';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Payment Received',
    message: 'Payment of $150.00 received from John Smith for appointment #APT-2024-001',
    type: 'payment',
    priority: 'medium',
    isRead: false,
    recipientId: 'user-001',
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    metadata: {
      appointmentId: 'APT-2024-001',
      patientId: 'patient-001',
      amount: 150.00,
      paymentMethod: 'credit_card'
    }
  },
  {
    id: 'notif-002',
    title: 'Appointment Reminder',
    message: 'Reminder: Sarah Johnson has an appointment tomorrow at 2:00 PM',
    type: 'reminder',
    priority: 'high',
    isRead: false,
    recipientId: 'user-001',
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    metadata: {
      appointmentId: 'APT-2024-002',
      patientId: 'patient-002',
      scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // tomorrow
    }
  },
  {
    id: 'notif-003',
    title: 'New Appointment Request',
    message: 'Michael Davis has requested an appointment for teeth cleaning',
    type: 'appointment',
    priority: 'medium',
    isRead: true,
    recipientId: 'user-001',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    metadata: {
      patientId: 'patient-003',
      serviceType: 'cleaning',
      preferredDate: '2025-01-25'
    }
  },
  {
    id: 'notif-004',
    title: 'System Maintenance',
    message: 'Scheduled system maintenance will occur tonight from 12:00 AM to 2:00 AM EST',
    type: 'system',
    priority: 'low',
    isRead: false,
    recipientId: 'user-001',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    metadata: {
      maintenanceWindow: {
        start: '2025-01-20T05:00:00Z',
        end: '2025-01-20T07:00:00Z'
      }
    }
  },
  {
    id: 'notif-005',
    title: 'Failed Payment',
    message: 'Payment failed for Emma Wilson. Credit card was declined.',
    type: 'payment',
    priority: 'urgent',
    isRead: false,
    recipientId: 'user-001',
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    metadata: {
      appointmentId: 'APT-2024-003',
      patientId: 'patient-004',
      amount: 275.00,
      errorCode: 'card_declined'
    }
  },
  {
    id: 'notif-006',
    title: 'Appointment Cancelled',
    message: 'David Brown has cancelled his appointment scheduled for tomorrow at 10:00 AM',
    type: 'appointment',
    priority: 'medium',
    isRead: true,
    recipientId: 'user-001',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    metadata: {
      appointmentId: 'APT-2024-004',
      patientId: 'patient-005',
      reason: 'emergency'
    }
  }
];

// Mock notification preferences
const mockPreferences: NotificationPreferences = {
  userId: 'user-001',
  email: {
    appointments: true,
    payments: true,
    reminders: true,
    system: false
  },
  sms: {
    appointments: true,
    payments: false,
    reminders: true,
    system: false
  },
  push: {
    appointments: true,
    payments: true,
    reminders: true,
    system: true
  },
  quietHours: {
    enabled: true,
    start: '22:00',
    end: '08:00'
  },
  frequency: {
    immediate: ['payment', 'appointment'],
    daily: ['reminder'],
    weekly: ['system']
  }
};

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeView, setActiveView] = useState<NotificationView>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<NotificationFilter>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());
  const [preferences, setPreferences] = useState<NotificationPreferences>(mockPreferences);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Add a random notification every 30 seconds for demo
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          title: 'New Message',
          message: 'You have a new message in the system',
          type: 'system',
          priority: 'low',
          isRead: false,
          recipientId: 'user-001',
          createdAt: new Date(),
          metadata: {}
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterType === 'all' || notification.type === filterType;
      
      const matchesView = activeView === 'all' || 
                         (activeView === 'unread' && !notification.isRead) ||
                         (activeView === 'archived' && notification.isArchived);
      
      return matchesSearch && matchesFilter && matchesView;
    });
  }, [notifications, searchQuery, filterType, activeView]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.isRead).length;

  const markAsRead = (notificationIds: string[]) => {
    setNotifications(prev =>
      prev.map(notification =>
        notificationIds.includes(notification.id)
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAsUnread = (notificationIds: string[]) => {
    setNotifications(prev =>
      prev.map(notification =>
        notificationIds.includes(notification.id)
          ? { ...notification, isRead: false }
          : notification
      )
    );
  };

  const archiveNotifications = (notificationIds: string[]) => {
    setNotifications(prev =>
      prev.map(notification =>
        notificationIds.includes(notification.id)
          ? { ...notification, isArchived: true }
          : notification
      )
    );
  };

  const deleteNotifications = (notificationIds: string[]) => {
    setNotifications(prev =>
      prev.filter(notification => !notificationIds.includes(notification.id))
    );
  };

  const toggleSelection = (notificationId: string) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(notificationId)) {
      newSelected.delete(notificationId);
    } else {
      newSelected.add(notificationId);
    }
    setSelectedNotifications(newSelected);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
            {urgentCount > 0 && (
              <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {urgentCount} urgent
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your notifications and communication settings
          </p>
        </div>
        <div className="flex gap-3">
          {selectedNotifications.size > 0 && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => markAsRead(Array.from(selectedNotifications))}
              >
                <Check className="w-4 h-4 mr-2" />
                Mark Read
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => archiveNotifications(Array.from(selectedNotifications))}
              >
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => deleteNotifications(Array.from(selectedNotifications))}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => markAsRead(notifications.filter(n => !n.isRead).map(n => n.id))}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Navigation and Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
            { id: 'archived', label: 'Archived', count: notifications.filter(n => n.isArchived).length },
            { id: 'settings', label: 'Settings', count: null },
          ].map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveView(id as NotificationView)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeView === id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {label}
              {count !== null && count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeView === id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeView !== 'settings' && (
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              className="max-w-sm"
            />
            <Select
              value={filterType}
              onChange={(value) => setFilterType(value as NotificationFilter)}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'appointment', label: 'Appointments' },
                { value: 'payment', label: 'Payments' },
                { value: 'reminder', label: 'Reminders' },
                { value: 'system', label: 'System' },
              ]}
            />
          </div>
        )}
      </div>

      {/* Content */}
      {activeView === 'settings' ? (
        <NotificationSettings 
          preferences={preferences} 
          onPreferencesChange={setPreferences} 
        />
      ) : (
        <NotificationList 
          notifications={filteredNotifications}
          selectedNotifications={selectedNotifications}
          onSelectionChange={toggleSelection}
          onMarkAsRead={markAsRead}
          onMarkAsUnread={markAsUnread}
          onArchive={archiveNotifications}
          onDelete={deleteNotifications}
        />
      )}
    </div>
  );
}

// Notification List Component
interface NotificationListProps {
  notifications: Notification[];
  selectedNotifications: Set<string>;
  onSelectionChange: (id: string) => void;
  onMarkAsRead: (ids: string[]) => void;
  onMarkAsUnread: (ids: string[]) => void;
  onArchive: (ids: string[]) => void;
  onDelete: (ids: string[]) => void;
}

function NotificationList({ 
  notifications, 
  selectedNotifications, 
  onSelectionChange,
  onMarkAsRead,
  onMarkAsUnread,
  onArchive,
  onDelete 
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
        <div className="text-center">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No notifications
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You're all caught up! Check back later for new notifications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          isSelected={selectedNotifications.has(notification.id)}
          onSelectionChange={() => onSelectionChange(notification.id)}
          onMarkAsRead={() => onMarkAsRead([notification.id])}
          onMarkAsUnread={() => onMarkAsUnread([notification.id])}
          onArchive={() => onArchive([notification.id])}
          onDelete={() => onDelete([notification.id])}
        />
      ))}
    </div>
  );
}

// Individual Notification Card
interface NotificationCardProps {
  notification: Notification;
  isSelected: boolean;
  onSelectionChange: () => void;
  onMarkAsRead: () => void;
  onMarkAsUnread: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

function NotificationCard({
  notification,
  isSelected,
  onSelectionChange,
  onMarkAsRead,
  onMarkAsUnread,
  onArchive,
  onDelete
}: NotificationCardProps) {
  const getTypeIcon = () => {
    switch (notification.type) {
      case 'appointment': return Calendar;
      case 'payment': return CreditCard;
      case 'reminder': return Clock;
      case 'system': return Settings;
      default: return Bell;
    }
  };

  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'urgent': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-blue-600 dark:text-blue-400';
      case 'low': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border transition-all cursor-pointer ${
        isSelected 
          ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-100 dark:ring-blue-900'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      } ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-950' : ''}`}
      onClick={onSelectionChange}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Type Icon */}
            <div className={`mt-0.5 ${getPriorityColor()}`}>
              <TypeIcon className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-sm font-medium ${
                  notification.isRead 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-900 dark:text-white font-semibold'
                }`}>
                  {notification.title}
                </h3>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  notification.priority === 'urgent'
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    : notification.priority === 'high'
                    ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                    : notification.priority === 'medium'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {notification.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {notification.message}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatRelativeTime(notification.createdAt)}
                </span>
                {notification.metadata && Object.keys(notification.metadata).length > 0 && (
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-4">
            {notification.isRead ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => { e.stopPropagation(); onMarkAsUnread(); }}
                title="Mark as unread"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => { e.stopPropagation(); onMarkAsRead(); }}
                title="Mark as read"
              >
                <Check className="w-4 h-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => { e.stopPropagation(); onArchive(); }}
              title="Archive"
            >
              <Archive className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Notification Settings Component
interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onPreferencesChange: (preferences: NotificationPreferences) => void;
}

function NotificationSettings({ preferences, onPreferencesChange }: NotificationSettingsProps) {
  const updatePreference = (channel: 'email' | 'sms' | 'push', type: string, enabled: boolean) => {
    const newPreferences = {
      ...preferences,
      [channel]: {
        ...preferences[channel],
        [type]: enabled
      }
    };
    onPreferencesChange(newPreferences);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Notification Preferences
        </h2>
        
        <div className="space-y-8">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                Email Notifications
              </h3>
            </div>
            <div className="space-y-3 ml-8">
              {Object.entries(preferences.email).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {type}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => updatePreference('email', type, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* SMS Notifications */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                SMS Notifications
              </h3>
            </div>
            <div className="space-y-3 ml-8">
              {Object.entries(preferences.sms).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {type}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => updatePreference('sms', type, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Push Notifications */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BellRing className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                Push Notifications
              </h3>
            </div>
            <div className="space-y-3 ml-8">
              {Object.entries(preferences.push).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {type}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => updatePreference('push', type, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Quiet Hours */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                Quiet Hours
              </h3>
            </div>
            <div className="ml-8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Enable quiet hours
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.quietHours.enabled}
                    onChange={(e) => onPreferencesChange({
                      ...preferences,
                      quietHours: { ...preferences.quietHours, enabled: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {preferences.quietHours.enabled && (
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={preferences.quietHours.start}
                      onChange={(e) => onPreferencesChange({
                        ...preferences,
                        quietHours: { ...preferences.quietHours, start: e.target.value }
                      })}
                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={preferences.quietHours.end}
                      onChange={(e) => onPreferencesChange({
                        ...preferences,
                        quietHours: { ...preferences.quietHours, end: e.target.value }
                      })}
                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <Button>
              Save Preferences
            </Button>
            <Button variant="outline">
              Reset to Default
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}