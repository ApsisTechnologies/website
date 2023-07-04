import { onMounted, onUnmounted, inject } from 'vue'
import { EventType, EventBus, ApplicationEventCallback } from 'lib/event'
import { useEventListener } from '@vueuse/core'

export const useEventBus = (): EventBus => inject<EventBus | null>('eventBus', null) as EventBus

export function useWindowEvent(eventName: string, callback: (event: Event) => void) {
  return useEventListener(window, eventName, callback)
}

export function useApplicationEvent(event: EventType, callback: ApplicationEventCallback) {
  const eventBus = useEventBus()
  onMounted(() => { eventBus.on(event, callback) })
  onUnmounted(() => { eventBus.off(event, callback) })
}
