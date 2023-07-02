export enum EventType {

    MESSAGE = 'message',
    NOTIFICATION = 'notification',
    POPUP = 'popup',

    SERVICE_WORKER_UPDATE_FOUND = 'sw-update-found',
}

export type ApplicationEventCallback = (e: CustomEvent) => void

export class EventBus {
  constructor() {
    this.target = new EventTarget()
  }

  on(type: EventType, listener: ApplicationEventCallback) {
    return this.target.addEventListener(type, listener as (e: Event) => void)
  }

  once(type: EventType, listener: ApplicationEventCallback) {
    return this.target.addEventListener(type, listener as (e: Event) => void, { once: true })
  }

  off(type: EventType, listener: ApplicationEventCallback) {
    return this.target.removeEventListener(type, listener as (e: Event) => void)
  }

  emit(type: EventType, detail: Object) {
    return this.target.dispatchEvent(new CustomEvent(type, { detail, cancelable: true }))
  }

  notify(text: string, badge: string, timeout?: number) {
    this.emit(EventType.NOTIFICATION, {text, badge, timeout})
  }

  popup(text: string, image?: string) {
    this.emit(EventType.POPUP, {text, image})
  }

  private target: EventTarget
}
