import css from './LogIn.module.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logoutIcon from '../icons/logoutIcon.svg';
import iPhone from '../icons/iPhone.svg';
import appStore from '../icons/appStore.svg';
import googlePlay from '../icons/googlePlay.svg';

const LogIn = () => {
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
            <form className={css.login_form}>
              <p className={css.input_title}>Login</p>
              <label>
                <input
                  name="username"
                  placeholder="David"
                  className={css.login_input}
                />
              </label>
              <p className={css.input_title}>Password</p>
              <label>
                <input
                  name="password"
                  placeholder="David"
                  className={css.login_input}
                />
              </label>
            </form>
            <button type="submit" className={css.login_btn}>
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default LogIn;
