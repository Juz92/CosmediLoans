# CosmodiLoans Hero Scroll Animation — Video Prompts

## Workflow Overview

**Goal:** A tear-down style scroll animation for the homepage hero section. As the user scrolls, a cinematic video plays showing the emotional journey from "I need this procedure but can't afford it" to "I'm approved, I'm confident, I'm going ahead."

**Pipeline:**
1. **Whisk (or Midjourney/Flux)** — Generate the FIRST FRAME and LAST FRAME as still images
2. **Google Veo3** — Generate the video that transitions between the two frames

**Placement:** Homepage hero background, autoplaying behind/beside the lead form. Plays on scroll or loops on autoplay.

**Aspect ratio:** 16:9 (desktop hero) with 9:16 vertical crop also needed for mobile

**Duration target:** 6-8 seconds

**Brand palette:** Deep blue #1e40af, Light blue #3b82f6, Blue wash #eff6ff, White, Warm skin tones

---

## Deep-Dive: The Brand's Visual World

**The Physical Reality:**
CosmodiLoans doesn't touch patients directly — it's the bridge between worry and relief. The physical moment is: someone sitting at their kitchen table late at night, stressed about how to pay for a procedure... then the shift to sitting in the waiting room of a beautiful clinic, calm and ready.

**The Sensory Signature:**
The ONE texture is the **glow of a phone screen on a face in soft light** — that's the moment the approval comes through. The most satisfying moment is seeing "Approved" on a screen.

**The Emotional Journey:**
- BEFORE: Anxious, uncertain, researching late at night, overwhelmed by costs
- AFTER: Calm, confident, sitting in a bright medical space, smiling, approved

**The Single Moment:** The shift from a worried face illuminated by a phone screen to a confident smile in bright clinical daylight.

---

## CONCEPT: "From Worry to Walking In" (PRIMARY)

The hero video tells the story of the emotional transformation in one seamless shot. We start in the anxiety of researching costs alone, and transition into the confidence of walking into your procedure — financed, approved, ready.

---

### WHISK / IMAGE GENERATION PROMPTS

#### FIRST FRAME (START)

**SUBJECT:** A woman in her early 30s sitting at a kitchen table at night, looking down at her phone with a concerned, thoughtful expression. Her face is softly illuminated by the cool blue-white glow of the phone screen. One hand rests on her cheek.

**SCENE:** Dimly lit modern kitchen. Warm pendant light in the far background creates depth but the foreground is mostly lit by the phone. A laptop is open on the table showing a medical procedure cost page (blurred). A coffee mug sits nearby. The mood is quiet, contemplative, slightly anxious. 70% of the frame is in soft shadow.

**STYLE:** Cinematic lifestyle photography. Full-frame camera with 35mm lens, f/1.8 aperture. Cool blue tone from phone mixed with warm amber from background pendant. Shallow depth of field on the subject's face. Intimate, documentary feel — like a scene from a Netflix drama. Aspect ratio 16:9.

**COMBINED PROMPT:**
> A woman in her early 30s sitting at a kitchen table at night, looking down at her phone with a concerned expression. Her face is softly illuminated by the cool blue-white glow of the phone screen, one hand resting on her cheek. Dimly lit modern kitchen with a warm pendant light in the far background creating depth. A laptop open on the table showing a blurred cost page. Coffee mug nearby. 70% of the frame in soft shadow. Cinematic lifestyle photography, full-frame 35mm lens, f/1.8, cool blue phone glow mixed with warm amber background. Shallow depth of field on face. Intimate documentary mood like a Netflix drama scene. Aspect ratio 16:9. No text overlay.

---

#### LAST FRAME (END)

**SUBJECT:** The same woman, now smiling warmly and confidently, walking through the entrance of a bright, modern medical clinic. She's wearing a casual but polished outfit (white blouse, carrying a small bag). Her expression is calm, assured, and slightly excited.

**SCENE:** Bright, airy medical clinic lobby flooded with natural daylight from floor-to-ceiling windows. Clean white walls with subtle blue accent details (#1e40af). Indoor plants in the background. A reception desk is softly blurred behind her. The space feels premium and welcoming. 90% of the frame is bright and well-lit.

**STYLE:** Cinematic lifestyle photography. Full-frame camera with 35mm lens, f/2.0 aperture. Warm natural daylight with soft shadows. The colour palette shifts from cool to warm — golden morning light dominates. Same photographic style as the first frame but with a complete tonal shift from dark/cool to bright/warm. Aspect ratio 16:9.

**COMBINED PROMPT:**
> A confident woman in her early 30s smiling warmly while walking through the entrance of a bright modern medical clinic. Wearing a casual white blouse and carrying a small bag. Calm, assured, slightly excited expression. Bright airy clinic lobby flooded with natural daylight from floor-to-ceiling windows. Clean white walls with subtle blue accent details. Indoor plants, blurred reception desk in background. Premium welcoming space. 90% of frame bright and well-lit. Cinematic lifestyle photography, full-frame 35mm lens, f/2.0, warm natural daylight with soft shadows. Golden morning light dominates. Aspect ratio 16:9. No text overlay.

---

### GOOGLE VEO3 TRANSITION PROMPT

> Create a seamless 8-second cinematic video transitioning between two scenes. The video begins with a close-up of a woman sitting at her kitchen table at night, her face lit by the blue glow of a phone screen, looking concerned as she researches medical procedure costs. Over 8 seconds, the scene gradually transforms: the blue phone light slowly warms and brightens, expanding to fill the frame with golden daylight. The kitchen environment dissolves into a bright modern medical clinic lobby. The woman's expression shifts from worry to a calm, confident smile as she walks through the clinic entrance. The camera maintains a steady eye-level perspective throughout, with a slow gentle drift forward. The transition should feel like a sunrise — darkness giving way to warm light. The lighting shift is the primary driver of the transition, not a hard cut. Cinematic quality, shallow depth of field, 24fps, natural skin tones. The emotional arc moves from anxiety to relief to confidence. Like a premium healthcare brand commercial.

---

## ALTERNATIVE CONCEPTS

### ALTERNATIVE A: "The Approval Glow"

**START FRAME:**
> Extreme close-up of a woman's eyes in soft shadow, reflecting the blue glow of a phone screen. Worried brow, searching expression. Dark background, only the eyes and phone reflection visible. Cinematic macro photography, 100mm lens, f/2.0. Cool blue tones. 16:9.

**END FRAME:**
> Same close-up framing of the woman's eyes, but now her face is bathed in warm golden light. Her eyes are bright, crinkled at the corners in a genuine smile. The phone screen reflection shows a green checkmark "Approved" symbol. Warm amber and gold tones. 16:9.

**VEO3 PROMPT:**
> Create a 6-second cinematic close-up video of a woman's eyes transitioning from worry to joy. Begin with her eyes reflecting a cool blue phone screen glow in darkness, brow furrowed with concern. Over 6 seconds, the blue light gradually warms to golden amber. Her expression softens, eyes brighten, and crow's feet appear as she breaks into a genuine smile. The phone screen reflection shifts from text to a green checkmark. Shallow depth of field, macro lens, steady framing. Emotional arc from anxiety to relief. Like a luxury skincare commercial but for a financial services brand.

---

### ALTERNATIVE B: "The Cost Counter"

**START FRAME:**
> A medical bill/invoice lying on a clean white surface, with large dollar figures visible. A hand hovers over it, fingers slightly tense. Clinical overhead lighting, stark and slightly cold. The numbers feel overwhelming. Product photography, overhead shot, f/8 deep focus. Cool desaturated tones. 16:9.

**END FRAME:**
> Same overhead angle, same white surface. The invoice has been replaced by a simple card/document showing "Monthly Repayment: $297/mo" with a small CosmodiLoans blue (#1e40af) accent stripe. The hand is now relaxed, resting flat on the table beside a coffee cup. Warm morning light from the side. The mood has shifted from stress to manageable. 16:9.

**VEO3 PROMPT:**
> Create a 6-second overhead video of a financial transformation. Begin looking down at a medical invoice with large dollar figures on a white surface, with a tense hand hovering over it. Over 6 seconds, the lighting shifts from cold clinical white to warm morning gold entering from the right side. The invoice smoothly transforms into a simple repayment card showing a smaller monthly figure. The hand relaxes and settles flat on the surface. A coffee cup slides into frame. The transition is driven by the lighting change. Steady overhead camera, no movement. Like a premium fintech commercial.

---

### ALTERNATIVE C: "The Waiting Room"

**START FRAME:**
> An empty modern medical clinic waiting room, shot from a patient's perspective sitting in a chair. Clean white and blue interior, natural light from windows. The room is serene but empty — no one else is there. The mood is anticipatory, calm, with a hint of vulnerability. Wide angle, 24mm, f/4. 16:9.

**END FRAME:**
> Same waiting room, same perspective. Now the woman is sitting in the chair across, smiling and looking at her phone (maybe texting someone "I'm here, just about to go in"). A nurse/receptionist walks past in the blurred background. The room feels alive and welcoming. Warm light has intensified. Wide angle, 24mm, f/4. 16:9.

**VEO3 PROMPT:**
> Create a 7-second video in a modern medical clinic waiting room. Begin with an empty serene waiting area shot from a seated patient's eye level. Clean white and blue interior with natural window light. Over 7 seconds, the space subtly comes to life: the light warms slightly, a woman appears in the chair opposite looking at her phone and smiling, a nurse walks through the background. The camera stays perfectly still. The transition from empty to occupied should feel natural, like time-lapse but at normal speed. The emotional arc is from solitary anticipation to comfortable readiness. Clinical yet warm. Like a healthcare brand film.

---

## TECHNICAL NOTES

- **Aspect ratio:** Generate at 16:9 for desktop hero. Also generate 9:16 vertical crops for mobile hero (reframe the same concept)
- **Colour consistency:** Both frames MUST share: skin tones, clothing colour (white/cream blouse), and at least one blue accent (#1e40af)
- **Composition rule:** The woman's face should be at roughly the same position (left third) in both frames for smooth interpolation
- **Material emphasis:** The lighting is the hero material — the shift from cool blue phone glow to warm golden daylight is the entire story
- **File targets:** MP4, H.264, under 5MB for web. WebM as backup format. Poster frame = the end frame (bright/confident)
- **Autoplay settings:** `autoplay muted loop playsinline` — no sound needed
- **Backup plan:** If AI generation doesn't produce the quality needed, search stock footage for: "woman healthcare clinic confident" or "medical financing approval" on Artgrid, Pexels, or Coverr

---

## RECOMMENDED CONCEPT

**Primary pick: "From Worry to Walking In"**

Rationale:
1. **Strongest emotional arc** — moves from a universally relatable moment (worrying about costs at night) to an aspirational outcome (walking into your procedure with confidence)
2. **Smooth interpolation** — same subject, same camera distance, lighting change as the primary driver (Tier 1 reliability for AI video generation)
3. **Brand story without text** — anyone watching understands the before/after without reading a word
4. **Colour consistency** — both frames share the subject, clothing, and blue accents. Only the lighting temperature changes.
5. **Scroll narrative** — as users scroll down the page, the darkness-to-light transition maps perfectly to the journey of discovering CosmodiLoans (worry → solution → confidence)
6. **Reusable assets** — the start and end frames work as standalone images for social ads, OG images, and blog headers

**Best backup:** Alternative A ("The Approval Glow") — great for social media and shorter loops (6 sec)

**Best for social/ads:** Alternative A or B — both work as standalone short-form content on Instagram Reels / TikTok

---

## USAGE ON THE WEBSITE

**Hero implementation:**
```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/images/hero-end-frame.webp"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/hero-scroll.webm" type="video/webm" />
  <source src="/videos/hero-scroll.mp4" type="video/mp4" />
</video>
```

**Overlay:** Semi-transparent gradient overlay from left (for text readability) using `bg-gradient-to-r from-white/90 via-white/70 to-transparent`

**Performance:** Lazy load video after hero text/form render. Use poster frame for instant visual while video loads. Preload="none" to save bandwidth, play on intersection observer.

**Mobile:** Use the 9:16 vertical crop via `<source media="(max-width: 768px)">` or serve a poster image only on mobile to save bandwidth.
