/* ============================================================
   Content for the monograph. Copy is Aashi's own, carried over
   from the static edition so nothing is paraphrased in transit.
   ============================================================ */

export const profile = {
  name: 'Aashi Richhariya',
  meridian: 'Toronto \u00b7 43\u00b0N 79\u00b0W',
  email: 'aashi.rich@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aashi-richhariya-81415a163',
  /* The hero used to open with "The block is the new screen. Agentic
     platforms are composed of contracts, not pages." That is a thesis
     statement, not an introduction: a recruiter three seconds in
     learned neither the title nor the discipline. Role first, then
     what the role actually does, in words a hiring manager uses. */
  role: "Principal Product Designer",
  discipline: "Design Systems",
  tagline: "I design the systems other teams build on: token architecture, multi-brand theming and the governance that holds them together at Fortune 500 scale.",
  /* The soft gate on the locked case studies. Change it here. */
  casePin: "2026",
  scope: "50+ designers \u00b7 7 product tracks \u00b7 4 brands",
};

export type PlateMeta = { k: string; v: string };
export type Plate = {
  id: string;
  client: string;
  logo: string | null;
  /* Pulled from each case page's cover in the static edition, so the
     listing can say who the work was for and what it was in one line
     without reprinting the essay. `lede` is the first sentence of
     `dek`; the full `dek` opens the project page. */
  sector: string | null;
  lede: string;
  dek: string;
  clientFull: string | null;
  role: string | null;
  duration: string | null;
  /* The case study itself, lifted from each project's own page in the
     static edition. This is the detail the index no longer carries. */
  sections: {
    label: string | null;
    heading: string | null;
    paras: string[];
    bullets?: string[];
    figures?: { src: string; alt: string; caption: string }[];
  }[];
  outcomes: { stat: string; label: string }[];
  titleTop: string;
  titleItalic: string;
  year: string;
  meta: PlateMeta[];
  body: string[];
};

export const plates: Plate[] = [
  {
    "id": "coreai",
    "client": "Publicis Sapient",
    "clientFull": "Publicis Sapient · CoreAI",
    "logo": "/logos/publicisgroupe.png",
    "sector": "AI workflow · Enterprise platform",
    "year": "2023 / 2025",
    "titleTop": "The App Framework",
    "titleItalic": "on CoreAI.",
    "role": "Design Lead, App Framework",
    "duration": "Publicis Groupe · pharma, finance and CPG",
    "lede": "The foundation of an agentic platform: the block container, build and run modes, the context plane and the conversational surface.",
    "dek": "The foundation of Publicis Groupe's agentic AI platform: the block container, Build and Run modes, the Context Plane and the ALX conversational surface. A ground-up redesign for the way teams build with autonomous agents and the component vocabulary seven product tracks now ship against.",
    "meta": [
      {
        "k": "Client",
        "v": "Publicis Groupe: internal platform."
      },
      {
        "k": "Medium",
        "v": "Agentic platform UX. App framework, workflow surfaces, agent-native conversational layer."
      },
      {
        "k": "Dimensions",
        "v": "Foundation for 7 product tracks. 50+ designers build against it; 100+ workflow templates run on it."
      },
      {
        "k": "Role",
        "v": "Lead Experience Designer. I own the framework end-to-end; App Framework ownership since May 2024."
      }
    ],
    "body": [],
    "sections": [
      {
        "label": "The Brief",
        "heading": "An agent-first platform, redesigned from the ground up.",
        "paras": [
          "As artificial intelligence shifts from static models to intelligent, autonomous agents, CoreAI set out to create a platform that empowers teams to build, customize and run agentic workflows across industries.",
          "The v3 platform (codenamed Hudson) was a ground up redesign built around modular agents that could reason, act and collaborate. These agents weren't just tools; they were decision makers with context, capable of driving real outcomes across domains like pharma, finance and consumer goods.",
          "As Design Lead for the App Framework, I was responsible for designing CoreAI's foundational experiences:"
        ],
        "bullets": [
          "The block container, the modular unit that powers every workflow",
          "Build Mode, where teams create, test and configure agentic workflows",
          "Run Mode, where end users execute those workflows and see intelligent results",
          "The Context Plane, a shared memory system powering contextual understanding",
          "ALX, a conversational interface that collects inputs, configures agents and gathers insights in real time"
        ],
        "figures": [
          {
            "src": "/case/coreai/cover.jpg",
            "alt": "The CoreAI v3 platform, across its surfaces",
            "caption": "The v3 platform. One component vocabulary across seven product tracks."
          }
        ]
      },
      {
        "label": "The Problem",
        "heading": "Users were no longer calling models. They were building systems.",
        "paras": [
          "The introduction of agentic workflows added a new layer of complexity. Users weren't just calling models anymore; they were building intelligent systems that needed configuration, memory, tools and oversight.",
          "Earlier versions were rigid for advanced customisation, complex for the non-technical operators who used them daily and opaque exactly where it mattered: they lacked clear transparency into how agents reasoned and acted."
        ],
        "bullets": [
          "Designing an approachable, modular system for building agent workflows",
          "Ensuring clarity across multiple modes of interaction: visual and conversational",
          "Creating a cohesive design system across 7+ teams and 50+ designers",
          "Supporting data-rich, stateful and asynchronous workflows without overwhelming the user"
        ],
        "figures": []
      },
      {
        "label": "The Work",
        "heading": "The block and the two modes built on it.",
        "paras": [
          "The block container is the core building unit of the entire CoreAI platform. Every agent, task and tool is encapsulated inside a block, making it the visual and functional foundation of workflows. The block container had to support both novice users and advanced developers, serving as a scalable UI model for the entire platform.",
          "Build Mode is where creators and admins configure their agents and connect them into complete workflows. Think of it as a no code development environment for intelligent systems. Build Mode empowered creators without overwhelming them by balancing transparency with control.",
          "Run Mode is where workflows are triggered by end users to generate intelligent outputs. Here the focus shifts from creation to execution, delivering a clean, minimal experience. This was the interface most clients touched daily, so clarity, speed and confidence were key."
        ],
        "bullets": [
          "Consistent structure across input, processing and output types",
          "Drag-and-drop composition of agentic blocks, with visual cues for task types, execution paths and dependencies",
          "Templated Run Mode views per workflow type, with inline customisation of inputs",
          "An expandable insights panel showing reasoning paths, context sources and tool actions"
        ],
        "figures": [
          {
            "src": "/case/coreai/block-container.jpg",
            "alt": "Block component setup",
            "caption": "The block container. Every agent, task and tool lives inside one."
          },
          {
            "src": "/case/coreai/build-mode.jpg",
            "alt": "Build Mode documentation",
            "caption": "Build Mode. A no-code environment for composing agentic workflows."
          },
          {
            "src": "/case/coreai/run-mode.jpg",
            "alt": "Run Mode workflow",
            "caption": "Run Mode. The surface most clients touched daily."
          }
        ]
      },
      {
        "label": "Context",
        "heading": "Agents reason only as well as what they can see.",
        "paras": [
          "Agentic workflows require more than just input: they need access to relevant context to reason well. I led the design of the Context Plane, which lets people upload documents, databases and structured data, manage the knowledge tied to a workflow and inspect what an agent actually sees before it decides anything.",
          "Not all users interact via visual workflows; many prefer natural language. ALX is the conversational layer. I designed it to balance familiar chat interaction with the depth of agentic reasoning happening behind the scenes, using structured message components for hybrid input and smart fallback flows for errors, ambiguity or missing data."
        ],
        "bullets": [
          "Safe, predictable Retrieval-Augmented Generation, with fallback states for missing or malformed context",
          "Reuse of block-level metadata, so the conversational and visual modes stay consistent"
        ],
        "figures": [
          {
            "src": "/case/coreai/context-plane.jpg",
            "alt": "Context Plane accessibility documentation",
            "caption": "The Context Plane, with its accessibility specification."
          }
        ]
      },
      {
        "label": "Standards",
        "heading": "Systems aren't just well designed. They are teachable.",
        "paras": [
          "As the CoreAI platform scaled across teams and clients, I recognized that great systems aren't just well designed; they're sustainable, shareable and teachable.",
          "I led cross functional initiatives that helped stabilize a v1 launch timeline, align 50+ designers on shared standards and reduce engineering ambiguity through clear QA practices.",
          "Leadership, for me, isn't about claiming credit. It's about making space for better ideas, quieter voices and more thoughtful execution and about holding high standards while multiplying the talent around you."
        ],
        "bullets": [
          "Documentation that designers and engineers could grow within",
          "Component standards defined with the design systems team",
          "Keyboard-friendly navigation and screen reader support across blocks, canvas and execution flows",
          "Guidance and fallback mechanisms for varying levels of AI literacy"
        ],
        "figures": [
          {
            "src": "/case/coreai/block-spec.jpg",
            "alt": "Block container specification sheet",
            "caption": "The written standard. What the component is and what it owes a user."
          }
        ]
      }
    ],
    "outcomes": [
      {
        "stat": "$100M",
        "label": "New investment secured post-MVP."
      },
      {
        "stat": "$5M+",
        "label": "New client business from enterprise sectors."
      },
      {
        "stat": "7+",
        "label": "Teams shipping on one shared design foundation."
      },
      {
        "stat": "40%",
        "label": "Faster time-to-workflow for internal and external users."
      }
    ]
  },
  {
    "meta": [],
    "body": [],
    "logo": "/logos/circlek.png",
    "sections": [],
    "outcomes": [],
    "clientFull": "Circle K · Alimentation Couche-Tard",
    "role": "Principal Design System Lead",
    "duration": null,
    "titleItalic": "revival.",
    "id": "circlek",
    "client": "Circle K",
    "sector": "Retail · Design systems",
    "year": "2025 / Present",
    "titleTop": "A design system",
    "lede": "Reviving the core design system across multiple products, including the global mobile application and bringing acquired ventures under one design ecosystem.",
    "dek": "Reviving the core design system across multiple products, including the global mobile application and bringing acquired ventures under one design ecosystem. Commissioned to build a streamlined design-system practice that scales across the organisation."
  },
  {
    "meta": [],
    "body": [],
    "logo": "/logos/mercor.png",
    "sections": [],
    "outcomes": [],
    "clientFull": "Mercor",
    "role": "Model evaluation and eval tooling design",
    "duration": null,
    "titleItalic": "model output.",
    "id": "mercor",
    "client": "Mercor",
    "sector": "AI · Model evaluation",
    "year": "2024 / 2026",
    "titleTop": "Evaluating",
    "lede": "Evaluating model output and designing the tooling evaluators work in, for a frontier AI lab.",
    "dek": "Evaluating model output and designing the tooling evaluators work in, for a frontier AI lab. Engaged through Mercor; the lab is not named."
  },
  {
    "id": "hungerhub",
    "titleTop": "The kitchen",
    "titleItalic": "at 11:47.",
    "year": "2020 / 2022",
    "meta": [],
    "body": [],
    "client": "hungerhub",
    "logo": "/logos/hungerhub.png",
    "sector": "Food operations · B2B",
    "lede": "Slow order acknowledgment was costing Hungerhub money.",
    "dek": "Slow order acknowledgment was costing Hungerhub money. When a kitchen was slow to confirm an order, the food started late, the delivery window slipped and the missed window came back as a support ticket, a refund and eventually a churned corporate account. Acknowledgment was the first domino and the only one design could move, so I rebuilt both surfaces around it: the restaurant partner dashboard and the Uncatering B2B web experience. Acknowledgment time fell 38%, missed-order tickets fell 51%, order volume rose 35%.",
    "clientFull": "Hungerhub",
    "role": "Product Designer",
    "duration": "August 2020 – January 2022",
    "sections": [
      {
        "label": "The Brief",
        "heading": "One metric predicted the money.",
        "paras": [
          "A dashboard is a tool only when nobody has time to read it. Before I drew a screen, I went looking for the number that explained the platform's losses and it was not a design metric. It was acknowledgment time: the seconds between an order arriving in a restaurant and someone in that kitchen confirming it. The chain runs in one direction and it is short: a slow acknowledgment means the food starts late; late food means a driver waits or a delivery window is missed; a missed window becomes a support ticket and a refund; refunds and churned corporate accounts are what the platform actually pays for. Nobody had asked me for that number. It was simply the one that decided whether a service went well and nothing on the screen was treating it as important.",
          "That gave me the brief I wanted rather than the one I was handed. I designed two surfaces against it: the restaurant partner dashboard, where the live order floor runs hot at noon and the Uncatering B2B web experience, where corporate clients schedule team meals at a slower but no less exacting tempo. Two audiences, one platform, two completely different time signatures; the planner has half an hour to compose an order, the line cook has nine seconds to acknowledge one. My job was to make the system respect both rhythms without leaking one into the other."
        ]
      },
      {
        "label": "The Work",
        "heading": "Two surfaces, two tempos, one platform.",
        "paras": [
          "I owned UX and UI end to end on a small team and I ran the work on a weekly cadence: design on Monday, ship on Friday, stand in the lunch rush on Tuesday, adjust. Every release passed through a live floor before anyone called it done. That cadence was the design operating system on this engagement: it is what kept a two-surface platform coherent without a large team or a long specification.",
          "Operators do not study screens at 11:47. They glance. So I designed the dashboard around what an operator could resolve in a quarter-second (order state, SLA status, escalation flag) in that order and nothing else at that level. Anything slower to read than a glance I demoted to a panel that opened on intent. Fewer things on the screen was the point, not a side effect.",
          "The corporate planner has a different problem: assemble a meal for twenty-two people, respect dietary restrictions, hit a delivery window and justify the order to a finance team. I designed Uncatering as a composed experience: dietary filters that did not interrupt, totals that updated quietly and an order summary clean enough to forward to procurement without editing. Every one of those choices removes a reason for a corporate account to stop ordering.",
          "Live operations are unforgiving: the dashboard had to stay readable when seventeen orders arrived in three minutes. I designed the real-time state model with the engineering team (what updates in place, what animates in, what queues, what earns a notification) and the engineers who built the socket layer set the update budget I designed inside. The screen got calmer as load increased, not noisier. The right details rose; the wrong ones receded.",
          "I ran the creative project management end to end on that weekly rhythm. Every release shipped with adoption notes for the partner restaurants and a single line of guidance for the operations team, so a change on the floor never arrived unexplained. Anything I could not explain in one line did not ship that week: a bar I set deliberately, because on a live floor an unexplained change costs more than a delayed one."
        ]
      },
      {
        "label": "Reflection",
        "heading": "The screen is not the achievement.",
        "paras": [
          "It is tempting, on operational software, to measure the work by the dashboard itself: the layout, the type, the interaction model. None of those is the achievement. The achievement is the calmer kitchen at 11:47: the operator who stopped re-checking the screen between orders, the cook who heard fewer alarms, the finance lead at the corporate client who stopped chasing receipts. The percentages are just those three people, counted.",
          "What I took from Hungerhub is the habit I now bring to every platform I lead: find the one number that predicts the business outcome, prove the design moves it and say it in the language of the person paying for the work. Design for operations is humble by necessity: it earns its place in the inches it gives back to the people using it."
        ]
      }
    ],
    "outcomes": [
      {
        "stat": "−38%",
        "label": "Faster order acknowledgment: the metric that predicts whether food ships late."
      },
      {
        "stat": "−51%",
        "label": "Fewer missed-order tickets, quarter over quarter: the ones the platform refunds."
      },
      {
        "stat": "+35%",
        "label": "More order volume through the platform once operators trusted the queue."
      },
      {
        "stat": "2",
        "label": "Surfaces on one system, partner dashboard and B2B Uncatering, owned end to end."
      }
    ]
  },
  {
    "id": "pollin",
    "titleTop": "A calmer",
    "titleItalic": "clinical day.",
    "year": "2022 / 2024",
    "meta": [],
    "body": [],
    "client": "Pollin · FH Health",
    "logo": "/logos/pollin.png",
    "sector": "Healthcare · Multi-product",
    "lede": "One system, two audiences, four surfaces: native iOS, native Android, responsive web for patients in treatment and an EMR-integrated dashboard for their clinicians.",
    "dek": "One system, two audiences, four surfaces: native iOS, native Android, responsive web for patients in treatment and an EMR-integrated dashboard for their clinicians. I led the design of all four and I started by sitting in the clinic rather than in a file.",
    "clientFull": "Pollin Fertility",
    "role": "Senior Experience Designer, Contract",
    "duration": "July 2022 – February 2024",
    "sections": [
      {
        "label": "The Brief",
        "heading": "A slow emergency, made quieter.",
        "paras": [
          "Fertility care is a slow emergency. Patients live inside a cycle that does not negotiate; clinicians live inside a schedule that does; the chart moves between them with the patience of a paper file in a hurry.",
          "Before I designed anything, I sat in the clinic. I went to cycles of clinical meetings, sat through mornings in the waiting area and heard the same conversation between a nurse and a patient three times before lunch. I watched where the chart got reopened. I watched what the clinician quietly retyped instead of correcting: the small, uncomplaining workaround that never appears in a requirements document and never gets raised in a workshop, because to the person doing it, it is simply Tuesday. Sitting still like that set the brief more accurately than the brief did.",
          "What it told me was that Pollin did not need a product. It needed one system serving two audiences across four surfaces: native iOS, native Android and responsive web for patients in active treatment and an EMR-integrated dashboard for the clinicians those patients depend on. On the patient side, medication timing, lab results, monitoring appointments and real emotional weight all converge on one interface. On the clinician side, the same underlying data has to feel as sharp as a surgical tray. My job was designing for coherence across all of it: holding both registers in one system and being the person accountable when they disagreed."
        ]
      },
      {
        "label": "The Work",
        "heading": "One system. Two audiences. Four surfaces.",
        "paras": [
          "The patient apps, the clinician dashboard, the EMR portal and the lab-results pipeline became one design system with two voices: soft where the patient lives, sharp where the clinician works, shared where the data crossed between them. I set the direction and owned the seams; the other designers on the product built inside the system with me; the engineering team made it real; the clinic's nurse leads told me weekly where it was still wrong and rejected any state that added a click at seven in the morning.",
          "Native iOS, native Android and responsive web: cycle tracking, medication scheduling, lab results, appointment management. I designed each surface to lower anxiety without sacrificing medical accuracy. Reminders arrive on time and stop arriving once acknowledged. Results explain themselves in language that does not require a degree to read: copy I drafted and then took back to the clinic's nurses twice, because the first version was accurate and still frightening.",
          "I designed the clinician dashboard end to end: scheduling, test ordering, lab results, clinical reporting. The structure came from what I had watched in the clinic rather than from the workflow the org chart described: including the retyping, which I treated as a design defect rather than a training problem. Chart-prep time fell; double-entry between systems fell with it.",
          "The hardest design problem was at the join: where the clinician's order becomes the patient's notification, where the lab result returns to the dashboard, where a protocol change propagates to the cycle plan. I designed the seam between systems to be inspectable, not invisible. Clinicians could see what the patient had been shown; patients could see what the clinic had received. The integration engineers held me to what the EMR could actually guarantee and the design got more honest for it.",
          "I built and governed a centralised Figma system covering the patient apps, the web experience and the clinician dashboard: one source of truth, one component vocabulary. Components stayed shared where the meaning was shared (results, schedules, medications) and forked where the audiences diverged, in tone, density and escalation. Deciding which of those two things a given component was became the most useful conversation the design team had each week."
        ]
      },
      {
        "label": "Reflection",
        "heading": "Nobody talks about the design any more.",
        "paras": [
          "Pollin still runs on the system I led. The most quietly satisfying outcome of the whole engagement is that nobody inside the clinic talks about the design any more. They talk about the cycle.",
          "What I carry out of it is the method rather than the screens. Being embedded is not a research technique; it is the only way to find the workaround that nobody reports. And this is the project I point to when someone asks about multi-product leadership: two audiences, four surfaces, one component vocabulary, one seam designed to be inspectable and one person accountable for whether all of it cohered. That is what a systems thinker designing for coherence across multiple products actually does on a Tuesday."
        ]
      }
    ],
    "outcomes": [
      {
        "stat": "85%+",
        "label": "Patient engagement across active cycles: doses logged on the day they were taken."
      },
      {
        "stat": "40%",
        "label": "More efficient clinical workflow: chart prep stopped eating the morning."
      },
      {
        "stat": "1",
        "label": "One source of truth across patient and provider: two audiences, one component vocabulary."
      },
      {
        "stat": "0",
        "label": "Double entries between the clinician dashboard and the EMR; the chart is typed once."
      }
    ]
  },
  {
    "id": "wawa",
    "titleTop": "Specimens,",
    "titleItalic": "a multi-brand system.",
    "year": "2022",
    "meta": [],
    "body": [],
    "client": "Wawa",
    "logo": "/logos/wawa.png",
    "sector": "Retail · Multi-brand",
    "lede": "I built and scaled the multi-brand system behind Wawa's digital ecosystem: wawa.com, the ordering site and the native mobile app.",
    "dek": "I built and scaled the multi-brand system behind Wawa's digital ecosystem: wawa.com, the ordering site and the native mobile app. Three surfaces on one component vocabulary, each keeping its voice.",
    "clientFull": "Wawa, Inc.",
    "role": "Lead: design systems",
    "duration": "12 months",
    "sections": [
      {
        "label": "The Brief",
        "heading": "One system, three surfaces, one identity.",
        "paras": [
          "A design system is a contract you write with the future. Wawa's brief was to unify three digital surfaces (the marketing site, the ordering experience and the native mobile app) under one component vocabulary, without flattening the differences in voice that each surface actually needed.",
          "The marketing site needed warmth. The ordering surface needed speed. The mobile app needed quiet competence under one hand at the gas pump. I led the system across all three: one pattern language, three registers, none of them losing the family resemblance."
        ]
      },
      {
        "label": "The Work",
        "heading": "From brand to tokens to adoption.",
        "paras": [
          "I moved the work from the brand inward: analysing the existing identity, mapping the digital ecosystem, defining semantic tokens, building the component vocabulary and only then writing the documentation a team three months from now would actually read.",
          "I spent the first weeks cataloguing what already existed: the brand colours that lived in print but not in tokens, the voice that worked on signage but not on a button, the patterns that were named \"Wawa\" but had never been written down. The audit became the first deliverable and the shared reference the rest of the engagement argued from.",
          "I set the three-tier model: primitives at the root, semantic tokens on top, component primitives above those. The marketing site, the ordering site and the mobile app each pulled from the same root and composed their own semantic layer. Wawa's platform engineers built the pipeline that made that inheritance enforceable in code rather than in review. One source, three voices: by design."
        ]
      }
    ],
    "outcomes": [
      {
        "stat": "40+",
        "label": "Components shipped: documented, annotated, each with an adoption note."
      },
      {
        "stat": "17",
        "label": "Surface tokens carrying the whole vocabulary: named by role, not by colour."
      },
      {
        "stat": "3",
        "label": "Surfaces on one component vocabulary: marketing, ordering, native app."
      },
      {
        "stat": "1mo",
        "label": "From handoff to the in-house team owning the system and shipping on it."
      }
    ]
  },
  {
    "id": "lululemon",
    "titleTop": "Components,",
    "titleItalic": "as an elevation.",
    "year": "2021 / 2022",
    "meta": [],
    "body": [],
    "client": "lululemon",
    "logo": "/logos/lululemon.png",
    "sector": "Apparel · Design systems",
    "lede": "A component vocabulary and token system I extended in partnership with Lululemon's in-house design systems team: quiet, dimensional, faithful to the brand's restraint.",
    "dek": "A component vocabulary and token system I extended in partnership with Lululemon's in-house design systems team: quiet, dimensional, faithful to the brand's restraint. I shrank the library before I extended it and adoption climbed in the same quarter. Then I handed the practice over and it kept running without me.",
    "clientFull": "Lululemon Athletica",
    "role": "Design lead",
    "duration": null,
    "sections": [
      {
        "label": "The Brief",
        "heading": "Design systems borrow from architecture.",
        "paras": [
          "A component is a wall section; a token is a material spec; a library is an elevation drawing. Lululemon's brief was that kind of drafting: quiet, dimensional, faithful to the brand's restraint. I was brought in to work alongside their in-house design systems team: extend the component vocabulary, formalise the tokens and write the adoption documentation that would let the practice outlast my engagement.",
          "A library is easy to grow and hard to keep coherent and growth is the half that gets rewarded. So I ran it as a governance problem: set the bar for the pattern language, hold it when the quarter pushed the other way and leave the in-house team owning the standard rather than depending on me for it.",
          "The hardest design choices were the ones about what not to add."
        ]
      },
      {
        "label": "The Work",
        "heading": "Four exercises in restraint.",
        "paras": [
          "The library was already strong when I arrived; that was Lululemon's in-house team's work and I said so early and often. My contribution was sharpening it: removing duplication, formalising the variants that had grown by accident and writing documentation a junior designer could follow without supervision.",
          "I made an audit the precondition for every new component proposal: including my own. Was the need already covered by an existing component with a missing variant? Could we widen the existing pattern rather than add a parallel one? Most weeks the audit was the deliverable and I defended it as real output to people who had expected a component.",
          "I drew the variant matrix for each component as a flat elevation (primary, outline, ghost; default, hover, focus, disabled; small, medium, large) and treated the spec like an architect's wall drawing. The matrix became the source of truth; the Figma file followed the matrix, not the other way around. The in-house team maintained it that way after I left."
        ]
      }
    ],
    "outcomes": [
      {
        "stat": "40+",
        "label": "Components in production at handoff."
      },
      {
        "stat": "3",
        "label": "Near-duplicate patterns consolidated into one documented component."
      },
      {
        "stat": "1qtr",
        "label": "The library shrank and adoption climbed inside the same quarter."
      },
      {
        "stat": "1",
        "label": "Source of truth: the variant matrix, co-owned with the in-house team and maintained by them after handoff."
      }
    ]
  }
];

export type Crit = { hook: string; body: string; who: string; role: string };
export const crits: Crit[] = [
  {
    "hook": "\"The CoreAI project is a difficult one because there are so many different teams of people that are utilizing the work we deliver and it's like having multiple stakeholders each giving conflicting requirements at times. I'm constantly impressed with the enthusiasm and skill Aashi demonstrates when taking on these challenges. She's able to create designs that inspire discussion and steer the stakeholders into refining it.\"",
    "body": "",
    "who": "Michael Muraszko",
    "role": "Manager Content Design, Publicis Groupe"
  },
  {
    "hook": "\"Her design files are consistently neat, making it easy to understand her intent and build on her work.\"",
    "body": "Her solutions are always well-considered, reflecting her ability to address the immediate need while also ensuring designs are future-proofed.",
    "who": "Adum Brusky",
    "role": "Experience Lead, CoreAI"
  },
  {
    "hook": "\"Aashi seamlessly stepped into a leadership role...\"",
    "body": "creating all the necessary work products and overseeing the process. This initiative and follow-through exemplified her readiness for leadership responsibilities. Throughout the process, Aashi fostered inclusive collaboration among creative leadership, design teams and engineers; integrating multiple perspectives while keeping the project on track.",
    "who": "Joanna Tsai",
    "role": "Associate Design Director, CoreAI"
  },
  {
    "hook": "\"Aashi owned and led the LionCore block component work on the app framework team, enabling streamlined development and consistency across teams.\"",
    "body": "Her leadership in CoreAI product Q/A has paved the way for a strong direction as we head into the new year.",
    "who": "Tre Tate",
    "role": "Senior Experience Designer, CoreAI"
  },
  {
    "hook": "\"I had been struggling to come up with a coherent solution on my own, but Aashi walked me step-by-step through my thought process and helped identify gaps in my logic.\"",
    "body": "After an iterative back-and-forth process, we defined a new set of system rules that would ultimately go on to define the backend behavior of our web app.",
    "who": "Ezra Truneh",
    "role": "Senior Experience Designer, CoreAI"
  },
  {
    "hook": "\"You approached your work with a steady resolve, providing outstanding support for our design team.\"",
    "body": "I very much appreciate all the times that you raised your hand and took on extra work to help the team (and me) get through some of our hardest moments. You truly helped us to be successful in so many ways, big and small.",
    "who": "David Oberst",
    "role": "Creative Director, CoreAI"
  },
  {
    "hook": "\"Aashi's designs were intuitive, visually polished and delivered with attention to detail.\"",
    "body": "She always exceeded expectations, even while handling multiple projects. Her ability to collaborate across functions made her a valuable member of our team.",
    "who": "Michael Ennis",
    "role": "Wawa Experience Manager, Wawa"
  },
  {
    "hook": "\"Aashi's versatility was evident as she adeptly tackled various tasks, including interaction design explorations and prototype building in Figma.\"",
    "body": "This not only demonstrated her technical skills but also underscored her commitment to being a team player.",
    "who": "Nicole Folgate",
    "role": "Design Lead, CoreAI"
  }
];

export type AboutBlock = { label: string; heading: string; paras: string[] };
export const about: AboutBlock[] = [
  {
    "label": "",
    "heading": "Aashi Richhariya.",
    "paras": [
      "I design the foundations other people build on: agentic AI platforms, design systems and the standards a large design organisation builds against. I am a Lead Experience Designer at Publicis Sapient in Toronto and Principal Design System Lead on the Circle K engagement."
    ]
  },
  {
    "label": "",
    "heading": "Trained as a fine artist. I work at the system level.",
    "paras": [
      "I came to design from painting, by way of a fine arts degree in Delhi and a post-graduate certificate in Toronto. What carried over was composition: the habit of asking what holds a thing together before asking what it looks like. That is most of what I do now, at a larger scale and with more people in the room.",
      "I have spent the last five years at Publicis Sapient, latterly owning the App Framework beneath CoreAI, Publicis Groupe's agentic AI platform. Seven product tracks and more than fifty designers build against that foundation. Before that I led a fertility clinic's patient and clinician experience end to end and before that I owned the surface of a restaurant operations platform through its busiest hours. The through-line is the same: I am most useful where the answer has to work for people I will never meet, made by teams I will not be part of."
    ]
  },
  {
    "label": "",
    "heading": "Where I have worked and what I held there.",
    "paras": [
      "Principal Design System Lead, Circle K engagement (2025 to present). Lead Experience Designer, CoreAI App Framework (2023 to present). I own the App Framework beneath Publicis Groupe's CoreAI platform and I set and hold the design bar for 50+ designers across seven product tracks. I wrote the component standards, interaction guidelines and platform documentation the organisation builds against, run the weekly critique and built the release QA ritual that has cleared 98+ pre-launch issues across two platform cuts.",
      "Senior Experience Designer, contract. Lead designer across native iOS, native Android, responsive web and the clinician EMR portal. One design system, two audiences, four surfaces. I sat through three months of clinic mornings before I drew a screen.",
      "Product Designer. The restaurant partner dashboard and the Uncatering B2B experience, owned end to end on a small team, shipping weekly against a live lunch rush.",
      "Post-Graduate Certificate, Interactive Media Management: UX design, content strategy, digital project management. Bachelor of Fine Arts: drawing, painting, composition.",
      "Google Cloud Certified: Generative AI Leader, 2024. Co-founder and contributing artist, Artist At Work Productions, a visual arts community supporting fine art, theatre and photography. Organiser and exhibiting artist, Indo-Korean Art Exhibition, AIFACS Art Gallery, New Delhi."
    ]
  },
  {
    "label": "",
    "heading": "Open to leadership conversations.",
    "paras": [
      "I am interested in roles where the design problem is a foundation rather than a feature: platform, systems and the organisations that build on them. Work from the CoreAI programme was presented to clients at Cannes Lions 2024.",
      "Write to aashi.rich@gmail.com, or find me on LinkedIn ↗."
    ]
  }
];

/* Marks shown as a client colophon. Two exist as artwork; the rest of
   the roster is carried typographically, in the same row.

   Publicis is deliberately typeset rather than drawn: the only artwork
   supplied is the Publicis Media lockup, and the work described here is
   Publicis Sapient / Publicis Groupe. Shipping the wrong agency's mark
   beside copy that names a different one is a factual error, not a
   styling choice. Swap in a Sapient mark and this becomes a logo. */
/* `h` is the drawn height in px, set per mark rather than by one
   shared cap. These six run from 2.19 to 7.05 in aspect: a single
   max-height makes the wide wordmarks enormous and the stacked ones
   unreadable. The heights below are chosen so each mark occupies a
   similar area, which is what "the same size" means optically. */
export const clientMarks = [
  { name: 'Circle K',        src: '/logos/circlek.png',        h: 26 },
  { name: 'Publicis Groupe', src: '/logos/publicisgroupe.png', h: 46 },
  { name: 'lululemon',       src: '/logos/lululemon.png',      h: 19 },
  { name: 'Wawa',            src: '/logos/wawa.png',           h: 40 },
  { name: 'Pollin',          src: '/logos/pollin.png',         h: 26 },
  { name: 'hungerhub',       src: '/logos/hungerhub.png',      h: 34 },
  { name: 'Mercor',          src: '/logos/mercor.png',         h: 22 },
];

/* Same mark, same optical height, wherever it is drawn. */
export const markHeight = (src: string | null): number =>
  clientMarks.find((c) => c.src === src)?.h ?? 26;

/* The roster, in the order the work runs. Derived from `plates` so a
   brand cannot appear here that has no project behind it, and cannot
   be forgotten when one is added. The two with artwork are drawn by
   `clientMarks`; the rest are set in type. */
export const roster: string[] = (() => {
  /* A project contributes a typeset name only when it has no mark of
     its own. Matching on the client string instead meant "Publicis
     Sapient · CoreAI" was not recognised as the Publicis Groupe mark
     already in the row, and the brand appeared twice. */
  const drawn = clientMarks.map((c) => c.name.toLowerCase());
  const isDrawn = (n: string) => {
    const k = n.toLowerCase();
    return drawn.some((d) => k.includes(d) || d.includes(k));
  };
  const names = plates
    .filter((p) => !p.logo)
    .map((p) => (p.clientFull || p.client).replace(/,\s*Inc\.?$/, ''));
  return Array.from(new Set(names)).filter((n) => !isDrawn(n));
})();

/* The CV, structured.
   It was four run-on paragraphs inside one prose block, with the role
   titles buried mid-sentence — unreadable as a record of what she has
   held. Split into rows. Every string below is lifted verbatim from
   those paragraphs; the years come from the matching project years in
   `plates`, not from anywhere new. Nothing here is invented. */
export const roles = [
  {
    "role": "Principal Design System Lead",
    "org": "Circle K engagement",
    "years": "2025 / Present",
    "body": ""
  },
  {
    "role": "Lead Experience Designer",
    "org": "CoreAI App Framework, Publicis Sapient",
    "years": "2023 / Present",
    "body": "I own the App Framework beneath Publicis Groupe's CoreAI platform and I set and hold the design bar for 50+ designers across seven product tracks. I wrote the component standards, interaction guidelines and platform documentation the organisation builds against, run the weekly critique and built the release QA ritual that has cleared 98+ pre-launch issues across two platform cuts."
  },
  {
    "role": "Senior Experience Designer",
    "org": "Pollin · FH Health, contract",
    "years": "2022 / 2024",
    "body": "Lead designer across native iOS, native Android, responsive web and the clinician EMR portal. One design system, two audiences, four surfaces. I sat through three months of clinic mornings before I drew a screen."
  },
  {
    "role": "Product Designer",
    "org": "hungerhub",
    "years": "2020 / 2022",
    "body": "The restaurant partner dashboard and the Uncatering B2B experience, owned end to end on a small team, shipping weekly against a live lunch rush."
  }
];

export const extras = [
  {
    "label": "Education",
    "body": "Post-Graduate Certificate, Interactive Media Management: UX design, content strategy, digital project management. Bachelor of Fine Arts: drawing, painting, composition."
  },
  {
    "label": "Credentials and practice",
    "body": "Google Cloud Certified: Generative AI Leader, 2024. Co-founder and contributing artist, Artist At Work Productions, a visual arts community supporting fine art, theatre and photography. Organiser and exhibiting artist, Indo-Korean Art Exhibition, AIFACS Art Gallery, New Delhi."
  }
];
