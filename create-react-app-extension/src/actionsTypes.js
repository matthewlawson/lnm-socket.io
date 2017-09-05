export const actionTypes = {
  BACKGROUND_SCRIPT: 'BACKGROUND_SCRIPT',
  CONNECTION_CHANGED: 'CONNECTION_CHANGED',
  MESSAGE_TEXT_RECEIVED: 'MESSAGE_TEXT_RECEIVED',
  MESSAGE_FETCH_SUCCESS: 'MESSAGE_FETCH_SUCCESS',
  SEND_MESSAGE_PENDING: 'sending_message_pending',
  SEND_MESSAGE_SUCCESS: 'sending_message_success',
  SEND_MESSAGE_FAILURE: 'sending_message_failure',
  MESSAGE_CHANGED: 'message_changed',
}

export const messageTypes = {
  MESSAGE_TEXT: 'message_text',
  CONNECTION_CHANGE: 'connection_change',
  FETCH_MESSAGES: 'FETCH_MESSAGES',
  SEND_MESSAGE: 'send_message',
}

export const messagePayloads = {
  CONNECTED: 'connected',
  RECONNECTING: 'reconnecting',
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting'
}