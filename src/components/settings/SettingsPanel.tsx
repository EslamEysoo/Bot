import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Shield, Cloud, Bell, Palette, User, Lock, Save } from "lucide-react";

interface SettingsPanelProps {
  activeCategory?: string;
}

const SettingsPanel = ({ activeCategory = "profile" }: SettingsPanelProps) => {
  return (
    <div className="w-full h-full p-4 bg-background rounded-lg shadow-sm">
      <Tabs defaultValue={activeCategory} className="w-full">
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <User className="h-5 w-5" /> User Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input id="username" defaultValue="CyberUser" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="user@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="avatar" className="text-sm font-medium">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=cybersecurity"
                    alt="Avatar"
                    className="h-16 w-16 rounded-full bg-secondary"
                  />
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  className="w-full h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  defaultValue="Cybersecurity enthusiast and programmer."
                />
              </div>
            </div>
            <Button className="mt-4">
              <Save className="mr-2 h-4 w-4" /> Save Profile
            </Button>
          </div>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Lock className="h-5 w-5" /> Privacy Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Data Collection</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow app to collect usage data for improvements
                  </p>
                </div>
                <Switch defaultChecked id="data-collection" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Share Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Share anonymous usage statistics
                  </p>
                </div>
                <Switch id="share-analytics" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Personalized Suggestions</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized security recommendations
                  </p>
                </div>
                <Switch defaultChecked id="personalized-suggestions" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Conversation History</h3>
                  <p className="text-sm text-muted-foreground">
                    Store chat history for future reference
                  </p>
                </div>
                <Switch defaultChecked id="conversation-history" />
              </div>
            </div>
            <Button className="mt-4">
              <Save className="mr-2 h-4 w-4" /> Save Privacy Settings
            </Button>
          </div>
        </TabsContent>

        {/* Cloud Integration */}
        <TabsContent value="cloud" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Cloud className="h-5 w-5" /> Cloud Integration
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable Cloud Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Process complex requests in the cloud
                  </p>
                </div>
                <Switch defaultChecked id="cloud-processing" />
              </div>
              <div className="space-y-2">
                <label htmlFor="api-key" className="text-sm font-medium">
                  API Key
                </label>
                <Input
                  id="api-key"
                  type="password"
                  defaultValue="••••••••••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto-Sync</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync data with cloud
                  </p>
                </div>
                <Switch defaultChecked id="auto-sync" />
              </div>
              <div className="space-y-2">
                <label htmlFor="sync-frequency" className="text-sm font-medium">
                  Sync Frequency
                </label>
                <select
                  id="sync-frequency"
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  defaultValue="hourly"
                >
                  <option value="realtime">Real-time</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="manual">Manual Only</option>
                </select>
              </div>
            </div>
            <Button className="mt-4">
              <Save className="mr-2 h-4 w-4" /> Save Cloud Settings
            </Button>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="h-5 w-5" /> Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Security Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for security issues
                  </p>
                </div>
                <Switch defaultChecked id="security-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Task Completion</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified when automated tasks complete
                  </p>
                </div>
                <Switch defaultChecked id="task-completion" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Updates & News</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive app updates and cybersecurity news
                  </p>
                </div>
                <Switch id="updates-news" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="notification-sound"
                  className="text-sm font-medium"
                >
                  Notification Sound
                </label>
                <select
                  id="notification-sound"
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  defaultValue="beep"
                >
                  <option value="beep">Beep</option>
                  <option value="chime">Chime</option>
                  <option value="robot">Robot Voice</option>
                  <option value="silent">Silent</option>
                </select>
              </div>
            </div>
            <Button className="mt-4">
              <Save className="mr-2 h-4 w-4" /> Save Notification Settings
            </Button>
          </div>
        </TabsContent>

        {/* Theme Settings */}
        <TabsContent value="theme" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Palette className="h-5 w-5" /> Theme Settings
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 bg-blue-50 dark:bg-blue-900 border-blue-500"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500 mb-2"></div>
                    <span className="text-xs">Cyber Blue</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 bg-green-50 dark:bg-green-900 border-green-500"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500 mb-2"></div>
                    <span className="text-xs">Matrix Green</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 bg-purple-50 dark:bg-purple-900 border-purple-500"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-500 mb-2"></div>
                    <span className="text-xs">Tech Purple</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme for the application
                  </p>
                </div>
                <Switch defaultChecked id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Animation Effects</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable UI animations and transitions
                  </p>
                </div>
                <Switch defaultChecked id="animation-effects" />
              </div>
              <div className="space-y-2">
                <label htmlFor="font-size" className="text-sm font-medium">
                  Font Size
                </label>
                <select
                  id="font-size"
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  defaultValue="medium"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
            <Button className="mt-4">
              <Save className="mr-2 h-4 w-4" /> Save Theme Settings
            </Button>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5" /> Security Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Require additional verification when logging in
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="current-password"
                  className="text-sm font-medium"
                >
                  Current Password
                </label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  New Password
                </label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium"
                >
                  Confirm New Password
                </label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Biometric Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Use fingerprint or face recognition to unlock app
                  </p>
                </div>
                <Switch defaultChecked id="biometric" />
              </div>
            </div>
            <Button className="mt-4">
              <Save className="mr-2 h-4 w-4" /> Save Security Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
