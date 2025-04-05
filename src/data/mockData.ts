
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  logo: string;
  postedDate: string;
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: number;
  bio: string;
  photo: string;
  education: string;
}

export const mockJobs: Job[] = [
  {
    id: "job1",
    title: "Frontend Developer",
    company: "TechMindz India",
    location: "Bangalore, Karnataka",
    salary: "₹12,00,000 - ₹18,00,000",
    description: "We're looking for a talented Frontend Developer to join our growing team. You'll be responsible for building user interfaces for our web applications.",
    requirements: ["React", "TypeScript", "CSS/SCSS", "3+ years experience"],
    logo: "https://via.placeholder.com/150?text=TechMindz",
    postedDate: "2 days ago"
  },
  {
    id: "job2",
    title: "UX Designer",
    company: "DesignVista",
    location: "Remote (India)",
    salary: "₹8,00,000 - ₹12,00,000",
    description: "Join our design team to create beautiful and intuitive user experiences for our clients. You'll work closely with product managers and developers.",
    requirements: ["Figma", "User Research", "Prototyping", "2+ years experience"],
    logo: "https://via.placeholder.com/150?text=DesignVista",
    postedDate: "1 week ago"
  },
  {
    id: "job3",
    title: "Data Scientist",
    company: "Analytics Bharat",
    location: "Mumbai, Maharashtra",
    salary: "₹15,00,000 - ₹22,00,000",
    description: "We're expanding our data science team to help build our AI-powered analytics platform. You'll work with large datasets and develop machine learning models.",
    requirements: ["Python", "Machine Learning", "SQL", "Statistics", "5+ years experience"],
    logo: "https://via.placeholder.com/150?text=AnalyticsBharat",
    postedDate: "3 days ago"
  },
  {
    id: "job4",
    title: "Product Manager",
    company: "StartupX Innovations",
    location: "Delhi NCR",
    salary: "₹18,00,000 - ₹25,00,000",
    description: "Lead product development for our B2B SaaS platform. You'll work with cross-functional teams to define the product roadmap and ensure successful delivery.",
    requirements: ["Product Strategy", "Agile Methodologies", "User Research", "4+ years experience"],
    logo: "https://via.placeholder.com/150?text=StartupX",
    postedDate: "Just now"
  },
  {
    id: "job5",
    title: "Backend Engineer",
    company: "CloudTech Solutions",
    location: "Hyderabad, Telangana",
    salary: "₹14,00,000 - ₹20,00,000",
    description: "Build scalable and robust backend systems for our cloud infrastructure. You'll design APIs and optimize database performance.",
    requirements: ["Node.js", "Python", "AWS", "Microservices", "3+ years experience"],
    logo: "https://via.placeholder.com/150?text=CloudTech",
    postedDate: "5 days ago"
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: "candidate1",
    name: "Arjun Sharma",
    title: "Senior Frontend Developer",
    location: "Bangalore, Karnataka",
    skills: ["React", "TypeScript", "Node.js", "CSS/SCSS"],
    experience: 5,
    bio: "Passionate developer with a focus on creating smooth user experiences. I've worked at startups and large companies, building complex web applications.",
    photo: "https://i.pravatar.cc/300?img=1",
    education: "B.Tech in Computer Science, IIT Delhi"
  },
  {
    id: "candidate2",
    name: "Priya Patel",
    title: "UX/UI Designer",
    location: "Mumbai, Maharashtra",
    skills: ["Figma", "User Research", "Prototyping", "Adobe Creative Suite"],
    experience: 4,
    bio: "Creative designer with an eye for detail. I love solving complex user problems through thoughtful design and iterative improvements.",
    photo: "https://i.pravatar.cc/300?img=2",
    education: "Bachelor of Design, NID Ahmedabad"
  },
  {
    id: "candidate3",
    name: "Vikram Mehta",
    title: "Full Stack Developer",
    location: "Remote (India)",
    skills: ["JavaScript", "React", "Python", "Django", "PostgreSQL"],
    experience: 6,
    bio: "Full stack developer with a passion for building scalable web applications. I enjoy working on challenging problems and learning new technologies.",
    photo: "https://i.pravatar.cc/300?img=3",
    education: "M.Tech in Software Engineering, BITS Pilani"
  },
  {
    id: "candidate4",
    name: "Neha Reddy",
    title: "Product Manager",
    location: "Chennai, Tamil Nadu",
    skills: ["Product Strategy", "Agile", "User Research", "Data Analysis"],
    experience: 8,
    bio: "Product leader focused on delivering value to users. I have a technical background and excel at bridging the gap between business and development teams.",
    photo: "https://i.pravatar.cc/300?img=4",
    education: "MBA, IIM Bangalore"
  },
  {
    id: "candidate5",
    name: "Raj Malhotra",
    title: "Data Scientist",
    location: "Pune, Maharashtra",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Data Visualization"],
    experience: 3,
    bio: "Data scientist with a knack for finding insights in complex datasets. I enjoy applying machine learning to solve real-world business problems.",
    photo: "https://i.pravatar.cc/300?img=5",
    education: "PhD in Statistics, ISI Kolkata"
  }
];
