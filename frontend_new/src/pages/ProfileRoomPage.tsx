import React, { useState } from 'react';
import { Edit, Save } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import PersonalityRadar from '../components/PersonalityRadar';
import Skeleton from '../components/ui/skeleton';
import { profileApi } from '../lib/api';
import { toast } from 'sonner';

const ProfileRoomPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: profileData, isLoading, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const res = await profileApi.get();
      return res.data?.data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => profileApi.update(data),
    onSuccess: () => {
      refetch();
      setIsEditing(false);
      toast.success('保存成功');
    },
    onError: () => {
      toast.error('保存失败');
    }
  });

  const handleSave = () => {
    if (profileData) {
      updateProfileMutation.mutate(profileData);
    }
  };

  const defaultProfileData = {
    emotionalStability: 75,
    cognitiveStyle: 80,
    copingStyle: 70,
    attachmentType: 85,
    optimism: 90,
    traits: [
      { label: '敏感细腻', description: '你能够敏锐地感知自己和他人的情绪变化' },
      { label: '善于思考', description: '你喜欢深入思考问题的本质和解决方案' },
      { label: '情感丰富', description: '你的情感世界丰富多彩，体验深刻' },
      { label: '追求成长', description: '你总是希望变得更好，不断学习和进步' }
    ],
    triggers: [
      '被误解时的委屈感',
      '面对选择时的犹豫',
      '感受到压力时的焦虑',
      '孤独时的脆弱感'
    ],
    healingMethods: [
      '深度倾听和理解',
      '温和的肯定和鼓励',
      '认知重构练习',
      '正念冥想引导'
    ],
    deepNeeds: [
      '渴望被真正理解',
      '需要无评判的倾听',
      '希望获得情感支持',
      '追求内心的平静'
    ]
  };

  const data = profileData || defaultProfileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      {/* 背景樱花花瓣动画 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-300/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <EmergencyButton />
      
      {/* 顶部标题 */}
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient">你的专属心理镜像</h1>
            <p className="text-sm text-[#F5F0EB]/80 mt-1">这是我们一起走过的时光里，我看到的你</p>
          </div>
          
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-2xl transition-colors"
            disabled={updateProfileMutation.isPending}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-300">
                  {updateProfileMutation.isPending ? '保存中...' : '保存'}
                </span>
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-300">编辑</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24 relative z-10">
        {/* 雷达图 */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">五维心理雷达图</h3>
          
          {isLoading ? (
            <Skeleton className="w-full h-64 rounded-2xl" />
          ) : (
            <>
              <div className="h-64">
                <PersonalityRadar data={data} />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  这是我们一起走过的时光里，我看到的你
                </p>
              </div>
            </>
          )}
        </div>

        {/* 性格特质 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">性格特质解析</h3>
          <div className="space-y-3">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full h-12 rounded-2xl" />
              ))
            ) : (
              (data.traits || defaultProfileData.traits).map((trait: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-[#F5F0EB]">{trait.label}</p>
                    <p className="text-sm text-[#F5F0EB]/80">{trait.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 情绪触发点 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">你的情绪触发点</h3>
          {isLoading ? (
            <Skeleton className="w-full h-20 rounded-2xl" />
          ) : (
            <div className="flex flex-wrap gap-2">
              {(data.triggers || defaultProfileData.triggers).map((trigger: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-2xl text-sm"
                >
                  {trigger}
                </span>
              ))}
              {isEditing && (
                <button className="px-3 py-1 bg-white/10 text-[#F5F0EB]/70 rounded-2xl text-sm hover:bg-white/20">
                  + 添加
                </button>
              )}
            </div>
          )}
        </div>

        {/* 治愈方式 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">最适合你的治愈方式</h3>
          <div className="space-y-3">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full h-12 rounded-2xl" />
              ))
            ) : (
              (data.healingMethods || defaultProfileData.healingMethods).map((method: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-2xl flex items-center justify-center">
                    <span className="text-green-300 text-sm">✓</span>
                  </div>
                  <span className="text-[#F5F0EB]/90">{method}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 深层需求 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">你的深层需求</h3>
          <div className="space-y-3">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full h-12 rounded-2xl" />
              ))
            ) : (
              (data.deepNeeds || defaultProfileData.deepNeeds).map((need: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                  <p className="text-[#F5F0EB]/90">{need}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 画像更新日志 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">画像更新日志</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-[#F5F0EB]">2024年4月25日</p>
                <p className="text-xs text-[#F5F0EB]/70">乐观程度提升5%，情绪稳定性提升3%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-[#F5F0EB]">2024年4月20日</p>
                <p className="text-xs text-[#F5F0EB]/70">新增治愈方式：正念冥想引导</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navigation currentPath="/profile" />
    </div>
  );
};

export default ProfileRoomPage;