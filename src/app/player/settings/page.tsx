"use client";

import Header from "../../../components/Header";
import { useState } from "react";

export default function SettingsPage() {
  const [fontSize, setFontSize] = useState(16);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <>
      <Header transparent />
      <div className="min-h-screen p-6 bg-gray-400 text-gray-800">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-12 space-y-6">
          <h1 className="text-2xl font-bold text-center">Settings</h1>

          {/* Font Size Setting */}
          <div className="space-y-2">
            <label htmlFor="fontSize" className="block font-medium">
              Font Size Preview:
            </label>
            <div
              className="px-3 py-2 rounded border border-gray-300 bg-gray-50 inline-block"
              style={{ fontSize: `${fontSize}px` }}
            >
              This is your current font size
            </div>
            <input
              id="fontSize"
              type="range"
              min={14}
              max={20}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <p className="text-sm text-gray-600">
              Adjusts the text size across the app.
            </p>
          </div>

          {/* Email Updates Setting */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailUpdates}
                onChange={(e) => setEmailUpdates(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <span className="font-medium">Receive Email Updates</span>
            </label>
            <p className="text-sm text-gray-600">
              Toggle to enable or disable email notifications.
            </p>
          </div>

          {/* Save Button (stubbed) */}
          <button
            onClick={() => alert("Settings saved (not yet persisted)")}
            className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
}
