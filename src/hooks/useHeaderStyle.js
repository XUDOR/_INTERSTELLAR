// useHeaderStyle.js
import { useLocation } from 'react-router-dom';

export function useHeaderStyle() {
  const location = useLocation();
  const minimalHeaderPaths = ['/shop', '/admin', '/user', '/downloads'];
  const isMinimal = minimalHeaderPaths.includes(location.pathname);

  return {
    isMinimal: isMinimal, // A boolean that tells you if the header should be minimal
    headerClassName: isMinimal ? 'minimal-header' : '', // The class name for the header
  };
}
