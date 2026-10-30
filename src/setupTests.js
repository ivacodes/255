import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// jsdom does not implement media playback
window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();
