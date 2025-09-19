import { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  Stethoscope,
  Phone,
  Mail,
  Calendar,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Award,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { allUsers } from '../../data/users';
import type { Doctor, Staff, UserRole } from '../../types';

type StaffMember = Doctor | Staff;
type ViewMode = 'grid' | 'list' | 'schedule';

export function StaffManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Get staff members (doctors + staff)
  const getStaffMembers = (): StaffMember[] => {
    return allUsers.filter((user): user is StaffMember => 
      user.role === 'doctor' || user.role === 'staff' || user.role === 'receptionist'
    );
  };

  // Get filtered staff members
  const getFilteredStaff = () => {
    let filteredStaff = getStaffMembers();

    // Apply role filter
    if (roleFilter !== 'all') {
      filteredStaff = filteredStaff.filter(staff => staff.role === roleFilter);
    }

    // Apply department filter
    if (departmentFilter !== 'all') {
      filteredStaff = filteredStaff.filter(staff => {
        if (staff.role === 'doctor') {
          return (staff as Doctor).specialization.some(spec => 
            spec.toLowerCase().includes(departmentFilter.toLowerCase())
          );
        } else {
          return (staff as Staff).department.toLowerCase() === departmentFilter.toLowerCase();
        }
      });
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filteredStaff = filteredStaff.filter(staff => staff.isActive === isActive);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredStaff = filteredStaff.filter(staff => {
        const fullName = `${staff.firstName} ${staff.lastName}`.toLowerCase();
        const email = staff.email.toLowerCase();
        const phone = staff.phone?.toLowerCase() || '';
        
        let searchFields = [fullName, email, phone];
        
        if (staff.role === 'doctor') {
          const doctor = staff as Doctor;
          searchFields.push(
            doctor.licenseNumber.toLowerCase(),
            ...doctor.specialization.map(s => s.toLowerCase()),
            ...doctor.education.map(e => e.toLowerCase())
          );
        } else {
          const staffMember = staff as Staff;
          searchFields.push(
            staffMember.department.toLowerCase(),
            staffMember.position.toLowerCase()
          );
        }
        
        return searchFields.some(field => field.includes(query));
      });
    }

    return filteredStaff;
  };

  const filteredStaff = getFilteredStaff();

  // Get statistics
  const getStaffStats = () => {
    const allStaff = getStaffMembers();
    const doctors = allStaff.filter(staff => staff.role === 'doctor');
    const clinicalStaff = allStaff.filter(staff => staff.role === 'staff');
    const receptionists = allStaff.filter(staff => staff.role === 'receptionist');
    const activeStaff = allStaff.filter(staff => staff.isActive);

    return {
      total: allStaff.length,
      doctors: doctors.length,
      clinicalStaff: clinicalStaff.length,
      receptionists: receptionists.length,
      active: activeStaff.length,
      inactive: allStaff.length - activeStaff.length
    };
  };

  const stats = getStaffStats();

  // Get unique departments
  const getDepartments = () => {
    const departments = new Set<string>();
    getStaffMembers().forEach(staff => {
      if (staff.role === 'doctor') {
        (staff as Doctor).specialization.forEach(spec => departments.add(spec));
      } else {
        departments.add((staff as Staff).department);
      }
    });
    return Array.from(departments);
  };

  const handleStaffClick = (staff: StaffMember) => {
    setSelectedStaff(staff);
  };

  const handleAddStaff = () => {
    // This would open a modal or navigate to add staff page
    console.log('Add new staff member');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Staff Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage doctors, staff members, and clinic personnel
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button onClick={handleAddStaff}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Doctors</p>
              <p className="text-2xl font-bold text-blue-600">{stats.doctors}</p>
            </div>
            <Stethoscope className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clinical Staff</p>
              <p className="text-2xl font-bold text-green-600">{stats.clinicalStaff}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receptionists</p>
              <p className="text-2xl font-bold text-purple-600">{stats.receptionists}</p>
            </div>
            <Phone className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
              <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
            </div>
            <UserX className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-sm rounded-l-lg ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('schedule')}
                className={`px-3 py-1 text-sm rounded-r-lg ${
                  viewMode === 'schedule' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Schedule
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            
            <Select
              options={[
                { label: 'All Roles', value: 'all' },
                { label: 'Doctors', value: 'doctor' },
                { label: 'Staff', value: 'staff' },
                { label: 'Receptionists', value: 'receptionist' }
              ]}
              value={roleFilter}
              onChange={(value) => setRoleFilter(value as UserRole | 'all')}
            />
            
            <Select
              options={[
                { label: 'All Departments', value: 'all' },
                ...getDepartments().map(dept => ({ label: dept, value: dept.toLowerCase() }))
              ]}
              value={departmentFilter}
              onChange={(value) => setDepartmentFilter(value as string)}
            />
            
            <Select
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' }
              ]}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as 'all' | 'active' | 'inactive')}
            />
          </div>
        </div>
      </div>

      {/* Staff Content */}
      {viewMode === 'grid' ? (
        <StaffGrid 
          staff={filteredStaff}
          onStaffClick={handleStaffClick}
        />
      ) : viewMode === 'list' ? (
        <StaffList 
          staff={filteredStaff}
          onStaffClick={handleStaffClick}
        />
      ) : (
        <StaffSchedule 
          staff={filteredStaff}
          onStaffClick={handleStaffClick}
        />
      )}

      {/* Staff Details Modal */}
      {selectedStaff && (
        <StaffDetailsModal 
          staff={selectedStaff}
          onClose={() => setSelectedStaff(null)}
        />
      )}
    </div>
  );
}

// Staff Grid Component
function StaffGrid({ 
  staff, 
  onStaffClick 
}: { 
  staff: StaffMember[];
  onStaffClick: (staff: StaffMember) => void;
}) {
  if (staff.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No staff members found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or add a new staff member.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {staff.map((staffMember) => (
        <StaffCard 
          key={staffMember.id}
          staff={staffMember}
          onClick={onStaffClick}
        />
      ))}
    </div>
  );
}

// Staff Card Component
function StaffCard({ 
  staff, 
  onClick 
}: { 
  staff: StaffMember;
  onClick: (staff: StaffMember) => void;
}) {
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'staff':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'receptionist':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return <Stethoscope className="w-5 h-5" />;
      case 'staff':
        return <UserCheck className="w-5 h-5" />;
      case 'receptionist':
        return <Phone className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const getSpecializationOrDepartment = () => {
    if (staff.role === 'doctor') {
      const doctor = staff as Doctor;
      return doctor.specialization[0] || 'General Dentistry';
    } else {
      const staffMember = staff as Staff;
      return `${staffMember.department} - ${staffMember.position}`;
    }
  };

  return (
    <div 
      onClick={() => onClick(staff)}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getRoleColor(staff.role)}`}>
            {getRoleIcon(staff.role)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {staff.firstName} {staff.lastName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getSpecializationOrDepartment()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {staff.isActive ? (
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          ) : (
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {staff.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          {staff.email}
        </div>
        {staff.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {staff.phone}
          </div>
        )}
        {staff.role === 'doctor' && (
          <>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              {(staff as Doctor).licenseNumber}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {(staff as Doctor).experience} years experience
            </div>
          </>
        )}
      </div>

      {staff.role === 'doctor' && (staff as Doctor).specialization.length > 1 && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-1">
            {(staff as Doctor).specialization.slice(1).map((spec, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(staff.role)}`}>
          {staff.role === 'doctor' ? 'Doctor' : staff.role === 'staff' ? 'Staff' : 'Receptionist'}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Staff List Component
function StaffList({ 
  staff, 
  onStaffClick 
}: { 
  staff: StaffMember[];
  onStaffClick: (staff: StaffMember) => void;
}) {
  if (staff.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No staff members found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or add a new staff member.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Staff Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role & Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {staff.map((staffMember) => (
              <StaffRow 
                key={staffMember.id}
                staff={staffMember}
                onClick={onStaffClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Staff Row Component
function StaffRow({ 
  staff, 
  onClick 
}: { 
  staff: StaffMember;
  onClick: (staff: StaffMember) => void;
}) {
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'staff':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'receptionist':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getSpecializationOrDepartment = () => {
    if (staff.role === 'doctor') {
      const doctor = staff as Doctor;
      return {
        primary: doctor.specialization[0] || 'General Dentistry',
        secondary: `License: ${doctor.licenseNumber}`
      };
    } else {
      const staffMember = staff as Staff;
      return {
        primary: staffMember.position,
        secondary: staffMember.department
      };
    }
  };

  const roleInfo = getSpecializationOrDepartment();

  return (
    <tr 
      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      onClick={() => onClick(staff)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className={`h-10 w-10 rounded-full ${getRoleColor(staff.role)} flex items-center justify-center`}>
              <span className="text-sm font-medium">
                {staff.firstName[0]}{staff.lastName[0]}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {staff.firstName} {staff.lastName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ID: {staff.id}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white font-medium">
          {roleInfo.primary}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {roleInfo.secondary}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        <div>{staff.email}</div>
        <div className="text-gray-500 dark:text-gray-400">{staff.phone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {staff.role === 'doctor' ? (
          <div>
            <div>{(staff as Doctor).experience} years</div>
            <div className="text-gray-500 dark:text-gray-400">
              {(staff as Doctor).specialization.length} specialization{(staff as Doctor).specialization.length !== 1 ? 's' : ''}
            </div>
          </div>
        ) : (
          <div>
            <div>Since {staff.createdAt.getFullYear()}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {(staff as Staff).department}
            </div>
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          staff.isActive 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {staff.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// Staff Schedule Component
function StaffSchedule({ 
  staff, 
  onStaffClick 
}: { 
  staff: StaffMember[];
  onStaffClick: (staff: StaffMember) => void;
}) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  if (staff.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No staff schedules found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters to see staff schedules.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-700">
                Staff Member
              </th>
              {days.map((day) => (
                <th key={day} className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[120px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {staff.map((staffMember) => (
              <tr key={staffMember.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white dark:bg-gray-800">
                  <div 
                    onClick={() => onStaffClick(staffMember)}
                    className="flex items-center cursor-pointer"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {staffMember.firstName} {staffMember.lastName}
                    </div>
                  </div>
                </td>
                {dayKeys.map((dayKey) => {
                  const schedule = staffMember.workingHours[dayKey];
                  return (
                    <td key={dayKey} className="px-6 py-4 text-center">
                      {schedule.isWorking ? (
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {schedule.startTime} - {schedule.endTime}
                          </div>
                          {schedule.breaks && schedule.breaks.length > 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Break: {schedule.breaks[0].startTime} - {schedule.breaks[0].endTime}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Off</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Staff Details Modal Component
function StaffDetailsModal({ 
  staff, 
  onClose 
}: { 
  staff: StaffMember;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Staff Details - {staff.firstName} {staff.lastName}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Users className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Full Name:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {staff.firstName} {staff.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Email:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {staff.email}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Phone:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {staff.phone}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Role:</span>
                  <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {staff.role === 'doctor' ? 'Doctor' : staff.role === 'staff' ? 'Staff' : 'Receptionist'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Professional Information
              </h3>
              <div className="space-y-3">
                {staff.role === 'doctor' ? (
                  <>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">License Number:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                        {(staff as Doctor).licenseNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Experience:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                        {(staff as Doctor).experience} years
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Specializations:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(staff as Doctor).specialization.map((spec, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Department:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                        {(staff as Staff).department}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Position:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                        {(staff as Staff).position}
                      </span>
                    </div>
                  </>
                )}
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    staff.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {staff.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Education (Doctors only) */}
          {staff.role === 'doctor' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Education
              </h3>
              <div className="space-y-2">
                {(staff as Doctor).education.map((edu, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-900 dark:text-white">{edu}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Working Schedule
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(staff.workingHours).map(([day, schedule]) => (
                <div key={day} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-medium text-sm text-gray-900 dark:text-white capitalize">
                    {day}
                  </div>
                  {schedule.isWorking ? (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                  ) : (
                    <div className="text-sm text-red-500">Off</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Staff
          </Button>
        </div>
      </div>
    </div>
  );
}