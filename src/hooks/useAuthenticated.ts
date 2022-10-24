import {useCallback} from 'react';
import {useQuery, useQueryClient} from 'react-query';

const useAuthenticated = () => {
  const queryClient = useQueryClient();

  const {data: isAuthenticated} = useQuery('isAuthenticated', () =>
    queryClient.getQueryData('isAuthenticated'),
  );
  const setIsAuthenticated = useCallback(
    (v: any) => queryClient.setQueryData('isAuthenticated', v),
    [queryClient],
  );
  return {isAuthenticated: Boolean(isAuthenticated), setIsAuthenticated};
};

export default useAuthenticated;
