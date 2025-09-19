// File Upload & Management System with Document Storage

import { useState, useMemo, useCallback } from 'react';
import { 
  Upload,
  File,
  FileText,
  Image,
  Download,
  Trash2,
  Eye,
  Share2,
  Folder,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Lock,
  Unlock
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { formatDate } from '../../utils';
import type { FileUpload } from '../../types';

type FileView = 'grid' | 'list';
type FileFilter = 'all' | 'xray' | 'treatment' | 'consent' | 'insurance' | 'policy' | 'report';

// Mock file data
const mockFiles: FileUpload[] = [
  {
    id: 'file-001',
    fileName: 'patient_xray_001.jpg',
    originalName: 'John Smith - Dental X-Ray - 2025-01-15.jpg',
    fileType: 'image/jpeg',
    fileSize: 2457600, // 2.4 MB
    uploadedBy: 'Dr. Johnson',
    uploadedAt: new Date('2025-01-15T10:30:00'),
    category: 'xray',
    associatedId: 'patient-001',
    isPublic: false,
    downloadUrl: '/files/patient_xray_001.jpg',
    thumbnailUrl: '/thumbnails/patient_xray_001_thumb.jpg'
  },
  {
    id: 'file-002',
    fileName: 'treatment_plan_002.pdf',
    originalName: 'Sarah Johnson - Treatment Plan.pdf',
    fileType: 'application/pdf',
    fileSize: 1024000, // 1 MB
    uploadedBy: 'Dr. Smith',
    uploadedAt: new Date('2025-01-14T14:20:00'),
    category: 'treatment',
    associatedId: 'patient-002',
    isPublic: false,
    downloadUrl: '/files/treatment_plan_002.pdf'
  },
  {
    id: 'file-003',
    fileName: 'consent_form_003.pdf',
    originalName: 'Michael Davis - Consent Form - Tooth Extraction.pdf',
    fileType: 'application/pdf',
    fileSize: 512000, // 512 KB
    uploadedBy: 'Reception Staff',
    uploadedAt: new Date('2025-01-13T09:15:00'),
    category: 'consent',
    associatedId: 'patient-003',
    isPublic: false,
    downloadUrl: '/files/consent_form_003.pdf'
  },
  {
    id: 'file-004',
    fileName: 'insurance_claim_004.pdf',
    originalName: 'Emma Wilson - Insurance Claim - Cleaning.pdf',
    fileType: 'application/pdf',
    fileSize: 768000, // 768 KB
    uploadedBy: 'Billing Team',
    uploadedAt: new Date('2025-01-12T16:45:00'),
    category: 'insurance',
    associatedId: 'patient-004',
    isPublic: false,
    downloadUrl: '/files/insurance_claim_004.pdf'
  },
  {
    id: 'file-005',
    fileName: 'clinic_policy_2025.pdf',
    originalName: 'Updated Clinic Policies 2025.pdf',
    fileType: 'application/pdf',
    fileSize: 3145728, // 3 MB
    uploadedBy: 'Admin',
    uploadedAt: new Date('2025-01-10T08:00:00'),
    category: 'policy',
    associatedId: undefined,
    isPublic: true,
    downloadUrl: '/files/clinic_policy_2025.pdf'
  },
  {
    id: 'file-006',
    fileName: 'monthly_report_dec2024.xlsx',
    originalName: 'Monthly Financial Report - December 2024.xlsx',
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    fileSize: 2048000, // 2 MB
    uploadedBy: 'Finance Manager',
    uploadedAt: new Date('2025-01-05T17:30:00'),
    category: 'report',
    associatedId: undefined,
    isPublic: false,
    downloadUrl: '/files/monthly_report_dec2024.xlsx'
  }
];

const fileCategories = [
  { value: 'all', label: 'All Files', color: 'gray' },
  { value: 'xray', label: 'X-Rays', color: 'blue' },
  { value: 'treatment', label: 'Treatment Plans', color: 'green' },
  { value: 'consent', label: 'Consent Forms', color: 'purple' },
  { value: 'insurance', label: 'Insurance', color: 'orange' },
  { value: 'policy', label: 'Policies', color: 'red' },
  { value: 'report', label: 'Reports', color: 'indigo' },
];

export function FileManagement() {
  const [files, setFiles] = useState<FileUpload[]>(mockFiles);
  const [activeView, setActiveView] = useState<FileView>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<FileFilter>('all');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterCategory === 'all' || file.category === filterCategory;
      
      return matchesSearch && matchesFilter;
    });
  }, [files, searchQuery, filterCategory]);

  const fileStats = useMemo(() => {
    const totalSize = files.reduce((sum, file) => sum + file.fileSize, 0);
    const publicFiles = files.filter(f => f.isPublic).length;
    const privateFiles = files.filter(f => !f.isPublic).length;
    
    return {
      totalFiles: files.length,
      totalSize,
      publicFiles,
      privateFiles,
      categories: fileCategories.slice(1).map(cat => ({
        ...cat,
        count: files.filter(f => f.category === cat.value).length
      }))
    };
  }, [files]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return Image;
    if (fileType === 'application/pdf') return FileText;
    return File;
  };

  const toggleFileSelection = (fileId: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(fileId)) {
      newSelected.delete(fileId);
    } else {
      newSelected.add(fileId);
    }
    setSelectedFiles(newSelected);
  };

  const deleteSelectedFiles = () => {
    setFiles(prev => prev.filter(file => !selectedFiles.has(file.id)));
    setSelectedFiles(new Set());
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      Array.from(uploadedFiles).forEach(file => {
        const newFileUpload: FileUpload = {
          id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          fileName: file.name.replace(/\s+/g, '_').toLowerCase(),
          originalName: file.name,
          fileType: file.type,
          fileSize: file.size,
          uploadedBy: 'Current User',
          uploadedAt: new Date(),
          category: file.type.startsWith('image/') ? 'xray' : 'document',
          associatedId: undefined,
          isPublic: false,
          downloadUrl: URL.createObjectURL(file),
          thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        };
        
        setFiles(prev => [newFileUpload, ...prev]);
      });
    }
    event.target.value = '';
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            File Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload, organize, and manage patient documents and clinic files
          </p>
        </div>
        <div className="flex gap-3">
          {selectedFiles.size > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share ({selectedFiles.size})
              </Button>
              <Button variant="outline" size="sm" onClick={deleteSelectedFiles}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedFiles.size})
              </Button>
            </div>
          )}
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>
      </div>

      {/* File Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FileStatCard
          title="Total Files"
          value={fileStats.totalFiles}
          subtitle={`${formatFileSize(fileStats.totalSize)}`}
          icon={<File className="w-6 h-6" />}
          color="blue"
        />
        <FileStatCard
          title="Public Files"
          value={fileStats.publicFiles}
          subtitle={`${fileStats.privateFiles} private`}
          icon={<Unlock className="w-6 h-6" />}
          color="green"
        />
        <FileStatCard
          title="Recent Uploads"
          value={files.filter(f => 
            new Date().getTime() - f.uploadedAt.getTime() < 7 * 24 * 60 * 60 * 1000
          ).length}
          subtitle="This week"
          icon={<Upload className="w-6 h-6" />}
          color="purple"
        />
        <FileStatCard
          title="Categories"
          value={fileStats.categories.filter(cat => cat.count > 0).length}
          subtitle="In use"
          icon={<Folder className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Categories Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          File Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {fileStats.categories.map(category => (
            <div 
              key={category.value}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                filterCategory === category.value
                  ? `border-${category.color}-500 bg-${category.color}-50 dark:bg-${category.color}-900`
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setFilterCategory(category.value as FileFilter)}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.count}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {category.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="max-w-sm"
          />
          <Select
            value={filterCategory}
            onChange={(value) => setFilterCategory(value as FileFilter)}
            options={fileCategories.map(cat => ({ value: cat.value, label: cat.label }))}
          />
        </div>
        
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('grid')}
            className={`p-2 rounded-md transition-colors ${
              activeView === 'grid'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`p-2 rounded-md transition-colors ${
              activeView === 'list'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* File Display */}
      {activeView === 'grid' ? (
        <FileGrid 
          files={filteredFiles}
          selectedFiles={selectedFiles}
          onFileSelect={toggleFileSelection}
          formatFileSize={formatFileSize}
          getFileIcon={getFileIcon}
        />
      ) : (
        <FileList
          files={filteredFiles}
          selectedFiles={selectedFiles}
          onFileSelect={toggleFileSelection}
          formatFileSize={formatFileSize}
          getFileIcon={getFileIcon}
        />
      )}

      {filteredFiles.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No files found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery || filterCategory !== 'all'
                ? 'Try adjusting your search or filter settings.'
                : 'Upload your first file to get started.'
              }
            </p>
            <div className="relative inline-block">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// File Grid View
interface FileGridProps {
  files: FileUpload[];
  selectedFiles: Set<string>;
  onFileSelect: (fileId: string) => void;
  formatFileSize: (bytes: number) => string;
  getFileIcon: (fileType: string) => any;
}

function FileGrid({ files, selectedFiles, onFileSelect, formatFileSize, getFileIcon }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {files.map(file => {
        const IconComponent = getFileIcon(file.fileType);
        const isSelected = selectedFiles.has(file.id);
        
        return (
          <div
            key={file.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all cursor-pointer ${
              isSelected
                ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-100 dark:ring-blue-900'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => onFileSelect(file.id)}
          >
            <div className="p-4">
              {/* File Preview */}
              <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center relative">
                {file.thumbnailUrl ? (
                  <img 
                    src={file.thumbnailUrl} 
                    alt={file.originalName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <IconComponent className="w-16 h-16 text-gray-400" />
                )}
                <div className="absolute top-2 right-2">
                  {file.isPublic ? (
                    <Unlock className="w-4 h-4 text-green-500" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>

              {/* File Info */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white truncate" title={file.originalName}>
                  {file.originalName}
                </h4>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>{formatFileSize(file.fileSize)}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(file.category)}`}>
                      {getCategoryLabel(file.category)}
                    </span>
                  </div>
                  <div className="mt-1">
                    By {file.uploadedBy}
                  </div>
                  <div>
                    {formatDate(file.uploadedAt)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" title="Download">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Preview">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Share">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" title="More options">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// File List View
function FileList({ files, selectedFiles, onFileSelect, formatFileSize, getFileIcon }: FileGridProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                File
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Upload Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Access
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {files.map(file => {
              const IconComponent = getFileIcon(file.fileType);
              const isSelected = selectedFiles.has(file.id);
              
              return (
                <tr 
                  key={file.id}
                  className={`cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-blue-50 dark:bg-blue-950' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => onFileSelect(file.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        {file.thumbnailUrl ? (
                          <img 
                            src={file.thumbnailUrl} 
                            alt={file.originalName}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {file.originalName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {file.fileName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(file.category)}`}>
                      {getCategoryLabel(file.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {formatFileSize(file.fileSize)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {file.uploadedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {formatDate(file.uploadedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {file.isPublic ? (
                        <>
                          <Unlock className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600 dark:text-green-400">Public</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Private</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" title="Download">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Preview">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Share">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="More">
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

// Utility Functions
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    xray: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    treatment: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    consent: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    insurance: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    policy: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    report: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
  };
  return colors[category] || 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    xray: 'X-Ray',
    treatment: 'Treatment',
    consent: 'Consent',
    insurance: 'Insurance',
    policy: 'Policy',
    report: 'Report',
  };
  return labels[category] || 'Document';
}

// File Statistics Card
interface FileStatCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function FileStatCard({ title, value, subtitle, icon, color }: FileStatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}