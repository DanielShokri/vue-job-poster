<script setup lang="ts">
    import { ref, defineProps } from 'vue';
    
    const props = defineProps({
      text: {
        type: String,
        required: true
      },
      position: {
        type: String,
        default: 'top',
        validator: (value: string) => ['top', 'right', 'bottom', 'left'].includes(value)
      }
    });
    
    const isVisible = ref(false);
    
    const showTooltip = () => {
      isVisible.value = true;
    };
    
    const hideTooltip = () => {
      isVisible.value = false;
    };
    </script>
    
    <template>
      <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
        <slot></slot>
        
        <div v-show="isVisible" 
             :class="[
               'absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm',
               {
                 '-top-10 left-1/2 -translate-x-1/2': position === 'top',
                 'top-1/2 left-full -translate-y-1/2 ml-2': position === 'right',
                 'top-full left-1/2 -translate-x-1/2 mt-2': position === 'bottom',
                 'top-1/2 right-full -translate-y-1/2 mr-2': position === 'left'
               }
             ]">
          {{ text }}
        </div>
      </div>
    </template>
    