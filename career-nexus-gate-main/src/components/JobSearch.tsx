import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useApi, usePagination } from '@/hooks/useApi';
import { jobsService, Job, JobFilters } from '@/services/jobs';
import { MapPin, Clock, DollarSign, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function JobSearch() {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    job_type: '',
    experience_level: ''
  });

  const { data: jobsData, loading, execute } = useApi<{ items: Job[]; total: number; page: number; size: number; pages: number }>();
  const pagination = usePagination(1, 9);

  // Fetch jobs when filters or pagination changes
  useEffect(() => {
    const fetchJobs = async () => {
      const searchFilters = {
        ...filters,
        page: pagination.page,
        size: pagination.size
      };
      
      // Remove empty filter values
      Object.keys(searchFilters).forEach(key => {
        if (!searchFilters[key as keyof JobFilters]) {
          delete searchFilters[key as keyof JobFilters];
        }
      });

      try {
        const result = await execute(() => jobsService.getJobs(searchFilters));
        if (result) {
          pagination.updateTotal(result.total);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, [filters, pagination.page, pagination.size]);

  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    pagination.reset(); // Reset to first page when filtering
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search - useEffect will handle the actual API call
  };

  const formatSalary = (min?: number, max?: number, currency: string = 'USD') => {
    if (!min && !max) return 'Salary not specified';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    } else if (min) {
      return `From ${formatter.format(min)}`;
    } else if (max) {
      return `Up to ${formatter.format(max)}`;
    }
  };

  const getJobTypeDisplay = (jobType: string) => {
    const types = {
      'full_time': 'Full Time',
      'part_time': 'Part Time',
      'contract': 'Contract',
      'remote': 'Remote'
    };
    return types[jobType as keyof typeof types] || jobType;
  };

  const getExperienceLevelDisplay = (level: string) => {
    const levels = {
      'entry': 'Entry Level',
      'mid': 'Mid Level',
      'senior': 'Senior Level',
      'executive': 'Executive'
    };
    return levels[level as keyof typeof levels] || level;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>Find Your Next Opportunity</CardTitle>
          <CardDescription>
            Search through thousands of job opportunities from top companies
          </CardDescription>
        </CardHeader>
        <CardContent>
  <form onSubmit={handleSearch} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Input
        placeholder="Job title or keywords"
        value={filters.search}
        onChange={(e) => handleFilterChange('search', e.target.value)}
      />

      <Input
        placeholder="Location"
        value={filters.location}
        onChange={(e) => handleFilterChange('location', e.target.value)}
      />

      <Select
        value={filters.job_type}
        onValueChange={(value) => handleFilterChange('job_type', value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="full_time">Full Time</SelectItem>
          <SelectItem value="part_time">Part Time</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
          <SelectItem value="remote">Remote</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.experience_level}
        onValueChange={(value) => handleFilterChange('experience_level', value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Experience Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="entry">Entry Level</SelectItem>
          <SelectItem value="mid">Mid Level</SelectItem>
          <SelectItem value="senior">Senior Level</SelectItem>
          <SelectItem value="executive">Executive</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="flex gap-2">
      <Button type="submit" className="btn-primary">
        Search Jobs
      </Button>
      {/* <Button
        type="button"
        variant="secondary"
        onClick={() => resetFilters()}
      >
        Clear Filters
      </Button> */}
    </div>
  </form>
</CardContent>

         </Card>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <p>Loading jobs...</p>
          </div>
        ) : jobsData?.items.length ? (
          <>
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing {((pagination.page - 1) * pagination.size) + 1} to{' '}
                {Math.min(pagination.page * pagination.size, pagination.total)} of{' '}
                {pagination.total} jobs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobsData.items.map((job) => (
                <Card key={job.id} className="card-feature hover:cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Building2 className="h-4 w-4 mr-1" />
                          <span className="text-sm">{job.company_name}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {getJobTypeDisplay(job.job_type)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatSalary(job.salary_min, job.salary_max, job.currency)}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {getExperienceLevelDisplay(job.experience_level)}
                      </div>
                    </div>

                    <Separator />
                    
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.description}
                    </p>
                    
                    {job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <Button className="w-full btn-primary">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={pagination.prevPage}
                  disabled={!pagination.hasPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={pagination.nextPage}
                  disabled={!pagination.hasNext}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                No jobs found matching your criteria. Try adjusting your search filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}