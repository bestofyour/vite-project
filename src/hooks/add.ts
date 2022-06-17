import { Ref } from 'vue'
import { ref, onMounted, watch, onUnmounted, unref } from 'vue'
import { useTitle } from '@vueuse/core'
import { isObject, isWindow } from '@/utils/is'

export function useScroll() {
    const title = useTitle('3213213')
    const s = ref<string | boolean>()
    s.value = '1'
    watch(
        () => title,
        (value, preValue) => {
            console.log(value, preValue)
        },
    )
    return {
        title,
    }
}
