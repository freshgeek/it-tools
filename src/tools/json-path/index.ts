import {ArrowsShuffle} from '@vicons/tabler';
import {defineTool} from '../tool';
import {translate} from '@/plugins/i18n.plugin';

export const tool = defineTool({
    name: translate('tools.json-path.title'),
    path: '/json-path',
    description: translate('tools.json-path.description'),
    keywords: ['json', 'path', 'extra'],
    component: () => import('./json-path.vue'),
    icon: ArrowsShuffle,
    createdAt: new Date('2024-05-13'),
})
