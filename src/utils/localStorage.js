export function loadState(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.error('Error loading from localStorage:', e);
  return defaultValue;
  }
}

export function saveState(key, state) {
  try { 
    localStorage.setItem(key, JSON.stringify(state)); 
  } catch (e) {
    console.error('Failed to save state:', e);
}
}