/* ============================================================
   RIGHT BRAIN DATA  |  data/right.js
   Schema: JSONResume-inspired (no official theatre schema).

   acting     — adapted from JSONResume "work":
                  production = name, role = position
   productions — adapted from JSONResume "projects":
                  entity = company/org, roles[] = tag chips
   Dates: ISO 8601 strings or bare years.
   ============================================================ */

const RIGHT_DATA = {

  /* ── Acting résumé ─────────────────────────────────────────
     Rendered as: "Role — Production Title"  |  date
                  Company · Director
  */
  acting: [
    {
      role:       "Role",
      production: "Production Title",
      date:       "20XX",
      company:    "Theatre Company",
      director:   "Director Name",
    },
    {
      role:       "Role",
      production: "Production Title",
      date:       "20XX",
      company:    "Theatre Company",
      director:   "Director Name",
    },
  ],

  /* ── Production history ────────────────────────────────────
     Rendered as: name  |  startDate
                  entity
                  description
                  roles (chips)
  */
  productions: [
    {
      name:        "Production Title",
      entity:      "Theatre Company",
      startDate:   "20XX",
      description: "Role in production — e.g. Stage Manager, Lighting Designer, Spot Op.",
      roles:       ["Stage Management", "Lighting"],
    },
  ],

};
