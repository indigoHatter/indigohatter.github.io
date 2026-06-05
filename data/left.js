/* ============================================================
   LEFT BRAIN DATA  |  data/left.js
   Schema: JSONResume (work, education, awards, publications)
   + custom "services" section (no JSONResume equivalent).

   Extensions vs strict JSONResume:
     work.location  — not in spec, widely supported by themes
     work.keywords  — skill-chip tags (UI use); distinct from highlights[]
     education.meta — free-text subtitle line (school/honors)
     education.detail — prose note (coursework, thesis, etc.)

   work[] field roles:
     summary    — prose narrative; full-length (LinkedIn-style)
     highlights — tight accomplishment bullets (resume-style)
     keywords   — skill chips (portfolio site UI)
   Dates: ISO 8601 strings ("2020-06", "2020", etc.)
   ============================================================ */

const LEFT_DATA = {

  /* ── Work history ──────────────────────────────────────────
     Rendered as: "Position — Name"  |  startDate – endDate
                  location
                  summary      (prose narrative, full-length)
                  highlights   (accomplishment bullets, resume-style)
                  keywords     (chips)
  */
  work: [
    {
      name:       "Employer Name",
      position:   "Job Title",
      location:   "Location",
      startDate:  "20XX",
      endDate:    "",
      summary:    "Brief description of responsibilities and accomplishments. Replace this with your actual experience.",
      highlights: [
        "Accomplishment or responsibility, quantified where possible.",
        "Second bullet.",
      ],
      keywords:   ["Electrical Engineering", "Systems Design"],
    },
    {
      name:       "Employer Name",
      position:   "Job Title",
      location:   "Location",
      startDate:  "20XX",
      endDate:    "20XX",
      summary:    "Brief description of responsibilities and accomplishments.",
      highlights: [
        "Accomplishment or responsibility, quantified where possible.",
        "Second bullet.",
      ],
      keywords:   ["IT", "Troubleshooting"],
    },
  ],

  /* ── Education ─────────────────────────────────────────────
     Rendered as: "studyType area — institution"  |  endDate
                  meta
                  detail (optional prose)
  */
  education: [
    {
      institution: "Arizona State University",
      area:        "[Degree]",
      studyType:   "",
      endDate:     "20XX",
      score:       "",
      courses:     [],
      meta:        "Ira A. Fulton Schools of Engineering · Barrett, The Honors College",
      detail:      "Relevant coursework, thesis, or honors notes here.",
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
      date:    "20XX",
      awarder: "Phi Theta Kappa",
      summary: "",
    },
  ],

  /* ── Publications ──────────────────────────────────────────
     Rendered as: name  |  releaseDate
                  publisher
                  summary
  */
  publications: [],

  /* ── Professional services ─────────────────────────────────
     Custom section — no JSONResume equivalent.
     Rendered as: title
                  meta  (subtitle / keywords line)
                  detail
  */
  services: [
    {
      title:  "Electronics & Design",
      meta:   "Circuit design, PCB layout, embedded systems, avionics",
      detail: "Description of services offered, scope, and availability.",
    },
    {
      title:  "IT & Technical Support",
      meta:   "Networking, hardware, software, helpdesk",
      detail: "Description of services offered.",
    },
    {
      title:  "Tutoring",
      meta:   "Physics, mathematics, electrical engineering, test prep",
      detail: "Subjects, levels, and format (in-person / remote).",
    },
    {
      title:  "Handyman & Home Services",
      meta:   "General repairs, electrical, installations",
      detail: "Description of services and service area.",
    },
  ],

};
