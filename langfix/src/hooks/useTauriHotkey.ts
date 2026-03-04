import { useEffect, useRef } from 'react';

// Check if running inside Tauri
const isTauri = () => '__TAURI__' in window || '__TAURI_INTERNALS__' in window;

export function useTauriHotkey() {
  const registered = useRef(false);

  useEffect(() => {
    if (!isTauri() || registered.current) return;
    registered.current = true;

    let cleanup: (() => void) | null = null;

    (async () => {
      try {
        const { register, unregister } = await import(
          '@tauri-apps/plugin-global-shortcut'
        );
        const { readText, writeText } = await import(
          '@tauri-apps/plugin-clipboard-manager'
        );
        const { invoke } = await import('@tauri-apps/api/core');

        // Hotkey: Cmd+Shift+L on macOS, Ctrl+Shift+L on others
        const shortcut = navigator.platform.includes('Mac')
          ? 'CommandOrControl+Shift+L'
          : 'CommandOrControl+Shift+L';

        let isProcessing = false;

        await register(shortcut, async () => {
          // Debounce: prevent double-firing
          if (isProcessing) return;
          isProcessing = true;

          console.log('[PimSalab] Hotkey triggered!');

          try {
            // 1. Simulate Cmd+C to copy selected text
            await invoke('simulate_copy');

            // 2. Read clipboard
            const text = await readText();
            if (!text || text.trim() === '') {
              console.log('[PimSalab] Clipboard empty, skipping');
              return;
            }

            console.log('[PimSalab] Original:', text);

            // 3. Convert using Rust backend
            const converted: string = await invoke('convert_text', {
              text,
            });

            console.log('[PimSalab] Converted:', converted);

            if (converted === text) {
              console.log('[PimSalab] No change needed');
              return;
            }

            // 4. Write converted text to clipboard
            await writeText(converted);

            // 5. Simulate Cmd+V to paste
            await invoke('simulate_paste');

            console.log('[PimSalab] Done!');
          } catch (err) {
            console.error('[PimSalab] Conversion error:', err);
          } finally {
            // Reset debounce after a short delay
            setTimeout(() => { isProcessing = false; }, 500);
          }
        });

        console.log('[PimSalab] Global hotkey registered:', shortcut);

        cleanup = () => {
          unregister(shortcut).catch(console.error);
        };
      } catch (err) {
        console.error('[PimSalab] Failed to register hotkey:', err);
      }
    })();

    return () => {
      cleanup?.();
    };
  }, []);
}
