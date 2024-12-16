import React from "react";
import { Camera } from "lucide-react";
import type { VideoDevice } from "../types/media";

interface DeviceListProps {
  devices: VideoDevice[];
  selectedDevice: string | null;
  onDeviceSelect: (device: VideoDevice) => void;
}

export function DeviceList({
  devices,
  selectedDevice,
  onDeviceSelect,
}: DeviceListProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Available Devices</h2>
      {devices.length === 0 ? (
        <p className="text-gray-500">No video devices found</p>
      ) : (
        <div className="space-y-2">
          {devices.map((device) => (
            <button
              key={device.deviceId}
              onClick={() => onDeviceSelect(device)}
              className={`w-full flex items-center p-3 rounded-lg border ${
                selectedDevice === device.deviceId
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Camera className="w-5 h-5 mr-2 text-gray-600 shrink-0" />
              <div className="text-left overflow-hidden">
                <div className="font-medium">
                  {device.label || "Unnamed Device"}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {device.deviceId}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
