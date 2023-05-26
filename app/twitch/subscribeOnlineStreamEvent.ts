export function subscribeToStreamOnlineEvent(id: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': process.env.TWITCH_CLIENT_ID || '',
        'Authorization': `Bearer ${process.env.TWITCH_ACCESS_TOKEN || ''}`,
      },
      body: JSON.stringify({
        type: 'stream.online',
        version: '1',
        condition: {
          broadcaster_user_id: id,
        },
        transport: {
          method: 'webhook',
          callback: process.env.TWITCH_WEBHOOK_CALLBACK_URL || '',
        },
      }),
    })
      .then(response => response.json())
      .then(() => {
        resolve('success')
      })
      .catch((error) => {
        reject(error)
      })
  })
}
