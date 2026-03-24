# Careby Website — Old → New Version: Full Update Summary (Client Billing)

---

**Subject:** Careby website updated to new version — change summary and billing

---

Hi [Client name],

The Careby website has been fully updated from the **old version to the new version** (new code lives in the `careby/` directory). Below is a concise summary of changes for your reference.

---

## 1. Typography and base configuration

| Item | Old version | New version |
|------|-------------|-------------|
| **Fonts** | Inter + Noto Sans SC | **Plus Jakarta Sans** (Tailwind + CSS aligned) |
| **Viewport** | Basic settings | Added **viewport-fit=cover** (notch/safe-area support) |
| **Mobile touch targets** | All buttons/links set to 44×44px | Main controls only at 44×44px; added `.inline-touch`, `.pb-safe`, `.bottom-safe` to avoid affecting inline links |
| **Safe area** | None | **Safe-area** styles for devices with notch or home indicator |
| **Horizontal scroll** | None | **overflow-x: hidden** to prevent horizontal overflow on mobile |

---

## 2. Homepage hero

| Item | Old version | New version |
|------|-------------|-------------|
| **Headline** | "Care by People Who Truly Care" | **"Care by Trust, Experts, Love."** |
| **Subheadline** | Single subheadline | Added **subheadlineStrong** (AI diagnostics, same-day doctor, in-home care, etc.) |
| **Eyebrow** | None | **Eyebrow**: Toronto · Mandarin & Cantonese · Doctor-Reviewed · PHIPA Compliant |
| **Trust badges** | trustBadges (6 items) | Kept + added **trustChips** (e.g. No referral needed, Same-day virtual doctor) |
| **CTA** | Primary button + "Call Us" | Added **"Not sure? Talk to us first"** and **"See all plans ↓"** |

---

## 3. “Who we serve” / pain points section

| Item | Old version | New version |
|------|-------------|-------------|
| **Titles** | "Who We Serve" / "We Understand Your Challenges" | **"Who Careby is built for"** / **"Three gaps the system left open."** + **"We close all of them."** |
| **Content** | Three audience cards (entrepreneurs, seniors at home, health-conscious) | Replaced with **3 “system gaps” stories** (situation / fear / answer), narrative + solutions, leading into the four-step flow below |

---

## 4. New homepage sections (new version only)

- **We close all of them**  
  Four steps: Choose your plan → Meet your coordinator → We match & brief your team → You stay informed  

- **What Careby means**  
  Three pillars: **Care by Experts / Love / Trust**, with icons (stethoscope, heart, shield) and short definitions  

- **Why Careby exists**  
  Stats: 6.5M Canadians without a family doctor, up to 90% reduction in wait times, Canada last among 11 peers for wait times, only 43% same-day doctor access, etc., with sources (Statistics Canada, GoToDoctor, Commonwealth Fund); dark gradient background and light motion  

Chinese (including Traditional) copy was updated in parallel (e.g. “康伴 为何存在”, “我们全部解决”, “简单易行”).

---

## 5. Plans & Pricing section

| Item | Old version | New version |
|------|-------------|-------------|
| **Section title** | Membership Tiers | **Plans & Pricing** |
| **Structure** | 3 cards: Essential $1,200/yr, Complete Care $3,200/yr, Platinum $5,500/yr, each with a short feature list | **4 tabs:** Careby Health / Careby Home / Careby Complete / Careby Corporate, with multiple plans per tab and a **detail modal** |
| **Careby Health (diagnostics)** | No standalone diagnostics line | **The Essentialist $399/yr** (Tier 1, ages 25–45, ~45 biomarkers, incl. HBV panel) + **upgrade tiers:** Longevity Audit $699/yr (Tier 2, 45–60), Vitality 60+ $999/yr (Tier 3, 60+, imaging add-on from $299), Careby Infinity $2,499/yr (Tier 4, 150+ biomarkers); each tier has full biomarker breakdown (CBC, metabolic, heart, organ, thyroid, hormones, inflammation, etc.) |
| **Careby Complete (family)** | None | **Family Health Hub $2,499/yr** (up to 6 people): 100-biomarker panels 2×/year for 2 seniors, unlimited GoToDoctor for 4 members, 4 Home credits, dedicated coordinator, monthly family health report |
| **Careby Home** | Only "in-home service credit" within membership | **Independent Living $1,499/mo** (Most Popular): 12 credits/month, dedicated bilingual PSW, benefits navigation, GoToDoctor, language matching and replacement guarantee |
| **Careby Corporate** | None | **Workforce Wellness+ $12/emp/mo** (201+ employees): GoToDoctor, quarterly check-ins, benefits navigation, PHIPA compliant |
| **Interaction** | Static cards + lists | **Plan detail modal** (click to expand full detailSections), badges (Tier 1, Most Popular, Best Value), price notes and upgrade prompts; EN/ZH copy aligned for all plans |

---

## 6. Privacy Policy page

| Item | Old version | New version |
|------|-------------|-------------|
| **Basis** | General privacy text (PIPEDA/CASL) | Your **v3 policy document** (PHIPA agent + full 20 sections) |
| **Content** | ~12 sections | **20 sections**: definitions, collection and types, consent and rights, use/retention/transfer/disclosure, security and breach notification, GDPR/CalOPPA/CCPA, Analytics/CI-CD/Payments/links/minors/changes, contact; contact email unified as **hello@getcareby.ca** |

---

## 7. Deployment and engineering (new version only)

| Item | Old version | New version |
|------|-------------|-------------|
| **Vercel** | No vercel.json | **careby/vercel.json**: build, rewrites, security and cache headers (gzip/br, long-term static asset caching) |
| **Scripts** | None | **deploy.sh**, **package-for-client.sh**, etc. |
| **Docs** | Some MD files | **DEPLOYMENT_GUIDE.md**, **PRE_DEPLOYMENT_CHECKLIST.md**, **README-FOR-CLIENT.md**, etc. |

---

## 8. Hours and billing

- **Total hours:** **12 hours**
- **Scope:** Typography and global config → homepage hero / pain points / new sections (We close all, What Careby means, Why Careby exists) → **Plans & Pricing** (4 tabs, multiple tiers, detail modal, EN/ZH copy) → Privacy Policy full-page replacement per v3 (20 sections) → deployment config and scripts → QA and formatting checks  
- **Billing:** At **CAD 120/hour**. **Total = 12 hours × CAD 120 = CAD 1,440.** If you prefer a fixed project fee or split invoices, we can adjust accordingly.

---

## 9. Recommendations

- Before going live, run the site from the `careby/` directory (`npm run dev`) and confirm hero, new sections, and Privacy Policy match the v3 wording.  
- For future copy or policy revisions, send the updated document or text and we can quote the update.

If you have any change requests or billing questions, reply to this email.

Thanks,

[Your name]  
[Company / studio name]  
[Contact]
