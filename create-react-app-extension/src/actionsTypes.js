export const actionTypes = {
  BACKGROUND_SCRIPT: 'BACKGROUND_SCRIPT',
  CONNECTION_CHANGED: 'CONNECTION_CHANGED',
  MESSAGE_TEXT_RECEIVED: 'MESSAGE_TEXT_RECEIVED',
  MESSAGE_FETCH_SUCCESS: 'MESSAGE_FETCH_SUCCESS',
}

export const messageTypes = {
  MESSAGE_TEXT: 'message_text',
  CONNECTION_CHANGE: 'connection_change',
  FETCH_MESSAGES: 'FETCH_MESSAGES',
}

export const messagePayloads = {
  CONNECTED: 'connected',
  RECONNECTING: 'reconnecting',
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting'
}