import { Component, OnInit, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, transition, style, animate } from "@angular/animations";
interface Testimonial {
  id: number;
  name: string;
  designation: string;
  message: string;
  rating: number;
  image: string;
  expanded: boolean;
}
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
      ])
    ])
  ]
})
export class TestimonialsComponent implements OnInit {
  isSidebarExpanded = true;
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      designation: "Marketing Director",
      message: "Working with this team has been an absolute game-changer for our business. Their attention to detail and innovative solutions have helped us achieve remarkable results. The level of professionalism and dedication they bring to each project is truly exceptional.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      expanded: false
    },
    {
      id: 2,
      name: "Michael Chen",
      designation: "Tech Lead",
      message: "The product quality and customer service are outstanding. They've consistently delivered beyond our expectations and have become an integral part of our success story. Their technical expertise and problem-solving abilities are unmatched.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      expanded: false
    },
      {
        id: 3,
        name: "Emily Rodriguez",
        designation: "CEO",
        message: "I've worked with many service providers, but none have matched the level of excellence and dedication I've experienced here. Their team's commitment to quality and innovation has helped transform our business operations.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        expanded: false
      }
      
  ];

  currentPage = 0;
  itemsPerPage = 3;
  totalPages = Math.ceil(this.testimonials.length / this.itemsPerPage);

  ngOnInit(): void {
  }
  onSidebarToggle(expanded: boolean): void {
    this.isSidebarExpanded = expanded;
  }
  toggleExpand(testimonial: Testimonial): void {
    testimonial.expanded = !testimonial.expanded;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = "https://images.unsplash.com/photo-1611342799915-5dd9f1665d04"; // Fallback image
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  getPaginationArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index);
  }
}
