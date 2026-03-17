export type NavLink = {
  href: string;
  label: string;
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
