export const router = {
  beforeEach: function (to, from, next) {
    if (typeof to.meta !== 'undefined' && typeof to.meta.role !== 'undefined') {
      const token = localStorage.getItem('jwt');
      if (token == null) {
        window.location.replace('/login');
      } else {
        fetch('/jwt', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('error');
            }
          })
          .then(({ decoded }) => {
            if (decoded.role >= to.meta.role) {
              next();
            } else {
              next('/403');
            }
          })
          .catch(() => {
            window.location.replace('/login');
          });
      }
    } else {
      next();
    }
  },
};

export default router;
