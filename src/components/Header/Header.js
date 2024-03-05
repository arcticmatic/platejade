import css from './Header.module.css';
import PlateJadeLogo from '../icons/plate-jade-logo.svg';
import { NavLink } from 'react-router-dom';
import starIcon from '../icons/star.svg';
import logoutIcon from '../icons/logoutIcon.svg';
import authSelectors from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';

const Header = () => {
  const email = useSelector(authSelectors.getEmail);
  const dispatch = useDispatch();

  console.log('email', email);

  return (
    <>
      <section>
        <nav className={css.navigation}>
          <div>
            <img
              alt="plate jade logo"
              className={css.logo_icon}
              src={PlateJadeLogo}
            />
          </div>
          <div>
            <NavLink to="/" className={css.nav_link}>
              License Plates
            </NavLink>
            <NavLink to="/plate-frame" className={css.nav_link}>
              Plate Frame
            </NavLink>
            <NavLink to="/users" className={css.nav_link}>
              Users
            </NavLink>
            <NavLink to="/dealers" className={css.nav_link}>
              Dealers
            </NavLink>
          </div>
          <div className={css.log_out_thumb}>
            <div>
              <p className={css.user_status_thumb}>
                Administrator
                <img
                  alt="plate jade logo"
                  className={css.user_status_icon}
                  src={starIcon}
                />
              </p>
              <p className={css.user_email}>admin@gmail.com </p>
            </div>
            <div className={css.grey_border}></div>
            <img
              onClick={() => dispatch(authOperations.logOut())}
              alt="plate jade logo"
              className={css.logout_icon}
              src={logoutIcon}
            />
          </div>
        </nav>
      </section>
    </>
  );
};
export default Header;
