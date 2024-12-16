export interface VideoDevice extends MediaDeviceInfo {
  getCapabilities(): MediaTrackCapabilities;
}

export interface DeviceCapabilitiesData {
  deviceCapabilities: MediaTrackCapabilities | null;
  streamCapabilities: MediaTrackCapabilities | null;
  currentSettings: MediaTrackSettings | null;
  stream: MediaStream | null;
}