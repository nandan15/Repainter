import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Video {
  id: number;
  url: string;
  title: string;
  thumbnail: string;
  duration: string;
  uploadDate: string;
  views: number;
  category: string;
  categoryColor: string;
  description?: string;
  fileSize?: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  viewMode: 'grid' | 'list' = 'grid';
  isDragging = false;
  searchQuery = '';
  private searchSubject = new Subject<string>();
  filteredVideos: Video[] = [];

  videos: Video[] = [
    {
      id: 1,
      url: 'assets/video1.mp4',
      title: 'Ultimate Guide to Modern UI Design',
      thumbnail: '/api/placeholder/320/180',
      duration: '12:45',
      uploadDate: '2 days ago',
      views: 1234,
      category: 'Design',
      categoryColor: '#3b82f6',
      description: 'Learn the fundamentals of modern UI design',
      fileSize: '256 MB'
    },
    {
      id: 2,
      url: 'assets/video2.mp4',
      title: 'Creating Engaging User Experiences',
      thumbnail: '/api/placeholder/320/180',
      duration: '8:30',
      uploadDate: '1 week ago',
      views: 2156,
      category: 'UX',
      categoryColor: '#2dd4bf',
      description: 'Master the art of user experience design',
      fileSize: '180 MB'
    },
    {
      id: 3,
      url: 'assets/video3.mp4',
      title: 'Advanced Animation Techniques',
      thumbnail: '/api/placeholder/320/180',
      duration: '15:20',
      uploadDate: '2 weeks ago',
      views: 3678,
      category: 'Animation',
      categoryColor: '#8b5cf6',
      description: 'Advanced techniques for web animations',
      fileSize: '320 MB'
    }
  ];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.filteredVideos = [...this.videos];
  }

  ngOnInit(): void {
    // Initialize search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterVideos(searchTerm);
    });
  }

  // Search and Filter Methods
  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  filterVideos(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredVideos = [...this.videos];
      return;
    }

    this.filteredVideos = this.videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // File Upload Methods
  uploadVideo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      this.handleFileUpload(file);
    }
  }

  handleFileUpload(file: File): void {
    // Validate file type
    if (!this.isValidVideoFile(file)) {
      this.showError('Invalid file type. Please upload a video file.');
      return;
    }

    // Validate file size (max 500MB)
    if (file.size > 500 * 1024 * 1024) {
      this.showError('File size too large. Maximum size is 500MB.');
      return;
    }

    // Simulate upload process
    this.showSuccess('Starting upload...');
    setTimeout(() => {
      const newVideo: Video = {
        id: this.generateVideoId(),
        url: URL.createObjectURL(file),
        title: file.name.replace(/\.[^/.]+$/, ""),
        thumbnail: '/api/placeholder/320/180',
        duration: '00:00',
        uploadDate: 'Just now',
        views: 0,
        category: 'Uncategorized',
        categoryColor: '#64748b',
        fileSize: this.formatFileSize(file.size)
      };

      this.videos.unshift(newVideo);
      this.filteredVideos = [...this.videos];
      this.showSuccess('Video uploaded successfully!');
    }, 1500);
  }

  // Drag and Drop Methods
  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.handleFileUpload(files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Video Management Methods
  editVideo(video: Video): void {
    // Implement edit functionality
    this.showInfo('Edit functionality coming soon!');
  }

  deleteVideo(id: number): void {
    const index = this.videos.findIndex(v => v.id === id);
    if (index !== -1) {
      this.videos.splice(index, 1);
      this.filteredVideos = [...this.videos];
      this.showSuccess('Video deleted successfully!');
    }
  }

  shareVideo(video: Video): void {
    // Implement share functionality
    this.showInfo('Share functionality coming soon!');
  }

  // Utility Methods
  getTotalViews(): number {
    return this.videos.reduce((total, video) => total + video.views, 0);
  }

  private generateVideoId(): number {
    return Math.max(...this.videos.map(v => v.id)) + 1;
  }

  private isValidVideoFile(file: File): boolean {
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    return validTypes.includes(file.type);
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Notification Methods
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  private showInfo(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: ['info-snackbar']
    });
  }
}
