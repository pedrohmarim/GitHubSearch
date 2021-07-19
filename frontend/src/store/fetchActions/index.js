import Swal from 'sweetalert2';
import swal from 'sweetalert';
import api from '../../api';
import { login } from '../ducks/auth';

export const authLogin = (user) => (dispatch) => {
  api.post('/login', user)
    .then((res) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: 'success',
        title: 'Successfully logged in!',
      }).then(() => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.user.username);
        dispatch(login());
        window.location.pathname = '/search';
      });
    })
    .catch((error) => {
      const { message } = error.response.data;
      swal({
        title: 'Warn',
        text: `${message}`,
        icon: 'warning',
        dangerMode: true,
      });
    });
};
