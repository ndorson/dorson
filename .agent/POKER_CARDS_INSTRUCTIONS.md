# 🎴 Poker Cards - Draggable Positioning Guide

## Overview
I've added 4 poker card images to your hero section that you can manually position by dragging them around!

## How It Works

### Phase 1: DRAG & POSITION (Current)

1. **Open your website** in the browser (it should already be running on your dev server)
2. **Look at the hero section** - you'll see 4 poker cards positioned around the hero image
3. **Click and drag** any card to move it to your desired position
4. **Position all 4 cards** wherever you think they look best

### Cards Added:
- Card 1 (herocard_1.png) - Initially at left: 10%, top: 20%
- Card 2 (herocard_2.png) - Initially at left: 80%, top: 30%
- Card 3 (herocard_3.png) - Initially at left: 15%, top: 70%
- Card 4 (herocard_4.png) - Initially at left: 85%, top: 60%

### Features:
✅ **Drag & Drop** - Click and drag to position
✅ **Hover Effects** - Cards glow purple when you hover over them
✅ **Visual Feedback** - Cursor changes to "grab" when hovering, "grabbing" when dragging
✅ **Responsive** - Positions are saved as percentages, so they work on all screen sizes
✅ **Touch Support** - Works on mobile/tablet too!

## Saving Your Positions

### When you're happy with the card positions:

1. **Press the "L" key** on your keyboard (L for "Lock" or "Log")
2. **Open the browser console** (F12 or Right-click → Inspect → Console tab)
3. You'll see a nicely formatted output showing:
   - The position of each card
   - The exact HTML code to paste

### Example Console Output:
```
════════════════════════════════════════
🎴 POKER CARD POSITIONS - COPY THIS!
════════════════════════════════════════
Card 1: left: 15.5%, top: 25.3%
Card 2: left: 82.1%, top: 18.7%
Card 3: left: 12.8%, top: 68.4%
Card 4: left: 88.3%, top: 55.9%

CODE TO PASTE:
<img src="/img/herocard_1.png" alt="Poker Card 1" class="hero-poker-card" data-card="1" style="left: 15.5%; top: 25.3%;">
<img src="/img/herocard_2.png" alt="Poker Card 2" class="hero-poker-card" data-card="2" style="left: 82.1%; top: 18.7%;">
...
════════════════════════════════════════
```

## Phase 2: LOCK POSITIONS

Once you tell me you're done positioning:

1. **Share the positions** from the console (or just tell me you're done)
2. I'll **replace the draggable cards** with fixed-position cards
3. I'll **remove the "draggable" class** so they can't be moved anymore
4. The positions will be **locked in the code**

## Phase 3: ADD SCROLL EFFECTS (Future)

After we lock the positions, we'll add:
- Scroll-based animations
- Parallax effects
- Cards moving/rotating as you scroll
- Whatever cool effects you want!

---

## Files Modified:
- ✅ `/src/js/main.js` - Added poker card HTML & drag functionality
- ✅ `/src/css/style.css` - Added poker card styling

## Quick Tips:
- The cards have a drop shadow to stand out
- They sit at z-index: 10, above the fog but below the text
- The transform: translate(-50%, -50%) centers each card on its position
- Positions use percentages for responsive design

**Have fun positioning your cards! When you're done, press "L" and let me know!** 🎴✨
