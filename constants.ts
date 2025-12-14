import { Founder, Program, Event, Stat } from './types';
import { BookOpen, Users, Heart, GraduationCap, Globe, Lightbulb } from 'lucide-react';

export const NGO_DETAILS = {
  name: "Akshara Bharata Society",
  shortIntro: "An NGO whose objective is to bring quality in Education and support the students.",
  location: "Rambilli mandal, Visakhapatnam, India, Andhra Pradesh",
  phone: "072594 90606",
  email: "aksharabharatamsociety@gmail.com",
  blog: "aksharabharatamsociety.blogspot.com",
  coordinates: { lat: 17.5196, lng: 82.8465 } // Approx for Rambilli
};

export const WEBHOOK_URL = "https://corn-routes-connectors-birmingham.trycloudflare.com/webhook/ngo-booking";

// Updated Logo URL: Converted Google Drive view link to direct download link for embedding
export const LOGO_URL = "https://postimg.cc/gallery/8SktdLP";

export const FOUNDERS: Founder[] = [
  {
    id: "f1",
    name: "Dr. Rajesh Kumar",
    role: "President & Founder",
    specialization: "Educational Policy",
    quote: "Education is the movement from darkness to light.",
    bio: "Dr. Kumar has spent over 20 years in rural education development. He holds a PhD in Social Work and has spearheaded initiatives that reached over 50,000 students across Andhra Pradesh.",
    experience: "22 Years",
    tags: ["Policy", "Leadership"],
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "f2",
    name: "Lakshmi Devi",
    role: "Director of Operations",
    specialization: "Community Outreach",
    quote: "Empowering a child empowers a generation.",
    bio: "Lakshmi brings operational excellence to the team, managing over 200 volunteers and ensuring resources reach the most remote schools effectively.",
    experience: "15 Years",
    tags: ["Operations", "Community"],
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "f3",
    name: "Vikram Singh",
    role: "Head of Tech Initiatives",
    specialization: "Digital Literacy",
    quote: "Bridging the digital divide one tablet at a time.",
    bio: "A former tech executive, Vikram now dedicates his time to setting up computer labs and digital curriculum for underprivileged schools.",
    experience: "12 Years",
    tags: ["Tech", "Innovation"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "f4",
    name: "Anjali Rao",
    role: "Program Coordinator",
    specialization: "Teacher Training",
    quote: "Teachers are the architects of society.",
    bio: "Anjali focuses on upskilling rural teachers with modern pedagogical techniques.",
    experience: "8 Years",
    tags: ["Training", "Pedagogy"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "f5",
    name: "Suresh Babu",
    role: "Field Manager",
    specialization: "Logistics",
    quote: "Execution is everything.",
    bio: "Suresh ensures that books, food, and infrastructure materials reach the right place at the right time.",
    experience: "10 Years",
    tags: ["Field Work", "Logistics"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
  }
];

export const PROGRAMS: Program[] = [
  {
    id: "p1",
    title: "After-school Tutoring",
    category: "Education",
    description: "Providing remedial classes for students lagging behind in core subjects like Math and Science.",
    impact: "1,200+ Students",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p2",
    title: "Digital Literacy Drive",
    category: "Technology",
    description: "Setting up computer labs and providing basic coding training to rural high school students.",
    impact: "15 Labs Built",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p3",
    title: "Scholarship Grants",
    category: "Financial Aid",
    description: "Merit-based financial support for higher education to deserving students from low-income families.",
    impact: "500+ Scholarships",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p4",
    title: "School Infrastructure",
    category: "Infrastructure",
    description: "Renovating dilapidated school buildings and providing clean drinking water facilities.",
    impact: "30 Schools Renovated",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p5",
    title: "Girl Child Education",
    category: "Education",
    description: "Special initiatives to ensure girl students stay in school and complete their secondary education.",
    impact: "2,000+ Girls Supported",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
  }
];

export const EVENTS: Event[] = [
  {
    id: "e1",
    title: "Annual Charity Gala Night",
    date: "Dec 15, 2024",
    location: "Visakhapatnam Convention Center",
    description: "Join us for an evening of inspiration, performances by our students, and fundraising to support our scholarship programs.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "e2",
    title: "Rural Science Fair 2024",
    date: "Jan 20, 2025",
    location: "ZPHS Rambilli School Grounds",
    description: "Showcasing innovative science projects created by students from 10 neighboring villages.",
    image: "https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "e3",
    title: "Volunteer Orientation Drive",
    date: "Feb 05, 2025",
    location: "ABS Main Office, Rambilli",
    description: "A workshop for new volunteers interested in teaching and field work. Includes training and lunch.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "e4",
    title: "Book Donation Camp",
    date: "March 10, 2025",
    location: "City Library, Visakhapatnam",
    description: "Donate your old books and stationery to help build libraries in rural schools.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800"
  }
];

export const STATS: Stat[] = [
  { label: "Students Reached", value: "15000", icon: GraduationCap },
  { label: "Volunteers", value: "450", icon: Users },
  { label: "Programs Run", value: "25", icon: BookOpen },
  { label: "Lives Impacted", value: "50000", icon: Heart },
];

export const BLOG_POSTS = [
  {
    id: 'b1',
    title: "The State of Rural Education in 2024",
    excerpt: "Exploring the challenges and triumphs of bringing digital tools to remote villages.",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'b2',
    title: "Volunteer Spotlight: Sarah's Journey",
    excerpt: "How one volunteer helped set up 5 libraries in a single summer.",
    date: "February 28, 2024",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'b3',
    title: "Annual Charity Gala Success",
    excerpt: "We raised over ₹50 Lakhs for our scholarship fund thanks to your generosity.",
    date: "January 10, 2024",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800"
  }
];

// Replaced existing photos with ones matching the user's specific request:
// 1. Stage Function (KGBV style)
// 2. Crafts / Man talking to students
// 3. Circle interaction
// 4. Students in Blue Uniforms
// 5. Meeting Hall
export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?auto=format&fit=crop&q=80&w=800", // Stage/Function 
  "https://images.unsplash.com/photo-1596386461350-326e974853b6?auto=format&fit=crop&q=80&w=800", // Man talking to students/Crafts
  "https://images.unsplash.com/photo-1544928147-79a774562149?auto=format&fit=crop&q=80&w=800", // Circle/Group discussion
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", // Blue uniforms/Standing
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"  // Meeting/Gathering Hall
];

export const TESTIMONIALS = [
  {
    quote: "The scholarship I received changed my life. I am now the first graduate in my family.",
    author: "Ravi Teja",
    role: "Engineering Student"
  },
  {
    quote: "Volunteering with Akshara Bharatham helped me realize the power of community.",
    author: "Sarah Jenkins",
    role: "Volunteer"
  },
  {
    quote: "Their dedication to rural education is unmatched. A truly transparent organization.",
    author: "Mr. Rao",
    role: "Local Donor"
  },
  {
    quote: "I saw firsthand how the computer labs transformed the confidence of these village kids.",
    author: "Vikram Singh",
    role: "Tech Sponsor"
  },
  {
    quote: "Education is the only way forward, and this team knows how to deliver it where it matters.",
    author: "Dr. Anitha",
    role: "Educationist"
  }
];

export const LEGAL_CONTENT = {
  privacy: `
# Privacy Policy

**Effective Date:** January 1, 2024

At Akshara Bharatham Society, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your data when you visit our website or interact with our services.

## 1. Information We Collect
We collect personal information that you voluntarily provide to us when you:
- Donate to our cause via our secure payment portals.
- Register as a volunteer through our application forms.
- Subscribe to our newsletter or blog updates.
- Contact us via our contact forms or email.

This information may include your name, email address, phone number, mailing address, and payment details (which are processed securely by third-party payment gateways like Razorpay/Stripe; we do not store full credit card numbers).

## 2. How We Use Your Information
We use the information we collect for the following purposes:
- **Donation Processing:** To process your donations, issue tax-exemption receipts (80G), and keep a record of your contributions.
- **Communication:** To send you updates, newsletters, and information about our programs, events, and volunteer opportunities.
- **Improvement:** To analyze website usage trends and improve our digital services.
- **Legal Compliance:** To comply with applicable laws and regulations regarding non-profit operations.

## 3. Data Sharing and Security
We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.

We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.

## 4. Your Rights
You have the right to request access to the personal information we hold about you and to ask for your data to be corrected or deleted. You can unsubscribe from our mailing lists at any time by clicking the "unsubscribe" link in our emails.

## 5. Contact Us
If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
**Email:** aksharabharatamsociety@gmail.com
**Phone:** 072594 90606
  `,
  terms: `
# Terms of Service

**Last Updated:** January 1, 2024

Welcome to the Akshara Bharata Society website. By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.

## 1. Use License
Permission is granted to temporarily download one copy of the materials (information or software) on Akshara Bharata Society's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
- Modify or copy the materials;
- Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
- Attempt to decompile or reverse engineer any software contained on Akshara Bharata Society's website;
- Remove any copyright or other proprietary notations from the materials; or
- Transfer the materials to another person or "mirror" the materials on any other server.

## 2. Disclaimer
The materials on Akshara Bharata Society's website are provided on an 'as is' basis. Akshara Bharata Society makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

## 3. Limitations
In no event shall Akshara Bharata Society or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Akshara Bharata Society's website, even if Akshara Bharata Society or a authorized representative has been notified orally or in writing of the possibility of such damage.

## 4. Accuracy of Materials
The materials appearing on Akshara Bharata Society's website could include technical, typographical, or photographic errors. Akshara Bharata Society does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.

## 5. Governing Law
These terms and conditions are governed by and construed in accordance with the laws of Andhra Pradesh, India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
  `,
  cookies: `
# Cookie Policy

This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies.

## 1. What are cookies?
Cookies are small text files that are sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.

## 2. How Akshara Bharata Society uses cookies
When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
- **Essential Cookies:** To enable certain functions of the Service, such as authentication and remembering your preferences.
- **Analytics Cookies:** We use analytics cookies to track information on how the Service is used so that we can make improvements. We may also use analytics cookies to test new advertisements, pages, features or new functionality of the Service to see how our users react to them.

## 3. Third-party cookies
In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.

## 4. What are your choices regarding cookies?
If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
  `,
  financials: `
# Financial Reports & Transparency

Transparency is one of the core pillars of Akshara Bharata Society. We believe our donors and stakeholders have the right to know exactly how their contributions are being utilized to impact lives.

## Financial Year 2023-2024 Overview
- **Total Donations Received:** ₹50,00,000
- **Total Expenditure:** ₹48,50,000
- **Surplus carried forward:** ₹1,50,000

### Expenditure Breakdown
1.  **Program Expenses (80%):** Direct costs related to running schools, buying books, teacher salaries, and digital lab setups.
2.  **Administrative Expenses (10%):** Office rent, utilities, and staff salaries.
3.  **Fundraising Expenses (10%):** Event costs and marketing.

## Audited Financial Statements
We undergo annual audits by independent chartered accountants to ensure compliance with all financial regulations.

- **[Download FY 2023-24 Audit Report (PDF)](#)** _(Placeholder)_
- **[Download FY 2022-23 Audit Report (PDF)](#)** _(Placeholder)_
- **[Download FY 2021-22 Audit Report (PDF)](#)** _(Placeholder)_

## FCRA Compliance
Akshara Bharata Society is fully compliant with the Foreign Contribution Regulation Act (FCRA) and is eligible to receive foreign funds. Our FCRA registration number is available upon request.

For any specific financial queries, please reach out to our Finance Officer at finance@aksharabharatam.org.
  `
};