import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';

// Overloaded function signatures
export function useVideoVisibility(videoRef: Ref<HTMLVideoElement | null>): { isVisible: Ref<boolean> };
export function useVideoVisibility(): { setVideoRef: (el: HTMLVideoElement | null, key: string | number) => void; cleanup: () => void; isVisible: Ref<boolean> };
export function useVideoVisibility(videoRef?: Ref<HTMLVideoElement | null>) {
  let observer: IntersectionObserver | null = null;
  const isVisible = ref(false);
  const videoRefs = new Map<string | number, HTMLVideoElement>();

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const video = entry.target as HTMLVideoElement;
      if (!video) return;

      isVisible.value = entry.isIntersecting;

      if (entry.isIntersecting) {
        // Try to play when video becomes visible
        video.play().catch(() => {
          console.log('Playback failed, might need user interaction');
        });
      } else {
        // Pause when video is not visible
        video.pause();
      }
    });
  };

  const setVideoRef = (el: HTMLVideoElement | null, key: string | number) => {
    if (el) {
      videoRefs.set(key, el);
      if (!observer) {
        observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.5,
          rootMargin: '50px'
        });
      }
      observer.observe(el);
    } else {
      const existingVideo = videoRefs.get(key);
      if (existingVideo && observer) {
        observer.unobserve(existingVideo);
      }
      videoRefs.delete(key);
    }
  };

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    videoRefs.clear();
  };

  onMounted(() => {
    if (videoRef?.value) {
      // Single video ref mode
      if (!observer) {
    observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.5,
          rootMargin: '50px'
    });
      }
    observer.observe(videoRef.value);

    // Initial play attempt
    videoRef.value.play().catch(() => {
      console.log('Initial playback failed, might need user interaction');
    });
    }
  });

  onUnmounted(() => {
    cleanup();
  });

  if (videoRef) {
    // Single video ref mode
    return {
      isVisible
    };
  } else {
    // Multiple video refs mode
    return {
      setVideoRef,
      cleanup,
      isVisible
    };
    }
}

