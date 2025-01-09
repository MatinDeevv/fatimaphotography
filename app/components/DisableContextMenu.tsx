import { useEffect } from 'react';
import { NextPage } from 'next';

const NoContextMenuPage: NextPage = () => {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return <div>Right-click is disabled on this page.</div>;
};

export default NoContextMenuPage;
