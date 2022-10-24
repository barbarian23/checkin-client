import _ from 'lodash';

export const handleErrorMessage = (error: any) => {
  const status = _.get(error, 'status');
  if (error && status !== 401 && status !== 500) {
    const message = error?.data?.message || 'Some error occurred!';
    global.props.showToast(message);
  }
};

export const handleSuccessMessage = (res: any) => {
  const message = res?.message || 'Success!';
  global.props.showToast(message);
};
