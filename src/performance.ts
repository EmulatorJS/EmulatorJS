/**
 * performance.ts — Device capability detection and performance settings
 *
 * Low-spec Chromebooks (e.g. ARM or Intel Celeron with 4 GB RAM) can
 * struggle with demanding cores like PPSSPP at 2× resolution. This module
 * detects the hardware tier at startup and exposes a mode setting that
 * controls per-system EJS_Settings overrides.
 *
 * Tier detection heuristics (no single API is reliable on its own):
 *   - navigator.deviceMemory < 4 GB  → lean toward low-spec
 *   - navigator.hardwareConcurrency ≤ 2  → low-spec
 *   - GPU renderer string contains "SwiftShader" or "Swangle" → software GPU
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type PerformanceMode = "auto" | "performance" | "quality";

export interface DeviceCapabilities {
  /** Approximate device RAM in GB from navigator.deviceMemory, or null if unavailable. */
  deviceMemoryGB: number | null;
  /** Logical CPU core count from navigator.hardwareConcurrency. */
  cpuCores: number;
  /** WebGL 2 renderer string (may reveal software fallback). */
  gpuRenderer: string;
  /** True if the GPU is known to be a software rasteriser. */
  isSoftwareGPU: boolean;
  /** True when heuristics suggest the device is low-spec. */
  isLowSpec: boolean;
  /**
   * Recommended mode based on hardware alone.
   * Does NOT reflect the user's manual override.
   */
  recommendedMode: "performance" | "quality";
}

// ── Detection ─────────────────────────────────────────────────────────────────

/** Inspect the WebGL renderer string to detect software rasterisation. */
function getGpuRenderer(): string {
  try {
    const canvas  = document.createElement("canvas");
    const gl      = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return "unknown";
    const ext      = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return "unknown";
    return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
  } catch {
    return "unknown";
  }
}

/** Detect software-rasteriser keywords in the renderer string. */
function isSoftwareRenderer(renderer: string): boolean {
  const lower = renderer.toLowerCase();
  return (
    lower.includes("swiftshader") ||
    lower.includes("swangle")     ||
    lower.includes("llvmpipe")    ||
    lower.includes("softpipe")    ||
    lower.includes("virgl")
  );
}

/**
 * Probe the device's hardware tier.
 *
 * Call this once at startup (it touches the GPU via WebGL, so it's
 * slightly expensive but still synchronous).
 */
export function detectCapabilities(): DeviceCapabilities {
  const deviceMemoryGB: number | null =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? null;

  const cpuCores    = navigator.hardwareConcurrency ?? 1;
  const gpuRenderer = getGpuRenderer();
  const isSoftwareGPU = isSoftwareRenderer(gpuRenderer);

  const isLowSpec =
    isSoftwareGPU                           ||
    cpuCores <= 2                           ||
    (deviceMemoryGB !== null && deviceMemoryGB < 4);

  return {
    deviceMemoryGB,
    cpuCores,
    gpuRenderer,
    isSoftwareGPU,
    isLowSpec,
    recommendedMode: isLowSpec ? "performance" : "quality",
  };
}

// ── Effective mode resolution ─────────────────────────────────────────────────

/**
 * Resolve the actual performance mode taking the user's override into account.
 *
 * "auto" → uses the detected recommendation.
 */
export function resolveMode(
  userMode: PerformanceMode,
  caps: DeviceCapabilities
): "performance" | "quality" {
  if (userMode === "auto") return caps.recommendedMode;
  return userMode;
}

// ── Human-readable summaries ──────────────────────────────────────────────────

export function formatCapabilitiesSummary(caps: DeviceCapabilities): string {
  const ram = caps.deviceMemoryGB !== null
    ? `${caps.deviceMemoryGB} GB RAM`
    : "RAM unknown";
  const cores = `${caps.cpuCores} CPU ${caps.cpuCores === 1 ? "core" : "cores"}`;
  const gpu   = caps.isSoftwareGPU
    ? "Software GPU (slow)"
    : caps.gpuRenderer !== "unknown"
      ? caps.gpuRenderer.replace(/\(.*?\)/g, "").trim()
      : "GPU info unavailable";
  return `${ram} · ${cores} · ${gpu}`;
}
