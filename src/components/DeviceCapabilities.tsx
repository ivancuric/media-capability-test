import React from 'react';
import type { DeviceCapabilitiesData } from '../types/media';

interface DeviceCapabilitiesProps {
  capabilities: DeviceCapabilitiesData | null;
}

export function DeviceCapabilities({ capabilities }: DeviceCapabilitiesProps) {
  if (!capabilities) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Device Capabilities (InputDeviceInfo)</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <pre className="p-4 overflow-auto whitespace-pre-wrap font-mono text-sm text-gray-800">
            {JSON.stringify(capabilities.deviceCapabilities, null, 2)}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Stream Capabilities (MediaStreamTrack)</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <pre className="p-4 overflow-auto whitespace-pre-wrap font-mono text-sm text-gray-800">
            {JSON.stringify(capabilities.streamCapabilities, null, 2)}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Current Settings (MediaTrackSettings)</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <pre className="p-4 overflow-auto whitespace-pre-wrap font-mono text-sm text-gray-800">
            {JSON.stringify(capabilities.currentSettings, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}