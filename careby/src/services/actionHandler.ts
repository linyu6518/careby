export interface Action {
  type: 'navigate' | 'book' | 'contact'
  target?: string
  label?: string
}

export function handleAction(action: Action): void {
  switch (action.type) {
    case 'navigate':
      if (action.target) {
        // Use requestAnimationFrame to avoid forced reflow
        requestAnimationFrame(() => {
          const element = document.querySelector(action.target!)
          if (element) {
            // Batch DOM operations
            requestAnimationFrame(() => {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
          } else {
            // Fallback to window location if element not found
            window.location.href = action.target!
          }
        })
      }
      break

    case 'book':
      if (action.target) {
        window.open(action.target, '_blank')
      } else {
        window.open('https://app.getcareby.ca/', '_blank')
      }
      break

    case 'contact':
      // Show contact information
      const phone = '1-646-578-9920'
      const email = 'hello@getcareby.ca'
      
      // Try to copy phone to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(phone).then(() => {
          alert(`Phone number copied to clipboard: ${phone}\nEmail: ${email}`)
        }).catch(() => {
          alert(`Phone: ${phone}\nEmail: ${email}`)
        })
      } else {
        alert(`Phone: ${phone}\nEmail: ${email}`)
      }
      break

    default:
      console.warn('Unknown action type:', action.type)
  }
}
