# Copilot Instructions for KoruServices Particle Slider

## Project Overview
This is a single-file Three.js particle animation demo showcasing interactive 3D formations for Koru Services. The entire application lives in `index.html` - a self-contained particle slider with 4 distinct formations.

## Architecture & Core Components

### ParticleSlider Class (`index.html` lines 252-632)
- **Single responsibility**: Manages 15,000 particles across 4 formation types
- **State management**: Uses arrays for positions, colors, velocities, and targets
- **Formation pattern**: Each slide maps to a specific `create*Formation()` method
- **Physics simulation**: Velocity-based movement with damping (0.95) and noise injection

### Formation System
Each formation follows the same pattern:
```javascript
createFormationName() {
    const targets = [];
    // Mathematical generation of particle positions
    for (let i = 0; i < this.particleCount; i++) {
        // Position calculation with noise/randomness
        targets.push({ x, y, z });
    }
    return targets;
}
```

**Formation Types:**
1. **Spiral** (Slide 0): Logarithmic spiral with decreasing radius using `Math.cos/sin`
2. **Wave** (Slide 1): Scattered particle cloud following sine/cosine wave paths with `scatterRadius` 
3. **Sphere** (Slide 2): Fibonacci sphere distribution for even surface coverage
4. **Cube** (Slide 3): Solid volume fill with random positioning and organic noise

### Color System
- **RGB arrays**: `[r, g, b]` format with values 0.0-1.0
- **Slide mapping**: `colors[currentSlide]` directly maps to formations
- **Transition**: Gradual color interpolation during slide changes

## Development Patterns

### Particle Management Convention
- **Array indexing**: `i3 = i * 3` pattern for xyz coordinate triplets
- **Buffer updates**: Always call `needsUpdate = true` after modifying geometry
- **Performance**: Use `Float32Array` for positions/colors, regular arrays for logic

### Animation Loop Structure
```javascript
animate() {
    // 1. Update time
    // 2. Smooth mouse interpolation
    // 3. Update all particle positions/colors
    // 4. Apply global transformations
    // 5. Render scene
}
```

### Responsive Design
- **Mobile breakpoints**: 768px and 480px with progressive text scaling
- **Font weights**: 300 (light) → 600 (semi-bold) for readability
- **Z-index layering**: Canvas (1) → UI (2) → Loading (10)

## Modification Guidelines

### Adding New Formations
1. Create `createNewFormation()` method following the pattern
2. Add to `formations` array in `updateParticleTargets()`
3. Add corresponding color to `this.colors` array
4. Update `totalSlides` count and add HTML slide content

### Color Changes
- Modify `this.colors` array (line ~275)
- Use RGB values 0.0-1.0 (not 0-255)
- Current colors: Blue [0.2,0.4,0.8], Red [0.8,0.2,0.4], Green [0.4,0.6,0.2], Light Brown [0.8,0.7,0.5]
- Light colors work better against white background

### Performance Considerations
- **Particle count**: 15,000 is optimal balance for most devices
- **Noise frequency**: Keep `i * 0.01` range for smooth organic movement
- **Velocity damping**: 0.95 prevents oscillation while maintaining fluidity

### UI Content Updates
- **Text content**: Modify `.slide-content` divs (lines 203-239)
- **Font weight**: Subtitles use font-weight 600 for readability against particle backgrounds
- **Button styling**: Bronze theme (#b8956a) matches particle aesthetics
- **Navigation**: Automatic dot generation matches `totalSlides`

## External Dependencies
- **Three.js r128**: CDN-loaded, uses `BufferGeometry` and `PointsMaterial`
- **Google Fonts**: Montserrat with weights 300,400,600,700
- **No build process**: Direct file editing and browser refresh

## Common Debugging
- **Particles not appearing**: Check `needsUpdate` flags on geometry attributes
- **Performance issues**: Reduce `particleCount` or `scatterRadius` values
- **Color not changing**: Verify `colors` array index matches slide number
- **Formation broken**: Ensure all particles get valid `{x,y,z}` targets
