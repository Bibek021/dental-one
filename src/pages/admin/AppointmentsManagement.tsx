import { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock,
  User,
  Stethoscope,
  MapPin,
  Search
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { 
  appointments, 
  getAppointmentsForWeek, 
  getAppointmentsByDate,
  getTodaysAppointments,
  getAppointmentsByStatus
} from '../../data/appointments';
import { allUsers } from '../../data/users';
import { dentalServices } from '../../data/services';
import type { Appointment, AppointmentStatus } from '../../types';

type ViewMode = 'week' | 'day' | 'month';

export function AppointmentsManagement() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const handleAppointmentClick = (appointment: Appointment) => {
    // For now, just log the appointment - could open a modal or navigate to details
    console.log('Appointment clicked:', appointment);
  };

  // Get current week start (Monday)
  const getWeekStart = (date: Date) => {
    const weekStart = new Date(date);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
    weekStart.setDate(diff);
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
  };

  const weekStart = getWeekStart(currentDate);
  
  // Get appointments based on view mode
  const getFilteredAppointments = () => {
    let filteredAppointments: Appointment[];
    
    if (viewMode === 'week') {
      filteredAppointments = getAppointmentsForWeek(weekStart);
    } else if (viewMode === 'day') {
      filteredAppointments = getAppointmentsByDate(currentDate);
    } else {
      filteredAppointments = appointments; // Month view - show all for now
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filteredAppointments = filteredAppointments.filter(apt => apt.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredAppointments = filteredAppointments.filter(apt => {
        const patient = allUsers.find((u: any) => u.id === apt.patientId);
        const doctor = allUsers.find((u: any) => u.id === apt.doctorId);
        const service = dentalServices.find((s: any) => apt.serviceIds.includes(s.id));
        
        const patientName = patient ? `${patient.firstName} ${patient.lastName}` : '';
        const doctorName = doctor ? `${doctor.firstName} ${doctor.lastName}` : '';
        
        return (
          patientName.toLowerCase().includes(query) ||
          patient?.email.toLowerCase().includes(query) ||
          doctorName.toLowerCase().includes(query) ||
          service?.name.toLowerCase().includes(query) ||
          apt.symptoms?.toLowerCase().includes(query) ||
          apt.notes?.toLowerCase().includes(query)
        );
      });
    }

    return filteredAppointments;
  };

  const filteredAppointments = getFilteredAppointments();

  // Navigation functions
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get statistics
  const todaysAppointments = getTodaysAppointments();
  const confirmedAppointments = getAppointmentsByStatus('confirmed').length;
  const completedAppointments = getAppointmentsByStatus('completed').length;
  const cancelledAppointments = getAppointmentsByStatus('cancelled').length;

  // Helper function for date formatting
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCurrentViewTitle = () => {
    if (viewMode === 'week') {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
    } else if (viewMode === 'day') {
      return currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      return currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Appointment Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and schedule patient appointments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={goToToday} variant="secondary">
            Today
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{todaysAppointments.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Confirmed</p>
              <p className="text-2xl font-bold text-blue-600">{confirmedAppointments}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedAppointments}</p>
            </div>
            <User className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{cancelledAppointments}</p>
            </div>
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* View Mode and Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 text-sm rounded-l-lg ${
                  viewMode === 'day' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'week' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 text-sm rounded-r-lg ${
                  viewMode === 'month' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Month
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={navigatePrevious} variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-medium text-gray-900 dark:text-white min-w-[200px] text-center">
                {getCurrentViewTitle()}
              </span>
              <Button onClick={navigateNext} variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Select
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Confirmed', value: 'confirmed' },
                { label: 'In Progress', value: 'in_progress' },
                { label: 'Completed', value: 'completed' },
                { label: 'Cancelled', value: 'cancelled' },
                { label: 'No Show', value: 'no_show' }
              ]}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as AppointmentStatus | 'all')}
            />
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      {viewMode === 'week' ? (
        <WeekView 
          appointments={filteredAppointments}
          weekStart={weekStart}
          onAppointmentClick={handleAppointmentClick}
        />
      ) : viewMode === 'day' ? (
        <DayView 
          appointments={filteredAppointments}
          date={currentDate}
          onAppointmentClick={handleAppointmentClick}
        />
      ) : (
        <AppointmentsList 
          appointments={filteredAppointments}
          onAppointmentClick={handleAppointmentClick}
        />
      )}
    </div>
  );
}

// Week View Component
function WeekView({ 
  appointments, 
  weekStart, 
  onAppointmentClick 
}: { 
  appointments: Appointment[];
  weekStart: Date;
  onAppointmentClick: (appointment: Appointment) => void;
}) {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    days.push(day);
  }

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getDayAppointments = (day: Date) => {
    return appointments.filter(apt => 
      apt.startTime.toDateString() === day.toDateString()
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
        <div className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          Time
        </div>
        {days.map((day, index) => (
          <div key={index} className="p-3 text-center border-l border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div className="max-h-96 overflow-y-auto">
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-8 border-b border-gray-100 dark:border-gray-700">
            <div className="p-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
              {time}
            </div>
            {days.map((day, dayIndex) => {
              const dayAppointments = getDayAppointments(day);
              const timeAppointments = dayAppointments.filter(apt => {
                const appointmentHour = apt.startTime.getHours();
                const slotHour = parseInt(time.split(':')[0]);
                return appointmentHour === slotHour;
              });

              return (
                <div key={dayIndex} className="p-1 border-l border-gray-100 dark:border-gray-700 min-h-[60px]">
                  {timeAppointments.map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id}
                      appointment={appointment}
                      onClick={onAppointmentClick}
                      compact
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Day View Component
function DayView({ 
  appointments, 
  date, 
  onAppointmentClick 
}: { 
  appointments: Appointment[];
  date: Date;
  onAppointmentClick: (appointment: Appointment) => void;
}) {
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const getTimeSlotAppointments = (timeSlot: string) => {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    return appointments.filter(apt => {
      const aptHours = apt.startTime.getHours();
      const aptMinutes = apt.startTime.getMinutes();
      return aptHours === hours && aptMinutes === minutes;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {timeSlots.map((timeSlot) => {
          const slotAppointments = getTimeSlotAppointments(timeSlot);
          
          return (
            <div key={timeSlot} className="flex border-b border-gray-100 dark:border-gray-700">
              <div className="w-20 p-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                {timeSlot}
              </div>
              <div className="flex-1 p-2 min-h-[60px]">
                {slotAppointments.length > 0 ? (
                  slotAppointments.map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id}
                      appointment={appointment}
                      onClick={onAppointmentClick}
                    />
                  ))
                ) : (
                  <div className="h-full flex items-center text-gray-400 text-sm">
                    Available
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Appointments List Component (for month view or list view)
function AppointmentsList({ 
  appointments, 
  onAppointmentClick 
}: { 
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
}) {
  const groupedAppointments = appointments.reduce((groups, appointment) => {
    const dateKey = appointment.startTime.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(appointment);
    return groups;
  }, {} as Record<string, Appointment[]>);

  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  if (appointments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No appointments found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or create a new appointment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedDates.map((dateKey) => {
        const dayAppointments = groupedAppointments[dateKey];
        const date = new Date(dateKey);
        
        return (
          <div key={dateKey} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="p-4 space-y-3">
              {dayAppointments
                .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                .map((appointment) => (
                  <AppointmentCard 
                    key={appointment.id}
                    appointment={appointment}
                    onClick={onAppointmentClick}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Appointment Card Component
function AppointmentCard({ 
  appointment, 
  onClick, 
  compact = false 
}: { 
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
  compact?: boolean;
}) {
  const getPatientName = (patientId: string) => {
    const patient = allUsers.find((u: any) => u.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = allUsers.find((u: any) => u.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

  const getServiceName = (serviceId: string) => {
    const service = dentalServices.find((s: any) => s.id === serviceId);
    return service?.name || 'Unknown Service';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'scheduled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'no_show':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (compact) {
    return (
      <div 
        onClick={() => onClick(appointment)}
        className="p-2 rounded border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors text-xs bg-white dark:bg-gray-700"
      >
        <div className="font-medium text-gray-900 dark:text-white truncate">
          {getPatientName(appointment.patientId)}
        </div>
        <div className="text-gray-600 dark:text-gray-300 truncate">
          {formatTime(appointment.startTime)}
        </div>
        <div className={`inline-block px-1 py-0.5 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
          {appointment.status.replace('_', ' ')}
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(appointment)}
      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors bg-gray-50 dark:bg-gray-700"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {getPatientName(appointment.patientId)}
            </h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Dr. {getDoctorName(appointment.doctorId)}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {getServiceName(appointment.serviceIds[0])}
            </div>
            {appointment.symptoms && (
              <div className="text-orange-600 dark:text-orange-400 font-medium">
                Symptoms: {appointment.symptoms}
              </div>
            )}
            {appointment.notes && (
              <div className="text-blue-600 dark:text-blue-400">
                Notes: {appointment.notes}
              </div>
            )}
          </div>
        </div>
        {appointment.isFollowUp && (
          <div className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded text-xs font-medium">
            Follow-up
          </div>
        )}
      </div>
    </div>
  );
}