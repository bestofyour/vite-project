<template>
    <div>
        <div>index{{title}}</div>
        <div ref="lfElRef" id="container" />
    </div>

</template>

<script lang="ts">
import { useScroll } from '@/hooks/add';
import  LogicFlow from "@logicflow/core"
import  type {Definition} from "@logicflow/core"
import { ref, nextTick, unref, computed, defineComponent, watch, onMounted } from 'vue';
import type { Ref } from 'vue';
import '@logicflow/core/dist/style/index.css';
import { Snapshot, BpmnElement, Menu, DndPanel, SelectionSelect } from '@logicflow/extension';
import {toLogicFlowData} from './adp'
import FlowChartToolbar from './FlowChartToolbar.vue';


export default defineComponent({
  name: 'FlowChart',
    props: {
      flowOptions: {
        type: Object as PropType<Definition>,
        default: () => ({}),
      },

      data: {
        type: Object as PropType<any>,
        default: () => ({}),
      },

      toolbar: {
        type: Boolean,
        default: true,
      },
      patternItems: {
        type: Array,
      },
    },

  setup(props) {
    const lfInstance = ref(null) as Ref<LogicFlow | null>;
    const lfElRef = ref(null);

  

      onMounted(init)
    const data = {
      // 节点
      nodes: [
        {
          id: 50,
          type: 'rect',
          x: 100,
          y: 150,
          text: '你好',
        },
        {
          id: 21,
          type: 'circle',
          x: 300,
          y: 150,
        },
      ],
      // 边
      edges: [
        {
          type: 'polyline',
          sourceNodeId: 50,
          targetNodeId: 21,
        },
      ],
    };

      // init logicFlow
      async function init() {
        await nextTick();

        const lfEl = unref(lfElRef);
        if (!lfEl) {
          return;
        }
        LogicFlow.use(DndPanel);

        // Canvas configuration
        LogicFlow.use(Snapshot);
        // Use the bpmn plug-in to introduce bpmn elements, which can be used after conversion in turbo
        LogicFlow.use(BpmnElement);
        // Start the right-click menu
        LogicFlow.use(Menu);
        LogicFlow.use(SelectionSelect);

        lfInstance.value = new LogicFlow({
          ...unref(getFlowOptions),
          container: lfEl,
        });
        const lf = unref(lfInstance)!;
        lf?.setDefaultEdgeType('line');
        onRender();
        lf?.setPatternItems(props.patternItems);
      }

       async function onRender() {
        await nextTick();
        const lf = unref(lfInstance);
        if (!lf) {
          return;
        }
        const lFData = toLogicFlowData(props.data);
        lf.render(lFData);
      }


      const getFlowOptions = computed(() => {
        const { flowOptions } = props;

        const defaultOptions: Partial<Definition> = {
          grid: true,
          background: {
            color: '#f7f9ff',
          },
          keyboard: {
            enabled: true,
          },
          ...flowOptions,
        };
        return defaultOptions as Definition;
      });

         watch(
        () => unref(getFlowOptions),
        (options) => {
          unref(lfInstance)?.updateEditConfig(options);
        },
      );


      const {title} = useScroll()
       return {
        title,
        lfElRef,
      };
  }

})


</script>

<style  scoped>
  #container {
    width: 1000px;
    height: 1000px;
    background-color: antiquewhite;
  }
</style>