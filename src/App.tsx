import React, { useEffect, useState } from "react";
import { DeviceList } from "./components/DeviceList";
import { DeviceCapabilities } from "./components/DeviceCapabilities";
import { TorchControl } from "./components/TorchControl";
import {
  requestVideoPermission,
  getVideoDevices,
  getDeviceCapabilities,
  getStreamCapabilities,
  supportsTorch,
  toggleTorch,
} from "./utils/mediaDevices";
import { Camera } from "lucide-react";
import type { VideoDevice, DeviceCapabilitiesData } from "./types/media";

function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [devices, setDevices] = useState<VideoDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [capabilities, setCapabilities] =
    useState<DeviceCapabilitiesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);

  useEffect(() => {
    const initializeDevices = async () => {
      const permission = await requestVideoPermission();
      setHasPermission(permission);

      if (permission) {
        const videoDevices = await getVideoDevices();
        setDevices(videoDevices);
      }
    };

    initializeDevices();
  }, []);

  const handleDeviceSelect = async (device: VideoDevice) => {
    setLoading(true);
    setSelectedDevice(device.deviceId);
    setTorchEnabled(false);

    const deviceCaps = getDeviceCapabilities(device);
    const {
      capabilities: streamCaps,
      settings,
      stream,
    } = await getStreamCapabilities(device.deviceId);

    const data: DeviceCapabilitiesData = {
      deviceCapabilities: deviceCaps,
      streamCapabilities: streamCaps,
      currentSettings: settings,
      stream,
    };

    setCapabilities(data);

    console.log(device);
    console.log("device capabilities", deviceCaps);
    console.log("stream capabilities", streamCaps);
    console.log("current settings", settings);
    console.log("stream", stream);

    setLoading(false);
  };

  const handleTorchToggle = async (enabled: boolean) => {
    if (!capabilities?.stream) return;

    const success = await toggleTorch(capabilities.stream, enabled);
    if (success) {
      setTorchEnabled(enabled);
    }
  };

  if (hasPermission === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <Camera className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Camera Permission Required
          </h1>
          <p className="text-gray-600">
            Please allow camera access to view available devices and their
            capabilities.
          </p>
        </div>
      </div>
    );
  }

  const hasTorchSupport = capabilities?.streamCapabilities
    ? supportsTorch(capabilities.streamCapabilities)
    : false;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Camera className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Video Device Inspector
            </h1>
          </div>

          <DeviceList
            devices={devices}
            selectedDevice={selectedDevice}
            onDeviceSelect={handleDeviceSelect}
          />

          {loading ? (
            <div className="mt-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {selectedDevice && (
                <TorchControl
                  supported={hasTorchSupport}
                  enabled={torchEnabled}
                  onToggle={handleTorchToggle}
                />
              )}
              <DeviceCapabilities capabilities={capabilities} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
