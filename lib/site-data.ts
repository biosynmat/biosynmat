export type NavLink = {
  href: string;
  label: string;
};

export type NewsItem = {
  title: string;
  date: string;
  summary: string;
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  researchgate?: string;
  orcid?: string;
};

export type ResearchScheme = {
  id: string;
  title: string;
  summary: string;
  image: string;
};

export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  url: string;
  coverTone: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/meet-ananya-mishra", label: "Meet Ananya Mishra" },
  { href: "/team", label: "Team" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/opportunities", label: "Opportunities" },
];

export const latestNews: NewsItem[] = [
  {
    title: "New collaborative project on synthetic compartment signaling",
    date: "March 2026",
    summary:
      "BioSynMat has initiated a multidisciplinary collaboration to model protocell communication dynamics under controlled gradients.",
  },
  {
    title: "Lab methods workshop for incoming scholars",
    date: "February 2026",
    summary:
      "A hands-on workshop introduced foundational nanoparticle assembly and artificial compartment characterization protocols.",
  },
  {
    title: "Conference poster accepted",
    date: "January 2026",
    summary:
      "Our latest work on emergent behavior in coupled protocell systems has been accepted for presentation at an international symposium.",
  },
];

export const piDetails = {
  name: "Dr. Ananya Mishra",
  title: "Assistant Professor, Department of Chemistry, SRMIST",
  email: "ananyam@srmist.edu.in",
  office: "SRM Institute of Science and Technology, Kattankulathur, Chennai",
  image: "/team/ananya.jpeg",
  linkedin: "https://www.linkedin.com/",
  researchgate: "https://www.researchgate.net/profile/Ananya-Mishra-48",
  orcid: "https://orcid.org/",
  bio: [
    "Dr Ananya Mishra is an Assistant Professor (Research) at the Department of Chemistry, SRMIST, Kattankulathur, Chennai since May 2025.",
    "She earned her BSc (Hons.) in Chemistry from Hindu College, University of Delhi. She subsequently joined Jawaharlal Nehru Centre for Advanced Scientific Research (JNCASR), Bangalore, as an Integrated PhD student, where she completed both her masters and doctoral studies under the supervision of Prof. Subi J. George. Her doctoral research focused on supramolecular chemistry with an emphasis on bioinspired self-assembly.",
    "Following her PhD, she pursued postdoctoral research in the group of Stephen Mann, FRS, where she was awarded the prestigious Marie Sklodowska-Curie Fellowship. Her postdoctoral work centered on the development of programmable protocells and prototissues, advancing the understanding of artificial cellular systems.",
  ],
  achievements: [
    "Awarded INSPIRE Faculty Fellowship in 2025 for 5 years.",
    "Awarded Researcher Development and Travel Grant worth GBP 500 by Royal Society of Chemistry for attending the conference Smart Condensates and Droplets Symposium 2024 at Cambridge, UK, 5th - 6th September.",
    "Invited speaker at Peter Timms Symposium held at University of Bristol, UK, 2nd July 2024.",
    "Invited speaker at Max Plank Bristol Centre Spring Meeting held at Reading, UK, 2nd - 3rd June 2024.",
    "Invited speaker at Gordon Research Conference and Seminar 2023, Self-assembly and Supramolecular Chemistry, held from May 13-19, 2023, in Les Diablerets, Switzerland.",
    "Invited speaker at SynCell 2022, held from 18-20 May 2022 in the Hague, The Netherlands.",
    "Granted Marie Sklodowska Curie (MSC)-Individual Fellowship for the project titled Programmed Protocells.",
    "GYTI, 2019 for the research work on Actin Mimetic ATP Driven Controlled Supramolecular Polymerization. This award was conferred to a total of 45 winners from all over the country in a variety of fields addressing the current challenges faced by the society. The award was presented by the Hon'ble Vice President of India.",
    "Best Poster Award entitled The Rising Star Award in the 2016 International Workshop on Supramolecular Chemistry and Functional Materials 2016 CEMSupra, Tsumagoi, Gunma, Japan.",
    "Best Poster award by Royal Society of Chemistry in Eighteenth Chemical Research Society of India, National Symposium in Chemistry, 2016 held in Chandigarh, Punjab, India.",
    "Best Poster Award in Winter School 2015 on Frontiers of Materials Science, JNCASR, Bangalore, India.",
    "Bapu Narayanaswamy Prize for the best master's Thesis titled Novel Chiral Auxiliary Designs for Helical Supramolecular Polymers, 2015.",
    "Babu Matru Prasad Scholarship, 2013 for 1st position in M.S. degree course, NCU, JNCASR.",
    "Post-graduate Indira Gandhi Scholarship for master's degree in chemical science by Union Grant Commission (August 2012-July 2014).",
  ],
  researchInterests: [
    "Nanoparticle-driven protocell assembly",
    "Synthetic cell-to-cell communication",
    "Emergent behavior in multicompartment systems",
    "Protocell-to-prototissue transition models",
  ],
};

export const teamMembers: TeamMember[] = [
  {
    name: "Aathila",
    role: "Research Scholar",
    image: "/team/aathila.jpg",
    linkedin: "https://www.linkedin.com/",
    researchgate: "https://www.researchgate.net/",
    orcid: "https://orcid.org/",
  },
  {
    name: "Deepthi",
    role: "Research Scholar",
    image: "/team/deepthi.jpg",
    linkedin: "https://www.linkedin.com/",
    researchgate: "https://www.researchgate.net/",
    orcid: "https://orcid.org/",
  },
  {
    name: "Jeevi",
    role: "Research Scholar",
    image: "/team/jeevi.jpg",
    linkedin: "https://www.linkedin.com/",
    researchgate: "https://www.researchgate.net/",
    orcid: "https://orcid.org/",
  },
];

export const researchSchemes: ResearchScheme[] = [
  {
    id: "scheme-1",
    title:
      "Mimicking Natural Cell to Cell Communication Using Synthetic Protocells",
    summary:
      "Design synthetic compartments that exchange molecular signals to emulate biological communication behavior with tunable control over timing and selectivity.",
    image: "/research/scheme-1.png",
  },
  {
    id: "scheme-2",
    title: "Protocells to Prototissues",
    summary:
      "Create higher-order assemblies where protocells organize into functional clusters that exhibit coordinated responses and collective behavior.",
    image: "/research/scheme-2.png",
  },
];

export const publications: Publication[] = [
  {
    id: "pub-1",
    title: "Programmable Signaling in Nanoparticle-Based Protocell Networks",
    authors: "A. Mishra, R. Kumar, L. Chen",
    venue: "Journal of Synthetic Matter",
    year: 2026,
    abstract:
      "This placeholder publication presents a modular framework for engineering signal transduction pathways across synthetic protocell populations under controlled laboratory conditions.",
    url: "https://example.org/publication/1",
    coverTone: "from-cyan-100 to-cyan-50",
  },
  {
    id: "pub-2",
    title: "Emergent Coordination in Coupled Protocell Assemblies",
    authors: "A. Mishra, P. Singh, E. Roy",
    venue: "Advanced Biomimetic Systems",
    year: 2025,
    abstract:
      "This placeholder study examines collective response dynamics when protocells are coupled through diffusible chemical mediators and adaptive boundaries.",
    url: "https://example.org/publication/2",
    coverTone: "from-sky-100 to-sky-50",
  },
  {
    id: "pub-3",
    title: "Chemical Pattern Formation in Synthetic Compartment Communities",
    authors: "A. Mishra, M. Das, K. Ito",
    venue: "Nanointerfaces Letters",
    year: 2025,
    abstract:
      "A placeholder report on pattern formation mechanisms emerging in engineered protocell communities under gradient-driven stimulation.",
    url: "https://example.org/publication/3",
    coverTone: "from-emerald-100 to-emerald-50",
  },
  {
    id: "pub-4",
    title: "Prototissue Precursors from Adaptive Protocell Clusters",
    authors: "A. Mishra, V. Patel, S. Rao",
    venue: "Chemical Systems Engineering",
    year: 2024,
    abstract:
      "Placeholder publication exploring adaptive self-organization pathways from discrete protocells to tissue-like multicompartment architectures.",
    url: "https://example.org/publication/4",
    coverTone: "from-amber-100 to-amber-50",
  },
  {
    id: "pub-5",
    title: "Synthetic Membrane Logic for Inter-Compartment Communication",
    authors: "A. Mishra, D. Wang, T. Gill",
    venue: "Biomaterials Frontiers",
    year: 2024,
    abstract:
      "This placeholder article details logical gating approaches for selective transport and response behavior in artificial compartment membranes.",
    url: "https://example.org/publication/5",
    coverTone: "from-indigo-100 to-indigo-50",
  },
  {
    id: "pub-6",
    title: "Design Principles for Scalable Protocell Platforms",
    authors: "A. Mishra, N. Ali, H. Bose",
    venue: "Applied Soft Matter",
    year: 2023,
    abstract:
      "Placeholder publication outlining practical design principles for robust, scalable, and experimentally reproducible protocell systems.",
    url: "https://example.org/publication/6",
    coverTone: "from-teal-100 to-teal-50",
  },
];

export const galleryTiles = [
  { title: "Nanoparticle Assembly", span: "md:col-span-2 md:row-span-2" },
  { title: "Microscopy Session", span: "md:col-span-1 md:row-span-1" },
  { title: "Signal Assay", span: "md:col-span-1 md:row-span-2" },
  { title: "Lab Discussion", span: "md:col-span-2 md:row-span-1" },
  { title: "Protocell Cluster", span: "md:col-span-1 md:row-span-1" },
  { title: "Data Analysis", span: "md:col-span-1 md:row-span-1" },
  { title: "Device Setup", span: "md:col-span-2 md:row-span-1" },
  { title: "Team Workshop", span: "md:col-span-1 md:row-span-1" },
];

export const collaborationAreas = [
  "Prospective PhD and MSc students interested in synthetic biology and soft materials",
  "Postdoctoral scholars with experience in nanoparticle systems and bioinspired chemistry",
  "Academic collaborators working on protocells, artificial life, and multiscale modeling",
  "Industry and translational partners exploring biomimetic material platforms",
];
