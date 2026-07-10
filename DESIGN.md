---
name: High-Trust Digital Purse
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#44474c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#75777c'
  outline-variant: '#c5c6cc'
  surface-tint: '#555f6f'
  primary: '#0a1422'
  on-primary: '#ffffff'
  primary-container: '#1f2937'
  on-primary-container: '#8690a1'
  inverse-primary: '#bdc7d9'
  secondary: '#446900'
  on-secondary: '#ffffff'
  secondary-container: '#b2f746'
  on-secondary-container: '#496f00'
  tertiary: '#121515'
  on-tertiary: '#ffffff'
  tertiary-container: '#272929'
  on-tertiary-container: '#8f9090'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e3f6'
  primary-fixed-dim: '#bdc7d9'
  on-primary-fixed: '#121c2a'
  on-primary-fixed-variant: '#3d4756'
  secondary-fixed: '#b2f746'
  secondary-fixed-dim: '#98da27'
  on-secondary-fixed: '#121f00'
  on-secondary-fixed-variant: '#334f00'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
  success-green: '#16A34A'
  error-red: '#EF4444'
  text-muted: '#6B7280'
  border-subtle: '#F1F5F9'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1024px
  gutter: 1rem
  section-gap: 1.5rem
  card-padding: 1.25rem
  navbar-height: 4.5rem
  safe-area-bottom: 7rem
---

## Brand & Style

The design system is engineered for a high-trust fintech environment, balancing the gravity of financial management with the approachability of modern digital banking. It targets a mobile-first demographic that demands efficiency, security, and clarity.

The visual style is **Corporate / Modern** with a **Tactile** edge. It utilizes deep charcoal tones to establish authority and professional reliability, while the energetic lime accents provide a high-contrast focal point for critical actions and success states. The interface relies on generous whitespace, subtle depth through layered surfaces, and a "soft-edge" philosophy that makes the application feel friendly yet precise. The aesthetic is clean and systematic, ensuring that complex financial data remains legible and stress-free.

## Colors

The palette is anchored by **Charcoal**, used for primary surfaces and high-level typography to signify stability. **Lime** serves as the functional "power color," reserved exclusively for calls to action, active indicators, and positive reinforcements.

- **Primary (Charcoal):** Used for the hero balance card, main navigation icons, and primary headings.
- **Secondary (Lime):** Used for the central QRIS action, "Top Up" buttons, and verification badges.
- **Neutral (Soft Gray):** The foundational background color to reduce eye strain and provide contrast for white cards.
- **Semantic Colors:** Emerald/Green is used for incoming funds, while Red is strictly for outgoing transactions and alerts.

## Typography

This design system exclusively uses **Inter** to achieve a neutral, systematic, and highly legible interface. The scale relies on heavy weight distribution (800 for balances, 700 for headers) to create a clear information hierarchy.

- **Balances:** Use `headline-xl` with tight letter spacing for maximum impact.
- **Section Headers:** Use `headline-lg` for primary categories and `headline-md` for secondary labels.
- **Captions:** Use `body-sm` in a muted gray for timestamps and secondary metadata.
- **Interactive Labels:** Use `label-md` for bottom navigation and buttons to ensure clarity at small sizes.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy optimized for mobile-first usage. On small screens, content spans the full width minus the 16px (1rem) margins. On desktop, content is constrained to a 1024px centered container to maintain focus.

Spacing is based on a **4px/8px baseline**. Cards are separated by a consistent `section-gap` of 24px. A critical layout rule is the `safe-area-bottom` padding (approx 112px), which ensures the floating bottom navigation never overlaps the final list items or buttons in the scroll view.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**.

- **Level 0 (Background):** Soft Gray (#F3F4F6) flat surface.
- **Level 1 (Cards):** Pure White (#FFFFFF) with a `shadow-sm` (subtle 1px border and 2px blur) to distinguish content blocks from the background.
- **Level 2 (Active/Hero):** Charcoal (#1F2937) with a `shadow-lg`. These elements use deep color rather than high elevation to draw the eye.
- **Floating Actions:** The QRIS button uses a high-diffusion shadow with a 10% opacity tint of the accent color to appear "lifted" above the navigation bar.
- **Interactions:** Use a subtle backdrop blur (glassmorphism) on the fixed bottom navbar to allow a hint of content to show through while maintaining legibility.

## Shapes

The shape language is defined by **Rounded** geometry. 

- **Primary Cards:** Use `rounded-2xl` (1rem) for most service and transaction containers.
- **Hero Elements:** The main balance card and the bottom navbar top-corners use `rounded-3xl` (1.5rem) to emphasize their importance and provide a softer, "app-like" feel.
- **Icons & Avatars:** Always circular (full pill) to contrast against the rectangular nature of the cards.
- **Input Fields:** Should follow the `rounded-xl` (0.75rem) standard to match the approachable nature of the system.

## Components

### Buttons
- **Primary Action (Lime):** High contrast, Charcoal text. Use for "Top Up" and "Confirm."
- **Secondary Action (Dark Translucent):** Charcoal background with 80% opacity, white text. Used for "Transfer" and "Withdraw" within the dark hero card.
- **Ghost Buttons:** Minimal border or no border, used for "See All" links.

### Bottom Navigation
- **Structure:** A fixed container with a subtle top border. 
- **Floating QRIS:** A 56px circular button in Lime, positioned centrally and offset upwards by 24px.
- **Active State:** Charcoal icon/text with a 4px Lime dot placed 2px below the label.

### Cards
- **Transaction Rows:** Use a horizontal flex layout with a circular icon lead-in. Ensure a 1px `border-subtle` separator between items in a list.
- **Service Icons:** 4-column grid. Icons should be centered in a `rounded-2xl` white container that scales down by 5% on press.

### Inputs & Badges
- **Status Badges:** Small, rounded-full containers with `label-sm` text. Verified badges use Lime background; alerts use Red.
- **Input Fields:** White background, 1px border-gray-200, focusing to a 2px Charcoal ring.