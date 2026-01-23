class AuthEventEmitter {
  constructor() {
    this.listeners = new Set()
  }

  subscribe(listener) {
    this.listeners.add(listener)

return () => this.listeners.delete(listener)
  }

  emit() {
    this.listeners.forEach(listener => listener())
  }
}

export const authEvents = new AuthEventEmitter()
