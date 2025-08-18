import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

const Projects = () => {
  const cards = projectsData.slice(0, 8); // or however many
  const HEADER_OFFSET = 96; // space below your sticky header
  const STEP = 56;          // vertical step between sticky cards
  const BASE_Z = 20;        // starting z-index for the first card

  return (
    // isolate creates a new stacking context so child z-indexes work predictably
    <div id="projects" className="relative isolate z-0 my-12 lg:my-24">
      {/* Sticky section header - keep it below cards */}
      <div className="sticky top-10 z-10">
        {/* Make the blurred circle sit behind everything */}
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 blur-3xl opacity-30 -z-10 pointer-events-none" />
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]" />
        </div>
      </div>

      <div className="pt-24">
        <div className="relative flex flex-col gap-6">
          {cards.map((project, i) => (
            <div
              key={i}
              className="sticky mx-auto w-full max-w-2xl"
              style={{
                top: HEADER_OFFSET + i * STEP,
                // later cards are ABOVE earlier ones
                zIndex: BASE_Z + i,
              }}
            >
              {/* Give the card an opaque bg so it visually sits on top */}
              <div className="relative rounded bg-white shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-500">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}

          {/* Spacer so the last sticky card can reach its top */}
          <div style={{ height: HEADER_OFFSET + (cards.length + 1) * STEP }} />
        </div>
      </div>
    </div>
  );
};

export default Projects;
