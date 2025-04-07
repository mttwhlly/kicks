import { useLocation } from 'react-router';

// Higher-order component to protect against React Router transition issues
const withRouterProtection = (Component) => {
  return function ProtectedComponent(props) {
    const location = useLocation();
    
    // Get a stable key for the current route to force clean remounts
    const routeKey = `${location.pathname}${location.search}`;
    
    return (
      <div key={routeKey} data-router-protected="true">
        <Component {...props} />
      </div>
    );
  };
};

export default withRouterProtection;