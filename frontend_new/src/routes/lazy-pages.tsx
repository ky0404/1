import { lazy, Suspense, ComponentType } from 'react';
import { Loader2 } from 'lucide-react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

type PageComponent = ComponentType<any>;

const pages: Record<string, PageComponent> = {
  IndexPage: lazy(() => import('@/pages/IndexPage')),
  ChatPage: lazy(() => import('@/pages/ChatPage')),
  ChatRoomPage: lazy(() => import('@/pages/ChatRoomPage')),
  EmotionDashboardPage: lazy(() => import('@/pages/EmotionDashboardPage')),
  ProfileRoomPage: lazy(() => import('@/pages/ProfileRoomPage')),
  GrowthRoomPage: lazy(() => import('@/pages/GrowthRoomPage')),
  ToolsRoomPage: lazy(() => import('@/pages/ToolsRoomPage')),
  SafetyCenterPage: lazy(() => import('@/pages/SafetyCenterPage')),
  SafetyRoomPage: lazy(() => import('@/pages/SafetyRoomPage')),
  HealingToolsPage: lazy(() => import('@/pages/HealingToolsPage')),
  KnowledgeLibraryPage: lazy(() => import('@/pages/KnowledgeLibraryPage')),
  InnerMapReportPage: lazy(() => import('@/pages/InnerMapReportPage')),
  PersonalizationRoomPage: lazy(() => import('@/pages/PersonalizationRoomPage')),
  MemoryCapsuleWallPage: lazy(() => import('@/pages/MemoryCapsuleWallPage')),
  SettingsRoomPage: lazy(() => import('@/pages/SettingsRoomPage')),
};

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
    </div>
  );
}

export function createPageRoute(component: keyof typeof pages) {
  const Page = pages[component];
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Page />
      </Suspense>
    </ErrorBoundary>
  );
}

export const routes = [
  { path: '/', component: 'IndexPage' as const },
  { path: '/chat', component: 'ChatPage' as const },
  { path: '/dashboard', component: 'EmotionDashboardPage' as const },
  { path: '/profile', component: 'ProfileRoomPage' as const },
  { path: '/growth', component: 'GrowthRoomPage' as const },
  { path: '/tools', component: 'ToolsRoomPage' as const },
  { path: '/safety', component: 'SafetyCenterPage' as const },
  { path: '/safety-room', component: 'SafetyRoomPage' as const },
  { path: '/healing-tools', component: 'HealingToolsPage' as const },
  { path: '/library', component: 'KnowledgeLibraryPage' as const },
  { path: '/report', component: 'InnerMapReportPage' as const },
  { path: '/personalization', component: 'PersonalizationRoomPage' as const },
  { path: '/memory-capsules', component: 'MemoryCapsuleWallPage' as const },
  { path: '/settings', component: 'SettingsRoomPage' as const },
];

export default pages;