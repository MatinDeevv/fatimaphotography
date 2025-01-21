import React from 'react';
import Head from 'next/head';

interface GoogleTagManagerProps {
  trackingId: string;
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ trackingId }) => {
  return (
    <Head>
      {/* Google Tag Manager Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}');
          `,
        }}
      />
    </Head>
  );
};

export default GoogleTagManager;
