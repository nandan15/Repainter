export {}; // This makes the file a module

declare global {
  interface Window {
    google: typeof google;
  }
}