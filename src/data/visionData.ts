export interface FeatureSection {
  title: string;
  items: string[];
  description?: string;
}

export interface Phase {
  id: string;
  title: string;
  status: 'live' | 'coming_soon';
  badge: string;
  sections: FeatureSection[];
}

export const visionData: Phase[] = [
  {
    id: 'phase1',
    title: 'Phase 1',
    status: 'live',
    badge: 'Live',
    sections: [
      {
        title: 'Secure Login & Roles',
        description: 'Role-based access control for users and administrators',
        items: ['Persona selection (User/Admin)', 'ID + Password authentication']
      },
      {
        title: 'Facility Visibility',
        description: 'Real-time facility status and occupancy tracking',
        items: ['Live occupancy (X/Y)', 'Open/Full/Closed status indicators']
      },
      {
        title: 'Access Control',
        description: 'Seamless check-in/out system with automated session management',
        items: ['QR check-in/out', 'Auto logout in 1.5 hours']
      },
      {
        title: 'Admin Tools',
        description: 'Comprehensive facility management and reporting suite',
        items: ['Facilities CRUD (capacity, hours, max session length)', 'Live Dashboard (occupancy, active sessions)', 'Reports (CSV export)', 'QR Manager (generate QR + Short Code)']
      }
    ]
  },
  {
    id: 'phase2',
    title: 'Phase 2',
    status: 'coming_soon',
    badge: 'Coming Soon',
    sections: [
      {
        title: 'Announcements & Closures',
        description: 'Scheduled maintenance and facility closure management',
        items: ['Banners on facility cards', 'Scheduled maintenance windows']
      },
      {
        title: 'Notifications (Light)',
        description: 'Basic notification system for status updates',
        items: ['In-app alerts for reopen/closure changes', 'Optional email summaries for admins']
      },
      {
        title: 'Kiosk / Guard Mode',
        description: 'Dedicated interface for security and front desk operations',
        items: ['Large scan button, high-contrast UI', 'Quick "End Session" override with reason']
      },
      {
        title: 'Data Ops',
        description: 'Automated data management and audit capabilities',
        items: ['Scheduled CSV exports (daily/weekly)', 'Basic audit log (admin overrides)']
      },
      {
        title: 'UX Enhancements',
        description: 'Improved user experience with better visual feedback',
        items: ['Loading skeletons, empty-state tips, tooltips']
      }
    ]
  },
  {
    id: 'phase3',
    title: 'Phase 3',
    status: 'coming_soon',
    badge: 'Coming Soon',
    sections: [
      {
        title: 'Housekeeping Module',
        description: 'Comprehensive facility maintenance and asset management',
        items: ['Ticketing (category, priority, location)', 'SLA timers & escalation ladder', 'Asset register (equipment, last service date)']
      },
      {
        title: 'Parcels & Visitors',
        description: 'Guest management and package handling system',
        items: ['Pre-registration (name, phone, host)', 'Entry log (OTP + scan), delivery handover record']
      },
      {
        title: 'Admin Workbench',
        description: 'Advanced administrative tools and role management',
        items: ['Bulk data import (CSV templates)', 'Role granularity (Guard vs Super Admin)']
      },
      {
        title: 'Light Analytics',
        description: 'Basic usage patterns and facility utilization insights',
        items: ['Heatmaps by hour/day', 'Utilization trends & peak windows']
      }
    ]
  },
  {
    id: 'phase4',
    title: 'Phase 4',
    status: 'coming_soon',
    badge: 'Coming Soon',
    sections: [
      {
        title: 'Amenities Expansion (Scan-to-Enter)',
        description: 'Extended facility types with specialized features',
        items: ['Laundry rooms (machine-level occupancy indicators)', 'Mess/Cafeteria feedback & daily menu display', 'Library study rooms (occupancy only; no bookings)']
      },
      {
        title: 'Integrations',
        description: 'Third-party system connections and hardware support',
        items: ['Hardware readers (ID card taps)', 'Directory/SSO (e.g., Google/Microsoft)']
      },
      {
        title: 'Multilingual UI',
        description: 'Localized interface for diverse user base',
        items: ['English/Hindi toggle']
      },
      {
        title: 'Advanced Analytics',
        description: 'Sophisticated data analysis and administrative insights',
        items: ['Cohort usage views, anomaly detection', 'Admin dashboards with drilldowns']
      }
    ]
  }
];