use tauri::{
    menu::{MenuBuilder, MenuItemBuilder},
    tray::TrayIconBuilder,
    Manager,
};

mod convert;

#[tauri::command]
fn simulate_copy() -> Result<(), String> {
    use enigo::{Enigo, Key, Keyboard, Settings};
    let mut enigo = Enigo::new(&Settings::default()).map_err(|e| {
        format!("ไม่สามารถควบคุมแป้นพิมพ์ได้ — กรุณาอนุญาต Accessibility ใน System Settings > Privacy & Security > Accessibility: {e}")
    })?;

    // Release all modifier keys first (hotkey ⌘+Shift+L may still be held)
    #[cfg(target_os = "macos")]
    {
        enigo.key(Key::Meta, enigo::Direction::Release).ok();
        enigo.key(Key::Shift, enigo::Direction::Release).ok();
    }
    #[cfg(not(target_os = "macos"))]
    {
        enigo.key(Key::Control, enigo::Direction::Release).ok();
        enigo.key(Key::Shift, enigo::Direction::Release).ok();
    }

    // Wait for keys to fully release
    std::thread::sleep(std::time::Duration::from_millis(150));

    // Cmd+C on macOS
    #[cfg(target_os = "macos")]
    {
        enigo.key(Key::Meta, enigo::Direction::Press).ok();
        enigo.key(Key::Unicode('c'), enigo::Direction::Click).ok();
        enigo.key(Key::Meta, enigo::Direction::Release).ok();
    }
    #[cfg(not(target_os = "macos"))]
    {
        enigo.key(Key::Control, enigo::Direction::Press).ok();
        enigo.key(Key::Unicode('c'), enigo::Direction::Click).ok();
        enigo.key(Key::Control, enigo::Direction::Release).ok();
    }

    // Wait for clipboard to update
    std::thread::sleep(std::time::Duration::from_millis(200));
    Ok(())
}

#[tauri::command]
fn simulate_paste() -> Result<(), String> {
    use enigo::{Enigo, Key, Keyboard, Settings};
    let mut enigo = Enigo::new(&Settings::default()).map_err(|e| {
        format!("ไม่สามารถควบคุมแป้นพิมพ์ได้ — กรุณาอนุญาต Accessibility: {e}")
    })?;

    // Release modifier keys first
    #[cfg(target_os = "macos")]
    {
        enigo.key(Key::Meta, enigo::Direction::Release).ok();
        enigo.key(Key::Shift, enigo::Direction::Release).ok();
    }
    #[cfg(not(target_os = "macos"))]
    {
        enigo.key(Key::Control, enigo::Direction::Release).ok();
        enigo.key(Key::Shift, enigo::Direction::Release).ok();
    }

    std::thread::sleep(std::time::Duration::from_millis(100));

    #[cfg(target_os = "macos")]
    {
        enigo.key(Key::Meta, enigo::Direction::Press).ok();
        enigo.key(Key::Unicode('v'), enigo::Direction::Click).ok();
        enigo.key(Key::Meta, enigo::Direction::Release).ok();
    }
    #[cfg(not(target_os = "macos"))]
    {
        enigo.key(Key::Control, enigo::Direction::Press).ok();
        enigo.key(Key::Unicode('v'), enigo::Direction::Click).ok();
        enigo.key(Key::Control, enigo::Direction::Release).ok();
    }
    Ok(())
}

#[tauri::command]
fn convert_text(text: String) -> String {
    convert::detect_and_convert(&text)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            // Build tray menu
            let show = MenuItemBuilder::with_id("show", "เปิด PimSalab").build(app)?;
            let quit = MenuItemBuilder::with_id("quit", "ออก").build(app)?;
            let menu = MenuBuilder::new(app).items(&[&show, &quit]).build()?;

            // Build tray icon
            TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .tooltip("PimSalab — กด ⌘+Shift+L เพื่อแปลงภาษา")
                .menu(&menu)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "show" => {
                        if let Some(window) = app.get_webview_window("main") {
                            window.show().ok();
                            window.set_focus().ok();
                        }
                    }
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                })
                .build(app)?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            simulate_copy,
            simulate_paste,
            convert_text,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
