import React from 'react';
import { Flashlight, FlashlightOff } from 'lucide-react';

interface TorchControlProps {
  supported: boolean;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function TorchControl({ supported, enabled, onToggle }: TorchControlProps) {
  if (!supported) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center text-gray-500">
          <FlashlightOff className="w-5 h-5 mr-2" />
          <span>Torch/flashlight not supported on this device</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <button
        onClick={() => onToggle(!enabled)}
        className={`flex items-center px-4 py-2 rounded-md ${
          enabled
            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {enabled ? (
          <>
            <Flashlight className="w-5 h-5 mr-2" />
            Turn Off Torch
          </>
        ) : (
          <>
            <FlashlightOff className="w-5 h-5 mr-2" />
            Turn On Torch
          </>
        )}
      </button>
    </div>
  );
}