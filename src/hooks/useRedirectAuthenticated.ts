import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authState } from '../store/auth';
import { useEffect } from 'react';
import { navigationPaths } from '../config/navigationPaths';

export const useRedirectAuthenticated = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(authState);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(navigationPaths.mainRoom);
    }
  }, [isAuthenticated]);
};
