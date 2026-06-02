import { BaseItem } from './base-item.model';


export interface PoderClasse extends BaseItem {
  archetype: string;
  prerequisite: string;
}
