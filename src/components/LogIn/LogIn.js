import css from './LogIn.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import iPhone from '../icons/iPhone.svg';
import appStore from '../icons/appStore.svg';
import googlePlay from '../icons/googlePlay.svg';
import authOperations from '../../redux/auth/authOperations';
import authSelectors from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  // useEffect(() => {
  //   fetch('https://car-plates.onrender.com/api/auth/admin/allusers', {
  //     method: 'GET',
  //     header: {},
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       setUsers(result.users);
  //     });
  // }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('inside func');
    dispatch(authOperations.logIn({ email, password }));

    reset();
    navigate('/');
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <section className={css.login_section}>
        <div className={css.app_preview_thumb}>
          <div className={css.preview_text_thumb}>
            <p className={css.preview_text}>New </p>
            <p className={css.preview_text}> opportunities </p>
            <p className={css.preview_text}> for your business.</p>
            <p className={css.preview_description}>Try it yourself.</p>
            <div className={css.preview_buttons}>
              <img
                alt="app store"
                height="36"
                className={css.app_store}
                src={appStore}
              />
              <img
                height="36"
                alt="google play"
                className={css.google_play}
                src={googlePlay}
              />
            </div>
          </div>
          <div className={css.preview_icon}>
            <img alt="iphone" className={css.iphone_icon} src={iPhone} />
          </div>
        </div>
        <div className={css.app_login_thumb}>
          <div>
            <div className={css.login_text_thumb}>
              <p className={css.login_text}>Welcome</p>
              <p className={css.login_text}> to Plate Jade!</p>
            </div>
            <p className={css.login_description}>
              If you have forgotten your login or password,
            </p>
            <p className={css.login_description}>contact the administrator</p>
            <form onSubmit={handleSubmit} className={css.login_form}>
              <div>
                <label>
                  <p className={css.input_title}>Login</p>
                  <input
                    name="email"
                    value={email}
                    placeholder="David"
                    className={css.login_input}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p className={css.input_title}>Password</p>

                  <input
                    name="password"
                    value={password}
                    placeholder="David"
                    className={css.login_input}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <button type="submit" className={css.login_btn}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default LogIn;
