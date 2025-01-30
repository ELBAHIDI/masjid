import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="بوابة الإسلام"
      description="بوابتك إلى المعرفة الإسلامية والروحانية"
      dir="rtl"
    >
      <main>
        <HomepageFeatures 
          translations={{
            title: "مسجد رضوان",
            subtitle: "مركز دارلينغتون المجتمعي",
            aboutIslam: {
              title: "عن الإسلام",
              description: "تعرف على أساسيات الإسلام وتعاليمه"
            },
            activities: {
              title: "الأنشطة والبرامج",
              description: "اكتشف فعالياتنا وخدماتنا المجتمعية"
            }
          }}
        />
      </main>
    </Layout>
  );
} 