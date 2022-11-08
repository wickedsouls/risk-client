import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authState } from '../store/auth';
import { navigationPaths } from '../config/navigationPaths';
import { getUser, userState } from '../store/user';
import { browserStorage, StorageKey } from '../utils/browserStorage';
import jwtDecode from 'jwt-decode';
import { UserPayload } from '../store/user/types';

export const AuthenticatedOnly: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isAuthenticated } = useSelector(authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useSelector(userState);
  const accessToken = browserStorage.getItem(StorageKey.ACCESS_TOKEN);

  useEffect(() => {
    if (accessToken && !id) {
      const user = jwtDecode<UserPayload>(accessToken);
      dispatch(getUser.request({ id: user.id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(navigationPaths.login);
    }
  }, [isAuthenticated]);

  return <React.Fragment>{children}</React.Fragment>;
};
