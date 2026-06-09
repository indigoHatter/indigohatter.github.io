/* ============================================================
   LEFT BRAIN DATA  |  data/left.js
   Schema:
     JSONResume + extensions
   Extensions:
     work.location      | not in spec, widely supported by themes
     work.headline      | 2-3 sentence short-form summary (resume/portfolio use)
     work.highlightsCap | optional numeric cap for highlights list shown on portfolio card (blank = defaults to HIGHLIGHTS_CAP in content.js)
     work.keywords      | skill-chip tags (UI use); distinct from highlights[]
     education.meta     | free-text subtitle line (school/honors)
     education.detail   | prose note (coursework, thesis, etc.)
     services.*         | custom section fields [title, meta, detail]

   Rendering targets:
     Resume / portfolio card  |  headline + highlights + keywords
     LinkedIn                 |  summary  + highlights + keywords

   Dates:
     ISO 8601 strings ("2020-06", "2020", etc.)
   ============================================================ */

const LEFT_DATA = {

  basics: {
    name: "Robert \"Porter\" Blakeley",
    label: "Electrical Engineer | Process Improvement | Technician | Tutor | Student | Changemaker",
    image: "",
    email: "rpblakeley@gmx.com",
    phone: "+1 (636) 422-0191",
    url: "https://indigohatter.github.io",
    summary: "A data-driven, improvement-minded engineer with a strong foundation in electrical and mathematical principles, as well as compliance, quality, and process improvement. Skilled in troubleshooting, cross-functional team building, and both leading and coaching. Changemaker.",
    location: {
      address: "1040 N Windmill Way",
      postalCode: "AZ 86323",
      city: "Chino Valley",
      countryCode: "US",
      region: "Arizona"
    },
    profiles: [
      {
        network: "Portfolio",
        //username
        url: "https://indigohatter.github.io"
      },
      {
        network: "LinkedIn",
        username: "rob-p-blakeley",
        url: "https://www.linkedin.com/in/rob-p-blakeley"
      },
      {
        network: "GitHub",
        username: "indigoHatter",
        url: "https://github.com/indigoHatter"
      }
    ]
  },

  /* ── Work history ──────────────────────────────────────────
     Rendered as: "Position — Name"  |  startDate – endDate
                  location
                  headline     (short-form, 2-3 sentences - resume/portfolio card)
                  summary      (full-length prose narrative - LinkedIn)
                  highlights   (accomplishment bullets)
                  keywords     (portfolio UI chips; LinkedIn "Skills" section)
  */
  work: [
    {
      name:        "Canyon AeroConnect",
      description: "FAA Part 145 avionics repair station",
      position:    "Process Improvement Specialist",
      url:         "",
      location:    "Prescott, AZ",
      startDate:   "2019-10",
      endDate:      "2025-01",
      highlightsCap: 7,
      headline:    "Multi-role contributor across repair, inspection, lead, and process improvement functions at an FAA Part 145 avionics repair station. Drove shop first-pass yield above the 90% goal and reduced daily reporting time by ~83% through Excel automation. Formally appointed Process Improvement Specialist in 2023.",
      summary:     "Progressive responsibilities across repair technician, FAA Repairman, group lead, and process improvement functions at an FAA Part 145 avionics repair station. Performed hands-on troubleshooting and repair of audio control panels, data adapters, and control heads using approved technical data in compliance with FAA and EASA regulations. As an FAA-certificated Repairman (Nov 2021), authorized return-to-service via FAA Form 8130-3 with EASA dual-release, and drove first-pass yield from the high 80s % to low-to-mid 90s % through an educational coaching approach to quality misses. Directed daily workflow for a team of ~20 technicians as informal group lead. Formally appointed Process Improvement Specialist (Dec 2023), following earlier recognition for process improvements, including independent Excel automation work that reduced reporting time by ~83%. Executed improvement initiatives stemming from a value stream mapping exercise, including foot traffic reduction design and ERP-integrated parts ordering workflow. Owned monthly and quarterly KPI reporting — aggregating TAT and OTD data, synthesizing root causes, and co-presenting customer-specific corrective action reports to executive and sales leadership. Facilitated cross-functional pre-meetings to align department stakeholders before quarterly executive review.",
      highlights: [
        "Drove first-pass yield (FPY) from high 80s to low-to-mid 90s, sustaining above the 90% shop goal, through educational coaching on quality misses rather than punitive inspection pressure",
        "Automated two daily Excel reporting workflows using PowerQuery, reducing combined completion time from ~60 to ~10 minutes (~83% reduction)",
        "Owned monthly KPI reporting — aggregated TAT and OTD data, synthesized root causes, and categorized findings into actionable management summaries",
        "Facilitated quarterly cross-functional pre-meetings with procurement, planning, sales, quality, and operations management; co-presented customer-specific 4-up corrective action reports to executive and sales leadership",
        "Revived dormant manufacturing returns committee; drove backlog reduction through structured weekly meetings, metrics visibility, and collaborative cross-departmental follow-through without direct authority over participants",
        "Contributed to value stream mapping exercise; independently developed foot traffic reduction plan and ERP-integrated parts ordering workflow with repair station's service provider — both approved prior to departure",
        "Conducted formal time study and inventory classification to support capital equipment ROI justification; analysis supported successful procurement decision",
        "Held FAA Repairman certificate (14 CFR 65.103 — Limited Radio, Accessory, Instrument) Nov 2021–Jan 2025; authorized return-to-service via FAA Form 8130-3 with EASA dual-release",
        "Served as internal AS9100D auditor; performed annual process compliance audits against company QMS",
        "Active FOD committee member; conducted monthly audits and reported foreign object debris events to committee",
        "Collaborated with technicians and quality on documentation discrepancies found during final inspection; initiated and developed change requests when required to resolve airworthiness issues"
      ],
      keywords: [
        "AS9100D",
        "FAA Part 145",
        "Avionics",
        "FAA Form 8130-3",
        "EASA",
        "Process Improvement",
        "Value Stream Mapping",
        "Root Cause Analysis",
        "Kaizen",
        "Excel",
        "PowerQuery",
        "KPI Reporting",
        "First-Pass Yield",
        "Quality Auditing",
        "FOD",
        "Cross-functional Collaboration"
      ]
    },
    {
      name:        "Home Depot",
      description: "Home improvement retail",
      position:    "Merchandising Execution Associate",
      url:         "https://www.homedepot.com",
      location:    "Prescott Valley, AZ",
      startDate:   "2019-01",
      endDate:      "2019-10",
      highlightsCap: 3,
      headline:    "",
      summary:     "Overnight merchandising crew member executing corporate planogram-driven resets across hardware, appliance, and general merchandise departments. Worked across solo, paired, and full-crew configurations depending on project scope and scale.",
      highlights: [
        "Executed planogram-driven resets ranging up to 500+ SKUs across up to 12 bays; projects scaled from single-shift tasks to ~200-manhour multi-phase installations",
        "Read and interpreted printed technical documentation to sequence and execute complex resets accurately under time pressure with minimal supervision",
        "Identified a documentation error in a multi-phase reset plan; executed a workaround under suboptimal conditions and completed ahead of estimated time",
        "Coordinated with management, area leads, and crew members to align on project scope, sequencing, and handoffs across shifts",
        "Used handheld inventory systems for SKU lookup and merchandise tracking"
      ],
      keywords: [
        "Planogram Execution",
        "Technical Documentation",
        "Inventory Management",
        "Cross-functional Collaboration",
        "Independent Judgment",
        "Process Execution"
      ]
    },
    {
      name:        "Resa Wearables",
      description: "Wearable orthotics startup",
      position:    "Technical Support Specialist",
      url:         "",
      location:    "Prescott, AZ",
      startDate:   "2018-05",
      endDate:      "2018-11",
      //highlightsCap: "",
      headline:    "Technical support role at a wearables startup supporting FDM 3D printers, foot scanners, and networked kiosks across in-house and Costco roadshow locations. Assumed expanded hardware, networking, and field support responsibilities over time. Improved field printer uptime and supported concurrent roadshow locations as part of a small technical team.",
      summary:     "Hired through a technical training program into a support role; assumed progressive expansion of responsibilities. Maintained and repaired FDM 3D printers, 3D foot scanners, and networked self-service kiosks across in-house and field (roadshow) locations. Diagnosed and resolved network connectivity issues including firmware updates and physical layer troubleshooting. Produced internal knowledge-base articles and optimized video walkthroughs for low-bandwidth environments. Developed refurbishing checklists and an equipment uptime tracking system. Managed show logistics and vendor relations at Costco roadshow locations.",
      highlights: ["Took lead on several projects with many large moves, beating project timeline by average of ~10%."],
      keywords: [
        "Technical Support",
        "FDM 3D Printing",
        "Hardware Maintenance",
        "Network Troubleshooting",
        "Knowledge Base",
        "Field Operations",
        "Process Documentation"
      ]
    }
  ],

  volunteer: [
    /* {
      organization: "Organization Name",
      position:     "Volunteer",
      url:          "https://example.org/",
      startDate:    "2020-01",
      endDate:      "2021-01",
      summary:      "Description of volunteer work.",
      highlights:   ["Achievement or impact"]
    } */
  ],

  /* ── Education ─────────────────────────────────────────────
     Rendered as: "studyType area — institution"  |  endDate
                  meta (subtitle line for school, honors, etc.)
                  detail (optional prose)
  */
  education: [
    {
      institution: "Arizona State University",
      url:         "https://www.asu.edu/",
      area:        "Electrical Engineering",
      studyType:   "BSE",
      startDate:   "2026-08-20",
      endDate:     "",
      score:       "",
      courses:     [],
      meta:        "Ira A. Fulton Schools of Engineering · Barrett, The Honors College",
      detail:      "In progress, starting Fall 2026."
    },
    {
      institution: "Yavapai College",
      url:         "https://www.yc.edu/",
      area:        "Engineering Transfer",
      studyType:   "AS",
      startDate:   "",
      endDate:     "2026-07-29",
      score:       "3.914/4.000 (98%)",
      courses:     [
        "Calculus III (multivariable)",
        "Differential equations",
        "Physics I (calculus-based mechanics)",
        "Physics II (calculus-based E&M)",
      ],
      meta:        "Pre-engineering honors student · Phi Theta Kappa chapter president",
      detail:      "Graduated with honors (3.9 GPA) while serving as PTK chapter president and working 20+ hours per week. Completed advanced coursework in mathematics and physics, including multivariable calculus, differential equations, and calculus-based physics sequences. Transferred to ASU's Ira A. Fulton Schools of Engineering in Fall 2026."
    },
    {
      institution: "Yavapai College",
      url:         "https://www.yc.edu/",
      area:        "Electrical & Instrumentation Technology",
      studyType:   "AAS",
      startDate:   "",
      endDate:     "2025-05-16",
      score:       "4.000/4.000 (100%)",
      courses:     [
        "Circuit analysis (DC, AC, digital, solid state)",
        "Industrial automation (PLCs, HMI, sensors, actuators)",
        "Digital systems (logic design, microcontrollers, embedded systems)",
        "Radio communications (theory, modulation, troubleshooting)",
        "Robotics (kinematics, control systems, programming)",
      ],
      meta:        "",
      detail:      "Graduated with honors (4.0 GPA) while working 40+ hours per week in avionics repair. Completed coursework in circuit analysis, industrial automation, digital systems, radio communications, robotics, and more."
    }
  ],

  /* ── Certifications ────────────────────────────────────────
     Rendered as: name  |  date
                  issuer
  */
  certifications: [
    {
      name:   "CompTIA A+",
      date:   "2016-08",
      issuer: "CompTIA",
      url:    "https://www.comptia.org/certifications/a"
    },
    {
      name:   "CompTIA Network+",
      date:   "2017-11",
      issuer: "CompTIA",
      url:    "https://www.comptia.org/certifications/network"
    },
    {
      name:   "FAA Repairman Certificate (14 CFR 65.103 — Limited Radio, Accessory, Instrument)",
      date:   "2021-11",
      issuer: "Federal Aviation Administration",
      url:    "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-65/subpart-E/section-65.103"
    },
    {
      name:   "ESA-1, -2, -3 (Electronic Systems Associate — DC, AC, Solid State)",
      date:   "2022",
      issuer: "ISCET",
      url:    "https://certifiedelectronicstechnician.org/electronics-system-associate-exams-esa/"
    },
  ],

  /* ── Awards & honors ───────────────────────────────────────
     Rendered as: title  |  date
                  awarder
                  summary (optional)
  */
  awards: [
    {
      title:   "All-Arizona Academic Team",
      date:    "2026",
      awarder: "Arizona Board of Regents & Phi Theta Kappa",
      summary: "Statewide recognition awarded to top-performing Arizona community college students for academic excellence, leadership, and community service."
    }
  ],

  /* ── Publications ──────────────────────────────────────────
     Rendered as: name  |  releaseDate
                  publisher
                  summary
  */
  publications: [
    /* {
      name:        "Publication Title",
      publisher:   "Publisher or Conference",
      releaseDate: "2025-01",
      url:         "https://example.com",
      summary:     "Short description of the publication."
    } */
  ],

  /* ── Skills ────────────────────────────────────────────────
     Rendered as: name  (level)
                  keyword chips
  */
  skills: [
    /* {
      name:     "Skill Category",
      level:    "Proficient",
      keywords: ["Keyword A", "Keyword B"]
    } */
  ],

  /* ── Languages ─────────────────────────────────────────────
     Rendered as: language  |  fluency
  */
  languages: [
    {
      language: "English",
      fluency:  "Native speaker"
    },
    {
      language: "Spanish",
      fluency:  "Basic (formerly Conversational, now rusty)"
    },
  ],

  /* ── Interests ─────────────────────────────────────────────
     Rendered as: name
                  keyword chips
  */
  interests: [
    /* {
      name:     "Interest",
      keywords: ["Subtopic A", "Subtopic B"]
    } */
  ],

  /* ── References ────────────────────────────────────────────
     Rendered as: name
                  reference (quote)
  */
  references: [
    /* {
      name:      "Reference Name",
      reference: "Reference quote or contact note."
    } */
  ],

  /* ── Projects ──────────────────────────────────────────────
     Rendered as: name  |  startDate – endDate
                  entity
                  description
                  highlights (bullets)
                  keyword chips
  */
  projects: [
    /* {
      name:        "Project Name",
      description: "Short summary.",
      highlights:  ["Key outcome or feature"],
      keywords:    ["Technology"],
      startDate:   "2024-01",
      endDate:     "2024-06",
      url:         "https://github.com/example",
      roles:       ["Designer", "Developer"],
      entity:      "ASU / Personal",
      type:        "application"
    } */
  ],

  /* ── Professional services ─────────────────────────────────
     Rendered as: title
                  meta  (subtitle / keywords line)
                  detail
  */
  services: [
    {
      title:  "Tutoring",
      meta:   "Physics, mathematics, electrical engineering, test prep",
      detail: "Specializing in mathematics (arithmetic, algebra, geometry, trigonometry, single- and multi-variable calculus, differential equations), I tutor in a wide range of subjects including physics, electrical engineering, general studies, and test preparation. I work with students of all ages and skill levels to build understanding and confidence in these subjects."
    },
    {
      title:  "IT & Technical Support",
      meta:   "Networking, hardware, software, helpdesk",
      detail: "A+/Network+ certified IT technician with experience in PC and network troubleshooting, hardware repair, software support, and helpdesk ticket resolution. Available for remote or in-person assistance with a wide range of technical issues."
    },
    {
      title:  "Handyman, Landscaping, & Home Services",
      meta:   "General repairs, electrical, installations, landscaping, and more",
      detail: "I offer a wide range of home services, including general repairs, electrical work, installations, landscaping, and more. Contact me for personalized assistance with your home projects."
    }
  ]

};
