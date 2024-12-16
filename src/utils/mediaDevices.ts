import { VideoDevice } from '../types/media';

export async function requestVideoPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch (error) {
    console.error('Error requesting video permission:', error);
    return false;
  }
}

export async function getVideoDevices(): Promise<VideoDevice[]> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(
      (device) => device.kind === 'videoinput'
    ) as VideoDevice[];
  } catch (error) {
    console.error('Error enumerating devices:', error);
    return [];
  }
}

export function getDeviceCapabilities(
  device: VideoDevice
): MediaTrackCapabilities | null {
  try {
    return device.getCapabilities();
  } catch (error) {
    console.error('Error getting device capabilities:', error);
    return null;
  }
}

export async function getStreamCapabilities(deviceId: string): Promise<{
  capabilities: MediaTrackCapabilities | null;
  settings: MediaTrackSettings | null;
  stream: MediaStream | null;
}> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } },
    });

    const videoTrack = stream.getVideoTracks()[0];
    const capabilities = videoTrack.getCapabilities();
    const settings = videoTrack.getSettings();

    return {
      capabilities,
      settings,
      stream,
    };
  } catch (error) {
    console.error('Error getting stream capabilities:', error);
    return {
      capabilities: null,
      settings: null,
      stream: null,
    };
  }
}

export function supportsTorch(
  capabilities: MediaTrackCapabilities | null
): boolean {
  return Boolean(capabilities?.torch);
}

export async function toggleTorch(
  stream: MediaStream | null,
  enabled: boolean
): Promise<boolean> {
  if (!stream) return false;

  try {
    const videoTrack = stream.getVideoTracks()[0];
    await videoTrack.applyConstraints({
      advanced: [{ torch: enabled }],
    });
    return true;
  } catch (error) {
    console.error('Error toggling torch:', error);
    return false;
  }
}
