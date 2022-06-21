import { NodeConfig } from '@logicflow/core';
import { ToolbarTypeEnum } from '@/enums/pageEnum';

export interface ToolbarConfig {
  type?: string | ToolbarTypeEnum;
  tooltip?: string | boolean;
  icon?: string;
  disabled?: boolean;
  separate?: boolean;
}
