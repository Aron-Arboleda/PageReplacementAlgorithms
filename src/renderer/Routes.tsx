import { Routes, Route } from 'react-router-dom';
import { navigations } from '@utils/constants/navigations';
import { NavigationItem } from '@utils/constants/navigations';

const AppRoutes = () => {
  const generateRoutes = (items: NavigationItem[]) => {
    return items.flatMap((item: NavigationItem): any[] => {
      const routes = [];

      if (item.path && item.page) {
        routes.push(
          <Route key={item.path} path={item.path} element={<item.page />} />,
        );
      }

      return routes;
    });
  };

  return <Routes>{generateRoutes(navigations)}</Routes>;
};

export default AppRoutes;
