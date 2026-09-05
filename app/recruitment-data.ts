export type Position = {
  slug: string;
  title: string;
  status: string;
  mode: string;
  commitment: string;
  summary: string;
  tags: string[];
  overview: string[];
  responsibilities: string[];
  fit: string[];
};

// Add another object to this array to publish a new opportunity card and detail view.
export const positions: Position[] = [
  {
    slug: 'research-collaborator',
    title: 'Research collaborator',
    status: 'Open call',
    mode: 'Remote / flexible',
    commitment: 'Project based',
    summary: 'Develop a focused experiment, dataset, simulator contribution, or research note with PNTL.',
    tags: ['GNSS', 'Navigation', 'Open research'],
    overview: [
      'This opportunity is for students, researchers, and developers interested in a clearly bounded positioning, navigation, or timing project.',
      'Scope, responsibilities, timelines, attribution, intellectual property, and any authorship expectations are agreed before work begins.',
    ],
    responsibilities: ['Own a defined research task.', 'Document methods, assumptions, and results.', 'Share progress clearly and review work constructively.'],
    fit: ['You can work independently on a realistic scope.', 'You care about reproducibility and accurate attribution.', 'You are curious about difficult navigation environments.'],
  },
  {
    slug: 'student-research-contributor',
    title: 'Student research contributor',
    status: 'Expressions of interest',
    mode: 'Remote / flexible',
    commitment: 'Scope by agreement',
    summary: 'Learn through a small, documented contribution to data collection, analysis, simulation, or technical communication.',
    tags: ['Students', 'Python', 'Field data'],
    overview: [
      'This pathway is designed for students building experience in GNSS, sensor fusion, field evaluation, or research software.',
      'Each contribution begins with a written scope covering supervision, expected output, credit, timing, and practical terms.',
    ],
    responsibilities: ['Complete an agreed, manageable work package.', 'Keep a transparent record of sources and decisions.', 'Ask focused questions and communicate blockers early.'],
    fit: ['You are learning Python, data analysis, or navigation fundamentals.', 'You can commit to a defined timeline.', 'You value careful work more than impressive claims.'],
  },
];
