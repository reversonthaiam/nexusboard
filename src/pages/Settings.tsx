import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  updateUserName,
  toggleTheme,
  toggleNotifications,
} from "../features/settings/settingsSlice";
import { Card } from "../components/ui/Card/Card";
import { Input } from "../components/ui/Input/Input";
import { Button } from "../components/ui/Button/Button";

export default function Settings() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const [name, setName] = useState(settings.userName);

  function handleSaveName() {
    if (name.trim()) dispatch(updateUserName(name.trim()));
  }

  return (
    <div>
      <h2 className="text-2xl font-medium text-[#0f4c5c] mb-6">Settings</h2>

      <div className="flex flex-col gap-6 max-w-lg">
        <Card>
          <h3 className="text-base font-medium text-[#0f4c5c] mb-4">Profile</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSaveName}>Save</Button>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-medium text-[#0f4c5c] mb-4">
            Preferences
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#0f4c5c]">Theme</p>
                <p className="text-xs text-gray-400">
                  Currently {settings.theme}
                </p>
              </div>
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-200
                  ${settings.theme === "dark" ? "bg-[#5f0f40]" : "bg-gray-200"}
                `}
              >
                <span
                  className={`
                  absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                  shadow transition-transform duration-200
                  ${settings.theme === "dark" ? "translate-x-5" : "translate-x-0"}
                `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#0f4c5c]">
                  Notifications
                </p>
                <p className="text-xs text-gray-400">
                  {settings.notifications ? "Enabled" : "Disabled"}
                </p>
              </div>
              <button
                onClick={() => dispatch(toggleNotifications())}
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-200
                  ${settings.notifications ? "bg-[#5f0f40]" : "bg-gray-200"}
                `}
              >
                <span
                  className={`
                  absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                  shadow transition-transform duration-200
                  ${settings.notifications ? "translate-x-5" : "translate-x-0"}
                `}
                />
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-medium text-[#0f4c5c] mb-4">
            Account info
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Name</span>
              <span className="text-[#0f4c5c] font-medium">
                {settings.userName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Theme</span>
              <span className="text-[#0f4c5c] font-medium capitalize">
                {settings.theme}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Notifications</span>
              <span className="text-[#0f4c5c] font-medium">
                {settings.notifications ? "On" : "Off"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
