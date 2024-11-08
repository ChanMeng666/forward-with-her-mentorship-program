// import React, { useEffect, useRef, useState } from 'react';
// import { useLanguage } from '@/contexts/LanguageContext';
//
// const AutoScrollGallery = () => {
//     const { t } = useLanguage();
//     const [isPaused, setIsPaused] = useState(false);
//     const scrollRef = useRef<HTMLDivElement>(null);
//     const scrollPositionRef = useRef(0);
//     const lastTimestampRef = useRef<number | null>(null);
//
//
//     const [images] = useState([
//         '/images/gallery/1.png',
//         '/images/gallery/2.png',
//         '/images/gallery/3.png',
//         '/images/gallery/4.png',
//         '/images/gallery/5.png',
//         '/images/gallery/6.png',
//         '/images/gallery/7.png',
//         '/images/gallery/8.png',
//         '/images/gallery/9.png',
//         '/images/gallery/10.png',
//         '/images/gallery/11.png',
//         // 为了实现无缝滚动，重复前面的图片
//         '/images/gallery/1.jpg',
//         '/images/gallery/2.jpg',
//         '/images/gallery/3.jpg',
//         '/images/gallery/4.jpg',
//         '/images/gallery/5.jpg',
//         '/images/gallery/6.png',
//         '/images/gallery/7.png',
//         '/images/gallery/8.png',
//         '/images/gallery/9.png',
//         '/images/gallery/10.png',
//         '/images/gallery/11.png',
//     ]);
//
//
//     useEffect(() => {
//         let animationId: number;
//         const scrollContainer = scrollRef.current;
//
//         const animate = (timestamp: number) => {
//             if (!scrollContainer) {
//                 animationId = requestAnimationFrame(animate);
//                 return;
//             }
//
//             // 如果是暂停状态，只更新时间戳和保持动画帧
//             if (isPaused) {
//                 lastTimestampRef.current = timestamp;
//                 animationId = requestAnimationFrame(animate);
//                 return;
//             }
//
//             // 初始化或恢复后的第一帧
//             if (!lastTimestampRef.current) {
//                 lastTimestampRef.current = timestamp;
//             }
//
//             // 计算时间差和滚动增量
//             const deltaTime = timestamp - lastTimestampRef.current;
//             const scrollIncrement = deltaTime * 0.05; // 调整这个值可以改变滚动速度
//
//             // 更新滚动位置
//             scrollPositionRef.current += scrollIncrement;
//             scrollContainer.scrollLeft = scrollPositionRef.current;
//
//             // 检查是否需要重置滚动位置
//             if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2) {
//                 scrollPositionRef.current = 0;
//                 scrollContainer.scrollLeft = 0;
//             }
//
//             lastTimestampRef.current = timestamp;
//             animationId = requestAnimationFrame(animate);
//         };
//
//         animationId = requestAnimationFrame(animate);
//
//         // 组件卸载时清理
//         return () => {
//             cancelAnimationFrame(animationId);
//         };
//     }, [isPaused]);
//
//     // 处理鼠标和触摸事件
//     const handleInteractionStart = () => {
//         setIsPaused(true);
//         // 保存当前滚动位置
//         if (scrollRef.current) {
//             scrollPositionRef.current = scrollRef.current.scrollLeft;
//         }
//     };
//
//     const handleInteractionEnd = () => {
//         setIsPaused(false);
//         // 更新最后时间戳为 null，这样会在动画恢复时重新初始化
//         lastTimestampRef.current = null;
//     };
//
//     return (
//         <section className="py-12 bg-background-light">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <h2 className="text-4xl font-bold mb-8 text-left text-[#333]">
//                     {t('gallery.title')}
//                 </h2>
//                 <div
//                     ref={scrollRef}
//                     className="flex overflow-x-hidden relative py-6"
//                     onMouseEnter={handleInteractionStart}
//                     onMouseLeave={handleInteractionEnd}
//                     onTouchStart={handleInteractionStart}
//                     onTouchEnd={handleInteractionEnd}
//                 >
//                     <div className="flex gap-4">
//                         {images.map((src, index) => (
//                             <div
//                                 key={index}
//                                 className="min-w-[300px] h-[200px] relative rounded-lg overflow-hidden shadow-lg"
//                             >
//                                 <img
//                                     src={src}
//                                     alt={`Gallery image ${index + 1}`}
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
//
// export default AutoScrollGallery;


import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

const AutoScrollGallery = () => {
    const { t } = useLanguage();
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollPositionRef = useRef(0);
    const lastTimestampRef = useRef<number | null>(null);
    const pausedScrollPositionRef = useRef<number | null>(null);

    // 定义基础图片数组
    const baseImages = [
        '/images/gallery/1.png',
        '/images/gallery/2.png',
        '/images/gallery/3.png',
        '/images/gallery/4.png',
        '/images/gallery/5.png',
        '/images/gallery/6.png',
        '/images/gallery/7.png',
        '/images/gallery/8.png',
        '/images/gallery/9.png',
        '/images/gallery/10.png',
        '/images/gallery/11.png',
    ];

    // 创建三组图片用于无缝滚动
    const [images] = useState([...baseImages, ...baseImages, ...baseImages]);

    useEffect(() => {
        let animationId: number;
        const scrollContainer = scrollRef.current;

        // 初始化滚动位置到第二组图片的开始处
        if (scrollContainer && scrollPositionRef.current === 0) {
            const itemWidth = 300;
            const gapWidth = 16;
            const oneGroupWidth = baseImages.length * (itemWidth + gapWidth);
            scrollPositionRef.current = oneGroupWidth;
            scrollContainer.scrollLeft = oneGroupWidth;
        }

        const animate = (timestamp: number) => {
            if (!scrollContainer) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            // 暂停状态下保持当前位置
            if (isPaused) {
                lastTimestampRef.current = timestamp;
                animationId = requestAnimationFrame(animate);
                return;
            }

            if (!lastTimestampRef.current) {
                lastTimestampRef.current = timestamp;
            }

            const deltaTime = timestamp - lastTimestampRef.current;
            const scrollIncrement = deltaTime * 0.05;

            // 更新滚动位置
            scrollPositionRef.current += scrollIncrement;
            scrollContainer.scrollLeft = scrollPositionRef.current;

            // 计算无缝滚动的临界值
            const itemWidth = 300;
            const gapWidth = 16;
            const totalItemWidth = itemWidth + gapWidth;
            const oneGroupWidth = baseImages.length * totalItemWidth;

            // 当滚动到第三组开始时，重置到第二组对应位置
            if (scrollContainer.scrollLeft >= oneGroupWidth * 2) {
                const excess = scrollContainer.scrollLeft - (oneGroupWidth * 2);
                scrollPositionRef.current = oneGroupWidth + excess;
                scrollContainer.scrollLeft = oneGroupWidth + excess;
            }
            // 当滚动到第一组时，跳转到第二组对应位置
            else if (scrollContainer.scrollLeft <= 0) {
                scrollPositionRef.current = oneGroupWidth;
                scrollContainer.scrollLeft = oneGroupWidth;
            }

            lastTimestampRef.current = timestamp;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [isPaused, baseImages.length]);

    // 处理鼠标和触摸事件
    const handleInteractionStart = () => {
        if (scrollRef.current) {
            pausedScrollPositionRef.current = scrollRef.current.scrollLeft;
            scrollPositionRef.current = scrollRef.current.scrollLeft;
        }
        setIsPaused(true);
    };

    const handleInteractionEnd = () => {
        if (pausedScrollPositionRef.current !== null && scrollRef.current) {
            scrollPositionRef.current = pausedScrollPositionRef.current;
            scrollRef.current.scrollLeft = pausedScrollPositionRef.current;
        }
        lastTimestampRef.current = null;
        setIsPaused(false);
        pausedScrollPositionRef.current = null;
    };

    return (
        <section className="py-12 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-8 text-left text-[#333]">
                    {t('gallery.title')}
                </h2>
                <div
                    ref={scrollRef}
                    className="flex overflow-x-hidden relative py-6"
                    onMouseEnter={handleInteractionStart}
                    onMouseLeave={handleInteractionEnd}
                    onTouchStart={handleInteractionStart}
                    onTouchEnd={handleInteractionEnd}
                >
                    <div className="flex gap-4">
                        {images.map((src, index) => (
                            <div
                                key={`${src}-${index}`}
                                className="min-w-[300px] h-[200px] relative rounded-lg overflow-hidden shadow-lg"
                            >
                                <Image
                                    src={src}
                                    alt={`Gallery image ${(index % baseImages.length) + 1}`}
                                    fill
                                    sizes="300px"
                                    className="object-cover"
                                    loading={index < 4 ? "eager" : "lazy"}
                                    quality={75}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AutoScrollGallery;
