import { useState } from "react";

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    appName: "FitTracker",
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    dataRetention: "365",
    backupFrequency: "daily",
    maxFileSize: "10",
    allowUserContent: true,
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground mt-2">Configure application settings and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Application Name</label>
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => handleSettingChange("appName", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring focus:ring-primary transition"
              />
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="maintenance"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingChange("maintenanceMode", e.target.checked)}
                className="rounded border-border focus:ring focus:ring-primary"
              />
              <label htmlFor="maintenance" className="text-sm font-medium text-foreground">
                Maintenance Mode
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="registration"
                checked={settings.userRegistration}
                onChange={(e) => handleSettingChange("userRegistration", e.target.checked)}
                className="rounded border-border focus:ring focus:ring-primary"
              />
              <label htmlFor="registration" className="text-sm font-medium text-foreground">
                Allow User Registration
              </label>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Data Management</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Data Retention (days)</label>
              <select
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring focus:ring-primary transition"
              >
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
                <option value="730">2 years</option>
                <option value="-1">Forever</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Backup Frequency</label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => handleSettingChange("backupFrequency", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring focus:ring-primary transition"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Max File Size (MB)</label>
              <input
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleSettingChange("maxFileSize", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring focus:ring-primary transition"
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">User Permissions</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="userContent"
                checked={settings.allowUserContent}
                onChange={(e) => handleSettingChange("allowUserContent", e.target.checked)}
                className="rounded border-border focus:ring focus:ring-primary"
              />
              <label htmlFor="userContent" className="text-sm font-medium text-foreground">
                Allow User-Generated Content
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                className="rounded border-border focus:ring focus:ring-primary"
              />
              <label htmlFor="emailNotifications" className="text-sm font-medium text-foreground">
                Email Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">System Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <span className="text-sm text-muted-foreground">Version</span>
              <p className="text-sm font-medium text-foreground">v2.1.0</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <p className="text-sm font-medium text-foreground">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Database Size</span>
              <p className="text-sm font-medium text-foreground">2.4 GB</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Active Sessions</span>
              <p className="text-sm font-medium text-foreground">234</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
          >
            Save Settings
          </button>
          <button className="px-6 py-2 border border-border rounded-md hover:bg-muted transition">Reset to Defaults</button>
        </div>
      </div>
    </div>
  );
};