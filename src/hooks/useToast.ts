import { createVNode, render } from 'vue'
import Toast from '@/components/Toast.vue'

interface ToastOptions {
  message: string
  type: 'success' | 'danger' | 'warning'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  duration?: number
}

export function useToast() {
  const show = (options: ToastOptions) => {
    const container = document.createElement('div')
    const vnode = createVNode(Toast, {
      ...options,
      onDestroy: () => {
        render(null, container)
      }
    })
    
    render(vnode, container)
    const component = vnode.component
    if (component) {
      component.exposed?.show()
    }
  }

  return {
    show
  }
}
