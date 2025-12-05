// Types for slide manifests
export interface Slide {
  path: string;      // relative path within the MFE (e.g., "/whoami")
  title: string;     // display title for the slide
}

export interface SlideManifest {
  order: number;           // order in the presentation (1, 2, 3...)
  basePath: string;        // base route for this MFE (e.g., "/intro")
  slides: Slide[];         // array of slides in order
}

// Computed slide with full path
export interface ResolvedSlide {
  fullPath: string;        // complete path (e.g., "/intro/whoami")
  title: string;
  manifestOrder: number;   // which manifest this belongs to
  slideIndex: number;      // index within the manifest
  globalIndex: number;     // index across all slides
}

// Utility to resolve manifests into a flat ordered array of slides
export function resolveManifests(manifests: SlideManifest[]): ResolvedSlide[] {
  // Sort manifests by order
  const sorted = [...manifests].sort((a, b) => a.order - b.order);
  
  const resolved: ResolvedSlide[] = [];
  let globalIndex = 0;
  
  for (const manifest of sorted) {
    for (let slideIndex = 0; slideIndex < manifest.slides.length; slideIndex++) {
      const slide = manifest.slides[slideIndex];
      const fullPath = slide.path === "" 
        ? manifest.basePath 
        : `${manifest.basePath}${slide.path}`;
      
      resolved.push({
        fullPath,
        title: slide.title,
        manifestOrder: manifest.order,
        slideIndex,
        globalIndex,
      });
      
      globalIndex++;
    }
  }
  
  return resolved;
}

// Find current slide index from path
export function findSlideByPath(slides: ResolvedSlide[], path: string): number {
  // Try exact match first
  const exactIndex = slides.findIndex(s => s.fullPath === path);
  if (exactIndex !== -1) return exactIndex;
  
  // Handle root path - return first slide
  if (path === "/" && slides.length > 0) {
    return 0;
  }
  
  return -1;
}
